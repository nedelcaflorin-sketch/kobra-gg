'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingBag, Truck } from 'lucide-react'

const navLinks = [
  { href: '/admin/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products/', label: 'Prodotti', icon: Package },
  { href: '/admin/orders/', label: 'Ordini', icon: ShoppingBag },
  { href: '/admin/suppliers/', label: 'Fornitori', icon: Truck },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 flex-shrink-0 bg-kobra-gray border-r border-kobra-green/10">
        <div className="p-4 border-b border-kobra-green/10">
          <p className="text-xs text-kobra-green font-bold uppercase tracking-widest">Admin Panel</p>
        </div>
        <nav className="p-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href || pathname === link.href.replace(/\/$/, '')
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-kobra-green/10 text-kobra-green border border-kobra-green/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            )
          })}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
