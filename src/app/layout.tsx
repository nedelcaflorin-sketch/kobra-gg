import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { CartProvider } from '@/lib/cart'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

export const metadata: Metadata = {
  title: {
    template: '%s | Kobra.gg - Gaming Gear',
    default: 'Kobra.gg — Gaming Gear, Prezzi da Kobra',
  },
  description: 'Tutto per il gaming: cuffie, mouse, tastiere, controller. Spedizione veloce in tutta Italia.',
  keywords: ['gaming', 'accessori gaming', 'cuffie gaming', 'mouse gaming', 'tastiere gaming', 'controller', 'PC gaming', 'console gaming'],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://kobra-gg.vercel.app',
    siteName: 'Kobra.gg',
    title: 'Kobra.gg — Gaming Gear, Prezzi da Kobra',
    description: 'Tutto per il gaming: cuffie, mouse, tastiere, controller. Spedizione veloce in tutta Italia.',
    images: [
      {
        url: 'https://kobra-gg.vercel.app/logo-main.png',
        width: 800,
        height: 600,
        alt: 'Kobra.gg Gaming Gear',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kobra.gg — Gaming Gear',
    description: 'Tutto per il gaming: cuffie, mouse, tastiere, controller. Spedizione veloce in tutta Italia.',
    images: ['https://kobra-gg.vercel.app/logo-main.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-kobra-black text-kobra-white antialiased">
        <CartProvider>
          <Header />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  )
}
