// Simple JSON-based database (no native dependencies, works everywhere)
import { join } from 'path'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'

const dataDir = join(process.cwd(), 'data')
const dbPath = join(dataDir, 'products.json')

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

interface Order {
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
  created_at: string
}

interface OrderItem {
  id: number
  order_id: number
  product_id: number
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
  return JSON.parse(readFileSync(dbPath, 'utf-8'))
}

function saveDb(data: DbData) {
  writeFileSync(dbPath, JSON.stringify(data, null, 2))
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
