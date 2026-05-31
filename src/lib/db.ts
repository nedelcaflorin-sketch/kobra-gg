// Simple JSON-based database (no native dependencies, works everywhere)
import { join } from 'path'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { parseCsv } from './csv'

const dataDir = join(process.cwd(), 'data')
const dbPath = join(dataDir, 'products.json')
const ordersPath = join(dataDir, 'orders.json')

if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true })
}

interface Product {
  id: number
  slug: string
  name: string
  description: string
  price: number
  original_price: number | null
  category: string
  subcategory: string | null
  image: string
  stock: number
  tags: string | null
  featured: number
  bestseller: number
  created_at: string
}

export interface Order {
  id: number
  email: string
  name: string
  address: string
  city: string
  postal_code: string
  country: string
  phone: string | null
  total: number
  status: string
  stripe_session_id: string | null
  tracking: string | null
  created_at: string
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  product_name: string
  quantity: number
  price: number
}

interface DbData {
  products: Product[]
  orders: Order[]
  order_items: OrderItem[]
}

function loadDb(): DbData {
  if (!existsSync(dbPath)) {
    return { products: [], orders: [], order_items: [] }
  }
  try {
    const data = JSON.parse(readFileSync(dbPath, 'utf-8'))
    // Merge orders from separate file if exists
    if (existsSync(ordersPath)) {
      const ordersData = JSON.parse(readFileSync(ordersPath, 'utf-8'))
      data.orders = ordersData.orders || []
      data.order_items = ordersData.order_items || []
    } else {
      data.orders = data.orders || []
      data.order_items = data.order_items || []
    }
    return data
  } catch {
    return { products: [], orders: [], order_items: [] }
  }
}

function saveDb(data: DbData) {
  writeFileSync(dbPath, JSON.stringify({ products: data.products }, null, 2))
  writeFileSync(ordersPath, JSON.stringify({
    orders: data.orders,
    order_items: data.order_items,
  }, null, 2))
}

let dbCache: DbData | null = null

function getDb(): DbData {
  if (!dbCache) {
    dbCache = loadDb()
  }
  return dbCache
}

function save() {
  if (dbCache) {
    saveDb(dbCache)
  }
}

export function invalidateCache() {
  dbCache = null
}

export function getProducts(options?: {
  category?: string
  bestseller?: boolean
  featured?: boolean
  limit?: number
  slug?: string
}): Product[] {
  const db = getDb()
  let products = db.products

  if (options?.slug) {
    return products.filter((p) => p.slug === options.slug)
  }
  if (options?.category) {
    products = products.filter((p) => p.category === options.category)
  }
  if (options?.bestseller) {
    products = products.filter((p) => p.bestseller === 1)
  }
  if (options?.featured) {
    products = products.filter((p) => p.featured === 1)
  }
  if (options?.limit) {
    products = products.slice(0, options.limit)
  }

  return products
}

export function getProductBySlug(slug: string): Product | undefined {
  const db = getDb()
  return db.products.find((p) => p.slug === slug)
}

export function addProduct(product: Omit<Product, 'id' | 'created_at'>): Product {
  const db = getDb()
  const newProduct: Product = {
    ...product,
    id: db.products.length > 0 ? Math.max(...db.products.map((p) => p.id)) + 1 : 1,
    created_at: new Date().toISOString(),
  }
  db.products.push(newProduct)
  save()
  return newProduct
}

export function updateProduct(id: number, updates: Partial<Product>): Product | null {
  const db = getDb()
  const index = db.products.findIndex((p) => p.id === id)
  if (index === -1) return null
  db.products[index] = { ...db.products[index], ...updates }
  save()
  return db.products[index]
}

export function deleteProduct(id: number): boolean {
  const db = getDb()
  const index = db.products.findIndex((p) => p.id === id)
  if (index === -1) return false
  db.products.splice(index, 1)
  save()
  return true
}

export function seedProducts(products: Omit<Product, 'id' | 'created_at'>[]) {
  const db = getDb()
  db.products = products.map((p, i) => ({
    ...p,
    id: i + 1,
    created_at: new Date().toISOString(),
  }))
  save()
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function importCsvProducts(csvText: string): { added: number; skipped: number } {
  const rows = parseCsv(csvText)
  const db = getDb()
  const existingSlugs = new Set(db.products.map((p) => p.slug))
  let added = 0
  let skipped = 0

  for (const row of rows) {
    if (!row.name) { skipped++; continue }
    const slug = toSlug(row.name)
    if (existingSlugs.has(slug)) { skipped++; continue }

    addProduct({
      slug,
      name: row.name,
      description: row.description || '',
      price: parseFloat(row.price) || 0,
      original_price: row.original_price ? parseFloat(row.original_price) : null,
      category: row.category || 'accessori',
      subcategory: row.subcategory || null,
      image: row.image || '/placeholder.jpg',
      stock: parseInt(row.stock) || 0,
      tags: row.tags || null,
      featured: row.featured === '1' || row.featured === 'true' ? 1 : 0,
      bestseller: row.bestseller === '1' || row.bestseller === 'true' ? 1 : 0,
    })

    existingSlugs.add(slug)
    added++
  }

  return { added, skipped }
}

// ===== Orders =====

export function getOrders(): Order[] {
  const db = getDb()
  return [...db.orders].sort((a, b) => b.id - a.id)
}

export function getOrderById(id: number): Order | undefined {
  const db = getDb()
  return db.orders.find((o) => o.id === id)
}

export function getOrderBySessionId(sessionId: string): Order | undefined {
  const db = getDb()
  return db.orders.find((o) => o.stripe_session_id === sessionId)
}

export function addOrder(order: Omit<Order, 'id' | 'created_at'>): Order {
  const db = getDb()
  const newOrder: Order = {
    ...order,
    id: db.orders.length > 0 ? Math.max(...db.orders.map((o) => o.id)) + 1 : 1,
    created_at: new Date().toISOString(),
  }
  db.orders.push(newOrder)
  save()
  return newOrder
}

export function updateOrderStatus(id: number, status: string): Order | null {
  const db = getDb()
  const index = db.orders.findIndex((o) => o.id === id)
  if (index === -1) return null
  db.orders[index] = { ...db.orders[index], status }
  save()
  return db.orders[index]
}

export function updateOrderTracking(id: number, tracking: string): Order | null {
  const db = getDb()
  const index = db.orders.findIndex((o) => o.id === id)
  if (index === -1) return null
  db.orders[index] = { ...db.orders[index], tracking }
  save()
  return db.orders[index]
}

export function addOrderItems(orderId: number, items: Omit<OrderItem, 'id' | 'order_id'>[]): OrderItem[] {
  const db = getDb()
  const baseId = db.order_items.length > 0 ? Math.max(...db.order_items.map((i) => i.id)) + 1 : 1
  const newItems: OrderItem[] = items.map((item, idx) => ({
    ...item,
    id: baseId + idx,
    order_id: orderId,
  }))
  db.order_items.push(...newItems)
  save()
  return newItems
}

export function getOrderItems(orderId: number): OrderItem[] {
  const db = getDb()
  return db.order_items.filter((i) => i.order_id === orderId)
}
