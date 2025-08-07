// Vercel serverless function example
// File path: api/create-checkout-session.mjs
// Deploy on Vercel. Configure env vars in the project settings:
// - STRIPE_SECRET_KEY
// - STRIPE_WEBHOOK_SECRET (optional if you add a webhook function)

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
})

// Source of truth for pricing (do not trust client values)
// In production you would fetch products from your DB or Stripe Price IDs
const CATALOG = {
  'panda-mug-1': { name: 'Panda Hug Mug', priceCents: 2800 },
  'dog-mug-1': { name: 'Puppy Paws Mug', priceCents: 2600 },
  'cat-plate-1': { name: 'Curious Cat Plate', priceCents: 3200 },
  'floral-plate-1': { name: 'Texas Wildflower Plate', priceCents: 3400 },
  'panda-plate-2': { name: 'Bamboo Panda Plate', priceCents: 3300 },
  'dog-plate-2': { name: 'Best Friend Plate', priceCents: 3000 },
  'cat-mug-2': { name: 'Whisker Wonderland Mug', priceCents: 2700 },
  'floral-mug-2': { name: 'Bluebonnet Bloom Mug', priceCents: 2900 },
}

export default async function handler(req, res) {
  const allowedOrigin = process.env.ALLOW_ORIGIN || '*'
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(204).end()
  }
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }
  try {
    const { lineItems } = req.body || {}
    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return res.status(400).json({ error: 'Missing lineItems' })
    }

    const stripeLineItems = []
    for (const li of lineItems) {
      const { id, quantity } = li || {}
      const product = CATALOG[id]
      const qty = Number(quantity) || 0
      if (!product || qty <= 0) continue
      stripeLineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: product.name },
          unit_amount: product.priceCents,
        },
        quantity: Math.min(qty, 50),
      })
    }
    if (stripeLineItems.length === 0) {
      return res.status(400).json({ error: 'No valid items' })
    }

    const success_url = `${process.env.SUCCESS_URL || 'https://yourdomain.example.com'}/?checkout=success`
    const cancel_url = `${process.env.CANCEL_URL || 'https://yourdomain.example.com'}/checkout`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: stripeLineItems,
      success_url,
      cancel_url,
      // customer_email: optional, derive from auth or pass via server if applicable
      // shipping_address_collection: { allowed_countries: ['US'] },
    })

    return res.status(200).json({ sessionId: session.id, url: session.url })
  } catch (err) {
    console.error(err)
    return res.status(500).send(typeof err?.message === 'string' ? err.message : 'Server error')
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
}


