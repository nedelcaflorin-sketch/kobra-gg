import ProductGrid from '@/components/ProductGrid'
import { categories } from '@/lib/types'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export default function CategoryPage({ params }: Props) {
  const category = categories.find((c) => c.slug === params.slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-8">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span className="text-kobra-green">{category.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
            {category.name}
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Scopri la nostra selezione di {category.name.toLowerCase()}. Prezzi imbattibili e spedizione veloce in tutta Europa.
          </p>
        </div>

        {/* Products */}
        <ProductGrid category={category.slug} limit={24} />
      </div>
    </div>
  )
}
