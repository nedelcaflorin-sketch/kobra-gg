'use client'

import { useState, useEffect } from 'react'
import { Package, DollarSign, TrendingUp, Clock } from 'lucide-react'

interface Order {
  id: number
  email: string
  name: string
  total: number
  status: string
  created_at: string
}

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [productCount, setProductCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/orders').then((r) => r.json()),
      fetch('/api/products?limit=1000').then((r) => r.json()),
    ]).then(([ordersData, productsData]) => {
      setOrders(ordersData.orders || [])
      setProductCount((productsData.products || []).length)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const paidOrders = orders.filter((o) => o.status === 'paid')
  const revenue = paidOrders.reduce((sum, o) => sum + o.total, 0)
  const latest5 = orders.slice(0, 5)

  const statusLabel: Record<string, string> = {
    pending: 'In attesa',
    paid: 'Pagato',
    processing: 'In elaborazione',
    shipped: 'Spedito',
    delivered: 'Consegnato',
  }
  const statusColor: Record<string, string> = {
    pending: 'text-yellow-400',
    paid: 'text-kobra-green',
    processing: 'text-kobra-cyan',
    shipped: 'text-blue-400',
    delivered: 'text-green-400',
  }

  return (
    <div className="py-10 px-6">
      <h1 className="text-3xl font-display font-bold mb-8">
        Dashboard <span className="text-kobra-green">Admin</span>
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-kobra-green border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Prodotti', value: productCount, icon: Package, color: 'text-kobra-green' },
              { label: 'Ordini Totali', value: orders.length, icon: TrendingUp, color: 'text-kobra-cyan' },
              { label: 'Ordini Pagati', value: paidOrders.length, icon: DollarSign, color: 'text-kobra-green' },
              { label: 'Fatturato', value: `${revenue.toFixed(2)}€`, icon: DollarSign, color: 'text-kobra-cyan' },
            ].map((stat) => (
              <div key={stat.label} className="p-5 bg-kobra-gray rounded-xl border border-kobra-green/10">
                <stat.icon size={22} className={stat.color + ' mb-3'} />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-kobra-gray rounded-xl border border-kobra-green/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-kobra-green/10">
              <h2 className="font-bold text-lg">Ultimi 5 Ordini</h2>
            </div>
            {latest5.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <Clock size={32} className="mb-3 opacity-40" />
                <p>Nessun ordine ancora</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-kobra-black">
                  <tr className="text-gray-400">
                    <th className="text-left p-4">ID</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Totale</th>
                    <th className="text-left p-4">Stato</th>
                    <th className="text-left p-4">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {latest5.map((order) => (
                    <tr key={order.id} className="border-t border-kobra-green/5 hover:bg-kobra-green/5">
                      <td className="p-4 font-mono text-kobra-green">#{String(order.id).padStart(4, '0')}</td>
                      <td className="p-4">{order.email || '-'}</td>
                      <td className="p-4 font-bold">{order.total.toFixed(2)}€</td>
                      <td className={`p-4 font-medium ${statusColor[order.status] || 'text-gray-400'}`}>
                        {statusLabel[order.status] || order.status}
                      </td>
                      <td className="p-4 text-gray-400 text-xs">
                        {new Date(order.created_at).toLocaleDateString('it-IT')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  )
}
