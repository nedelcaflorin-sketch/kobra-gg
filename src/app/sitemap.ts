import type { MetadataRoute } from 'next'
import { getProducts } from '@/lib/db'

const BASE_URL = 'https://kobra-gg.vercel.app'

const categories = ['pc-gaming', 'laptop', 'accessori', 'console', 'playstation', 'xbox']

const staticPages = [
  '/',
  '/chi-siamo/',
  '/contatti/',
  '/spedizioni/',
  '/resi/',
  '/termini/',
  '/privacy/',
  '/cookie/',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const statics: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1.0 : 0.7,
  }))

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/${cat}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  let productPages: MetadataRoute.Sitemap = []
  try {
    const products = getProducts({ limit: 1000 })
    productPages = products.map((p) => ({
      url: `${BASE_URL}/prodotto/${p.slug}/`,
      lastModified: new Date(p.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch {
    // If DB not available during build, skip product pages
  }

  return [...statics, ...categoryPages, ...productPages]
}
