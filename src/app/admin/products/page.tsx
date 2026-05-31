'use client'

import { useState, useEffect, useRef } from 'react'
import { Upload, Plus, Trash2, Edit, Search, X, Check } from 'lucide-react'

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
  featured: number
  bestseller: number
}

interface ProductFormData {
  name: string
  description: string
  price: string
  original_price: string
  category: string
  subcategory: string
  image: string
  stock: string
  featured: boolean
  bestseller: boolean
}

const emptyForm: ProductFormData = {
  name: '', description: '', price: '', original_price: '',
  category: 'accessori', subcategory: '', image: '', stock: '0',
  featured: false, bestseller: false,
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [importStatus, setImportStatus] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [form, setForm] = useState<ProductFormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchProducts = () => {
    fetch('/api/products?limit=1000')
      .then((r) => r.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => null)
  }

  useEffect(() => { fetchProducts() }, [])

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || p.category === filter
    return matchesSearch && matchesFilter
  })

  const categories = Array.from(new Set(products.map((p) => p.category)))

  const handleCsvImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (ev) => {
      const csvText = ev.target?.result as string
      setImportStatus('Importazione in corso...')
      try {
        const res = await fetch('/api/admin/products/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ csvText }),
        })
        const data = await res.json()
        setImportStatus(`${data.added} importati, ${data.skipped} saltati`)
        fetchProducts()
      } catch {
        setImportStatus('Errore durante importazione')
      }
    }
    reader.readAsText(file)
    if (fileRef.current) fileRef.current.value = ''
  }

  const openCreate = () => {
    setEditProduct(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEdit = (p: Product) => {
    setEditProduct(p)
    setForm({
      name: p.name,
      description: p.description,
      price: String(p.price),
      original_price: p.original_price ? String(p.original_price) : '',
      category: p.category,
      subcategory: p.subcategory || '',
      image: p.image,
      stock: String(p.stock),
      featured: p.featured === 1,
      bestseller: p.bestseller === 1,
    })
    setShowModal(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: form.price,
        original_price: form.original_price || null,
        category: form.category,
        subcategory: form.subcategory || null,
        image: form.image,
        stock: form.stock,
        featured: form.featured,
        bestseller: form.bestseller,
      }
      if (editProduct) {
        await fetch(`/api/products/${editProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }
      setShowModal(false)
      fetchProducts()
    } catch {
      // noop
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Eliminare questo prodotto?')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    fetchProducts()
  }

  return (
    <div className="py-10 px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold">Gestione Prodotti</h1>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 px-4 py-2 bg-kobra-green text-kobra-black font-bold rounded-lg cursor-pointer hover:bg-kobra-green/90 text-sm">
            <Upload size={16} />
            Importa CSV
            <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleCsvImport} />
          </label>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 bg-kobra-gray border border-kobra-green/30 text-kobra-green font-bold rounded-lg hover:bg-kobra-green/10 text-sm"
          >
            <Plus size={16} />
            Nuovo Prodotto
          </button>
        </div>
      </div>

      {importStatus && (
        <div className="mb-4 px-4 py-3 bg-kobra-green/10 border border-kobra-green/20 rounded-lg text-kobra-green text-sm">
          {importStatus}
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Cerca prodotti..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-kobra-gray border border-kobra-green/20 rounded-lg text-white text-sm"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 bg-kobra-gray border border-kobra-green/20 rounded-lg text-white text-sm"
        >
          <option value="all">Tutte le categorie</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="bg-kobra-gray rounded-xl border border-kobra-green/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-kobra-black border-b border-kobra-green/20">
            <tr>
              <th className="text-left p-4">Img</th>
              <th className="text-left p-4">Nome</th>
              <th className="text-left p-4">Categoria</th>
              <th className="text-left p-4">Costo</th>
              <th className="text-left p-4">Prezzo</th>
              <th className="text-left p-4">Stock</th>
              <th className="text-left p-4">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-b border-kobra-green/10 hover:bg-kobra-green/5">
                <td className="p-4">
                  <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                </td>
                <td className="p-4 font-medium max-w-xs truncate">{product.name}</td>
                <td className="p-4 text-gray-400">{product.category}</td>
                <td className="p-4 text-gray-400">{product.original_price?.toFixed(2) ?? '-'}€</td>
                <td className="p-4 text-kobra-green font-bold">{product.price.toFixed(2)}€</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(product)} className="p-1.5 hover:text-kobra-green transition-colors">
                      <Edit size={15} />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="p-1.5 hover:text-red-400 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">Nessun prodotto trovato</div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg bg-kobra-gray rounded-xl border border-kobra-green/20 p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{editProduct ? 'Modifica Prodotto' : 'Nuovo Prodotto'}</h2>
              <button onClick={() => setShowModal(false)}>
                <X size={20} className="text-gray-400 hover:text-white" />
              </button>
            </div>
            <div className="space-y-4">
              {(['name', 'description', 'image'] as const).map((field) => (
                <div key={field}>
                  <label className="block text-xs text-gray-400 mb-1 capitalize">{field === 'name' ? 'Nome *' : field === 'description' ? 'Descrizione' : 'URL Immagine'}</label>
                  {field === 'description' ? (
                    <textarea
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 bg-kobra-black border border-kobra-green/20 rounded-lg text-white text-sm"
                    />
                  ) : (
                    <input
                      type="text"
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      className="w-full px-3 py-2 bg-kobra-black border border-kobra-green/20 rounded-lg text-white text-sm"
                    />
                  )}
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Prezzo Vendita *</label>
                  <input type="number" step="0.01" value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-3 py-2 bg-kobra-black border border-kobra-green/20 rounded-lg text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Prezzo Originale</label>
                  <input type="number" step="0.01" value={form.original_price}
                    onChange={(e) => setForm({ ...form, original_price: e.target.value })}
                    className="w-full px-3 py-2 bg-kobra-black border border-kobra-green/20 rounded-lg text-white text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Categoria</label>
                  <input type="text" value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 bg-kobra-black border border-kobra-green/20 rounded-lg text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Sottocategoria</label>
                  <input type="text" value={form.subcategory}
                    onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                    className="w-full px-3 py-2 bg-kobra-black border border-kobra-green/20 rounded-lg text-white text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Stock</label>
                <input type="number" value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className="w-full px-3 py-2 bg-kobra-black border border-kobra-green/20 rounded-lg text-white text-sm" />
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="checkbox" checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="accent-kobra-green" />
                  In evidenza
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="checkbox" checked={form.bestseller}
                    onChange={(e) => setForm({ ...form, bestseller: e.target.checked })}
                    className="accent-kobra-green" />
                  Bestseller
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={saving || !form.name || !form.price}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-kobra-green text-kobra-black font-bold rounded-lg hover:bg-kobra-green/90 disabled:opacity-50 text-sm"
              >
                <Check size={16} />
                {saving ? 'Salvataggio...' : 'Salva'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-3 border border-kobra-green/20 text-gray-400 rounded-lg hover:text-white text-sm"
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
