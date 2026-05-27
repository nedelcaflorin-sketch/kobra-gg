import { getProductBySlug } from '@/lib/db'
import { Product } from '@/lib/types'
import { notFound } from 'next/navigation'
import { ShoppingCart, Truck, ShieldCheck, RotateCcw, Star } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: { slug: string }
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-kobra-green">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/${product.category}/`} className="hover:text-kobra-green">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-kobra-green">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-kobra-gray rounded-2xl p-8 flex items-center justify-center">
            <img src={product.image} alt={product.name} className="max-w-full max-h-[400px] object-contain" />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-kobra-green font-semibold mb-2">{product.subcategory || product.category}</p>
              <h1 className="text-3xl font-display font-bold">{product.name}</h1>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-yellow-400 fill-yellow-400" />)}</div>
                <span className="text-sm text-gray-400">4.8 (127 recensioni)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-kobra-green">{product.price.toFixed(2)}€</span>
              {product.original_price && (
                <>
                  <span className="text-xl text-gray-500 line-through">{product.original_price.toFixed(2)}€</span>
                  <span className="px-2 py-1 bg-kobra-green/10 text-kobra-green text-sm font-bold rounded">-{discount}%</span>
                </>
              )}
            </div>

            <p className="text-gray-300 leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1"><Truck size={16} className="text-kobra-green" /> Spedizione 2-5 giorni</span>
              <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-kobra-green" /> Garanzia 2 anni</span>
            </div>

            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-kobra-green text-kobra-black font-bold rounded-lg hover:bg-kobra-green/90 transition-all">
              <ShoppingCart size={20} /> Aggiungi al Carrello
            </button>

            <div className="pt-6 border-t border-kobra-green/10 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400"><RotateCcw size={16} className="text-kobra-green" /> Reso gratuito entro 30 giorni</div>
              <div className="flex items-center gap-3 text-sm text-gray-400"><ShieldCheck size={16} className="text-kobra-green" /> Pagamento sicuro con Stripe</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
