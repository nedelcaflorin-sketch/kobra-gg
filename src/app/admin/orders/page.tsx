'use client'

import { useState, useEffect } from 'react'
import { Package, Truck, CheckCircle, Clock, DollarSign } from 'lucide-react'

interface Order {
  id: number
  email: string
  name: string
  total: number
  status: string
  tracking: string | null
  created_at: string
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'In attesa', color: 'text-yellow-400', icon: Clock },
  paid: { label: 'Pagato', color: 'text-kobra-green', icon: DollarSign },
  processing: { label: 'In elaborazione', color: 'text-kobra-cyan', icon: Package },
  shipped: { label: 'Spedito', color: 'text-blue-400', icon: Truck },
  delivered: { label: 'Consegnato', color: 'text-green-400', icon: CheckCircle },
}

const statusOptions = Object.entries(statusConfig).map(([key, val]) => ({ key, label: val.label }))

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  const fetchOrders = () => {
    fetch('/api/orders')
      .then((r) => r.json())
      .then((data) => {
        setOrders(data.orders || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchOrders() }, [])

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter)

  const handleStatusChange = async (id: number, status: string) => {
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchOrders()
  }

  const handleGenerateTracking = async (id: number) => {
    const tracking = `TRK${Date.now()}${Math.floor(Math.random() * 1000)}`
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tracking }),
    })
    fetchOrders()
  }

  return (
    <div className="py-10 px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold">Gestione Ordini</h1>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              filter === 'all' ? 'bg-kobra-green text-kobra-black border-kobra-green' : 'bg-transparent text-gray-400 border-kobra-green/20'
            }`}
          >
            Tutti
          </button>
          {statusOptions.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(filter === key ? 'all' : key)}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                filter === key ? 'bg-kobra-green text-kobra-black border-kobra-green' : 'bg-transparent text-gray-400 border-kobra-green/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-kobra-green border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-kobra-gray rounded-xl border border-kobra-green/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-kobra-black border-b border-kobra-green/20">
              <tr>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Totale</th>
                <th className="text-left p-4">Stato</th>
                <th className="text-left p-4">Tracking</th>
                <th className="text-left p-4">Data</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => {
                const sc = statusConfig[order.status] || { label: order.status, color: 'text-gray-400', icon: Clock }
                const Icon = sc.icon
                return (
                  <tr key={order.id} className="border-b border-kobra-green/10 hover:bg-kobra-green/5">
                    <td className="p-4 font-mono text-kobra-green">#{String(order.id).padStart(4, '0')}</td>
                    <td className="p-4 text-gray-300">{order.email || '-'}</td>
                    <td className="p-4 font-bold">{order.total.toFixed(2)}€</td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`bg-transparent border border-kobra-green/20 rounded px-2 py-1 text-xs ${sc.color}`}
                      >
                        {statusOptions.map(({ key, label }) => (
                          <option key={key} value={key} className="bg-kobra-black text-white">{label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4 font-mono text-xs">
                      {order.tracking ? (
                        <span className="text-kobra-cyan">{order.tracking}</span>
                      ) : (
                        <button
                          onClick={() => handleGenerateTracking(order.id)}
                          className="text-kobra-green hover:underline"
                        >
                          Genera tracking
                        </button>
                      )}
                    </td>
                    <td className="p-4 text-gray-400 text-xs">
                      {new Date(order.created_at).toLocaleDateString('it-IT')}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <Clock size={32} className="mb-3 opacity-40" />
              <p>Nessun ordine trovato</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

