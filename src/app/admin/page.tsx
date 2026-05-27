'use client'

import { useState } from 'react'
import { LogIn, Package, DollarSign, Users, TrendingUp } from 'lucide-react'

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'kobra2026!') {
      setLoggedIn(true)
      setError('')
    } else {
      setError('Password errata')
    }
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-kobra-gray rounded-xl border border-kobra-green/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-kobra-green/10 flex items-center justify-center">
              <LogIn size={32} className="text-kobra-green" />
            </div>
            <h1 className="text-2xl font-display font-bold">Admin Kobra</h1>
            <p className="text-gray-400 mt-2">Accedi al pannello di controllo</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-kobra-black border border-kobra-green/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-kobra-green"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-kobra-green text-kobra-black font-bold rounded-lg hover:bg-kobra-green/90"
            >
              Accedi
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-display font-bold">Dashboard <span className="text-kobra-green">Admin</span></h1>
          <button
            onClick={() => setLoggedIn(false)}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white"
          >
            Esci
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Ordini', value: '12', icon: Package, color: 'text-kobra-green' },
            { label: 'Fatturato', value: '1,247€', icon: DollarSign, color: 'text-kobra-cyan' },
            { label: 'Clienti', value: '8', icon: Users, color: 'text-kobra-green' },
            { label: 'Prodotti', value: '86', icon: TrendingUp, color: 'text-kobra-cyan' },
          ].map((stat) => (
            <div key={stat.label} className="p-6 bg-kobra-gray rounded-xl border border-kobra-green/10">
              <stat.icon size={24} className={stat.color + ' mb-3'} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-kobra-gray rounded-xl border border-kobra-green/10 p-6">
          <h2 className="text-xl font-bold mb-4">Ordini Recenti</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-kobra-green/10">
                  <th className="text-left py-3">ID</th>
                  <th className="text-left py-3">Cliente</th>
                  <th className="text-left py-3">Totale</th>
                  <th className="text-left py-3">Stato</th>
                  <th className="text-left py-3">Data</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-kobra-green/5">
                  <td className="py-3">#KBR-001</td>
                  <td className="py-3">mario.rossi@email.it</td>
                  <td className="py-3 text-kobra-green">89.97€</td>
                  <td className="py-3"><span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded text-xs">In elaborazione</span></td>
                  <td className="py-3">27/05/2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
