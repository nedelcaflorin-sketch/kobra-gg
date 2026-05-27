'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserPlus, Mail, Lock, Eye, EyeOff, Chrome, User } from 'lucide-react'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/logo-main.png" alt="Kobra.gg" className="h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-display font-bold text-white">Crea Account</h1>
          <p className="text-gray-400 mt-2">Unisciti alla community Kobra</p>
        </div>

        <div className="bg-kobra-gray rounded-2xl border border-kobra-green/10 p-8 space-y-6">
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-kobra-black font-semibold rounded-lg hover:bg-gray-100 transition-all">
            <Chrome size={20} />
            Registrati con Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-kobra-green/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-kobra-gray text-gray-400">o continua con email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Nome completo</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Mario Rossi"
                  className="w-full pl-10 pr-4 py-3 bg-kobra-black border border-kobra-green/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-kobra-green transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nome@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-kobra-black border border-kobra-green/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-kobra-green transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimo 8 caratteri"
                  className="w-full pl-10 pr-12 py-3 bg-kobra-black border border-kobra-green/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-kobra-green transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-kobra-green"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1 rounded bg-kobra-black border-kobra-green/20 text-kobra-green" />
              <span className="text-gray-400">
                Accetto i{' '}
                <Link href="/termini/" className="text-kobra-green hover:underline">Termini e Condizioni</Link>
                {' '}e la{' '}
                <Link href="/privacy/" className="text-kobra-green hover:underline">Privacy Policy</Link>
              </span>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-kobra-green text-kobra-black font-bold rounded-lg hover:bg-kobra-green/90 transition-all"
            >
              <UserPlus size={18} />
              Crea Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-400">
            Hai già un account?{' '}
            <Link href="/login/" className="text-kobra-green font-semibold hover:underline">
              Accedi
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
