export interface Supplier {
  id: string
  name: string
  type: 'eprolo' | 'bigbuy' | 'manual'
  apiUrl?: string
  apiKey?: string
  active: boolean
}

export const defaultSuppliers: Supplier[] = [
  {
    id: 'eprolo',
    name: 'Eprolo',
    type: 'eprolo',
    active: true,
  },
  {
    id: 'bigbuy',
    name: 'BigBuy',
    type: 'bigbuy',
    active: false,
  },
]

export interface SupplierProduct {
  supplierId: string
  supplierSku: string
  name: string
  description: string
  price: number
  retailPrice: number
  category: string
  image: string
  stock: number
  weight?: number
}
