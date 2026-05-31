'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ShoppingCart, Search, LogIn, Settings } from 'lucide-react'
import { useCart } from '@/lib/cart'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { count } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-kobra-black/95 backdrop-blur-md border-b border-kobra-green/30 shadow-[0_0_20px_rgba(57,255,20,0.1)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/logo-main.png"
                alt="Kobra.gg"
                className="h-14 w-auto object-contain drop-shadow-[0_0_15px_rgba(57,255,20,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(57,255,20,0.6)] transition-all duration-300"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'In tendenza', href: '/', active: true },
              { label: 'PC Gaming', href: '/pc-gaming/' },
              { label: 'Console', href: '/console/' },
              { label: 'Accessori', href: '/accessori/' },
              { label: 'Offerte', href: '/' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative text-sm font-medium transition-all duration-300 group ${
                  item.active ? 'text-kobra-green' : 'text-gray-300 hover:text-kobra-green'
                }`}
              >
                <span>{item.label}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-kobra-green group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-kobra-green/10 border border-kobra-green/20 text-kobra-green hover:bg-kobra-green/20 transition-all">
              <Search size={18} />
            </button>
            <Link
              href="/carrello/"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-kobra-green/10 border border-kobra-green/20 text-kobra-green hover:bg-kobra-green/20 transition-all relative"
            >
              <ShoppingCart size={18} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-kobra-green text-kobra-black text-xs font-bold rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <Link
              href="/admin/"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-kobra-green/10 border border-kobra-green/20 text-kobra-green hover:bg-kobra-green/20 transition-all"
              title="Admin"
            >
              <Settings size={18} />
            </Link>
            <Link
              href="/login/"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-kobra-green text-kobra-black font-bold text-sm hover:bg-kobra-green/90 transition-all"
            >
              <LogIn size={16} />
              Accedi
            </Link>
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-kobra-green/10 border border-kobra-green/20 text-kobra-green"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden pb-6 space-y-1 bg-kobra-black/95 backdrop-blur-md rounded-xl mt-2 border border-kobra-green/20 p-4">
            {['In tendenza', 'PC Gaming', 'Console', 'Accessori', 'Offerte'].map((item) => (
              <Link
                key={item}
                href="/"
                className="block py-3 px-4 text-gray-300 hover:text-kobra-green hover:bg-kobra-green/5 rounded-lg transition-all"
              >
                {item}
              </Link>
            ))}
            <Link
              href="/login/"
              className="block py-3 px-4 text-kobra-green font-bold hover:bg-kobra-green/5 rounded-lg transition-all"
            >
              Accedi / Registrati
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
