import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
})

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_live_51TbpboJ7xbjJn8pAYIY49KcxA5akzIFmmvgJ8r89vts5k5ZfNdwh579oz5U8dyIfJYucDAElkTt7KUHkzsFEO94j00iAQtFMQh'
