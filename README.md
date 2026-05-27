# Kobra.gg

Gaming dropshipping store for EU market. Built with Next.js 14 + SQLite + Stripe.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Seed the database with products
npm run db:seed

# 3. Run development server
npm run dev

# 4. Open http://localhost:3000
```

## 📁 Project Structure

```
/src
  /app           — Next.js App Router pages
  /components    — React components
  /lib           — Database, types, utilities
  /data          — SQLite database files
/scripts
  seed.js        — Product seed script
```

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **SQLite** (better-sqlite3)
- **Stripe** (payments)
- **Lucide React** (icons)

## 🌍 Languages

- 🇮🇹 Italian (default)
- 🇬🇧 English
- 🇩🇪 German

## 🔑 Admin Access

- URL: `/admin/`
- Password: `kobra2026!`

## 📝 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy

## 📄 License

Private — All rights reserved.
