export interface Product {
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
}

export const categories = [
  { slug: 'pc-gaming', name: 'PC Gaming', nameEn: 'PC Gaming', nameDe: 'PC Gaming', icon: 'Monitor' },
  { slug: 'laptop', name: 'Laptop', nameEn: 'Laptops', nameDe: 'Laptops', icon: 'Laptop' },
  { slug: 'accessori', name: 'Accessori', nameEn: 'Accessories', nameDe: 'Zubehör', icon: 'Headphones' },
  { slug: 'console', name: 'Console', nameEn: 'Consoles', nameDe: 'Konsolen', icon: 'Gamepad2' },
  { slug: 'playstation', name: 'PlayStation', nameEn: 'PlayStation', nameDe: 'PlayStation', icon: 'Gamepad2' },
  { slug: 'xbox', name: 'Xbox', nameEn: 'Xbox', nameDe: 'Xbox', icon: 'Gamepad2' },
]
