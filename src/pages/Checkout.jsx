import { useMemo, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useCart } from '../context/CartContext'
import payments from '../shared/payments'

export default function Checkout(){
  const { items, totalCents, clearCart } = useCart()
  const total = (totalCents/100).toFixed(2)
  const email = import.meta.env.VITE_CONTACT_EMAIL || 'orders@pawpawceramics.com'
  const [isLoading, setIsLoading] = useState(false)

  const emailHref = useMemo(() => {
    const lines = [
      'Hi Paw Paw,',
      '',
      'I would like to purchase the following items:',
      ...items.map(i => `- ${i.name} x${i.quantity} — ${(i.priceCents*i.quantity/100).toFixed(2)}`),
      '',
      `Total: $${total}`,
      '',
      'Name:',
      'Phone:',
      'Pickup or shipping address (city, state):',
    ]
    const subject = encodeURIComponent('Order from Paw Paw Ceramics website')
    const body = encodeURIComponent(lines.join('\n'))
    return `mailto:${email}?subject=${subject}&body=${body}`
  }, [items, total, email])

  const payPalUrl = payments.paypalMe ? `https://paypal.me/${payments.paypalMe}/${total}` : null
  const cashAppUrl = payments.cashTag ? `https://cash.app/$${payments.cashTag}/${total}` : null
  const venmoUrl = payments.venmo ? `https://venmo.com/${payments.venmo}?txn=pay&amount=${total}&note=${encodeURIComponent('Paw Paw Ceramics order')}` : null

  async function startStripeCheckout(){
    try{
      if(!payments.stripePublishableKey || !payments.backendCheckoutUrl){
        alert('Stripe not configured. Set VITE_STRIPE_PUBLISHABLE_KEY and VITE_BACKEND_CHECKOUT_URL in your environment.');
        return
      }
      setIsLoading(true)
      const stripe = await loadStripe(payments.stripePublishableKey)
      if(!stripe){
        throw new Error('Failed to load Stripe')
      }
      const response = await fetch(payments.backendCheckoutUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lineItems: items.map(i => ({ id: i.id, quantity: i.quantity })),
          // Optional: include email to prefill customer_email on server
        })
      })
      if(!response.ok){
        const text = await response.text()
        throw new Error(text || 'Failed to create checkout session')
      }
      const { sessionId, url } = await response.json()
      // Prefer redirectToCheckout with sessionId; fallback to url
      if(sessionId){
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if(error) throw error
      }else if(url){
        window.location.href = url
      }else{
        throw new Error('Server did not return a sessionId or url')
      }
    }catch(err){
      console.error(err)
      alert('Could not start checkout. Please try again later.')
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <section className="py-8">
      <div className="container max-w-3xl">
        <h1 className="mb-4 text-2xl font-bold">Checkout</h1>
        {items.length === 0 ? (
          <p className="text-slate-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full">
                <thead className="bg-slate-50 text-left text-sm text-slate-600">
                  <tr>
                    <th className="px-4 py-2">Item</th>
                    <th className="px-4 py-2">Qty</th>
                    <th className="px-4 py-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(i => (
                    <tr key={i.id} className="border-t border-slate-100">
                      <td className="px-4 py-2">{i.name}</td>
                      <td className="px-4 py-2">{i.quantity}</td>
                      <td className="px-4 py-2">${(i.priceCents*i.quantity/100).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50">
                  <tr>
                    <td className="px-4 py-2 font-semibold" colSpan="2">Total</td>
                    <td className="px-4 py-2 font-semibold">${total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <h2 className="mb-2 text-lg font-semibold">Email your order</h2>
              <div className="flex flex-wrap gap-3">
                <a href={emailHref} className="rounded-md bg-brand px-4 py-2 font-medium text-white hover:shadow">Email order summary</a>
                <button className="rounded-md border border-slate-200 px-4 py-2 hover:shadow" onClick={clearCart}>Clear cart</button>
              </div>
              <p className="mt-2 text-sm text-slate-600">We’ll reply with pickup/shipping details and a Venmo link to pay securely.</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <h2 className="mb-2 text-lg font-semibold">Pay online (optional)</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {payPalUrl && <a target="_blank" rel="noreferrer" href={payPalUrl} className="rounded-md border border-slate-200 px-4 py-3 text-center hover:shadow">Pay with PayPal</a>}
                {cashAppUrl && <a target="_blank" rel="noreferrer" href={cashAppUrl} className="rounded-md border border-slate-200 px-4 py-3 text-center hover:shadow">Pay with Cash App</a>}
                {venmoUrl && <a target="_blank" rel="noreferrer" href={venmoUrl} className="rounded-md border border-slate-200 px-4 py-3 text-center hover:shadow">Pay with Venmo</a>}
                {payments.stripePublishableKey && payments.backendCheckoutUrl && (
                  <button onClick={startStripeCheckout} disabled={isLoading} className="rounded-md bg-black px-4 py-3 text-center font-medium text-white hover:shadow disabled:opacity-60">
                    {isLoading ? 'Redirecting…' : 'Pay with card (Stripe)'}
                  </button>
                )}
                {!payPalUrl && !cashAppUrl && !venmoUrl && (
                  <p className="text-sm text-slate-600">Add your PayPal.me, Cash App, or Venmo handle in `src/shared/payments.js` for instant links.</p>
                )}
              </div>
              <p className="mt-3 text-sm text-slate-600">We can also enable card payments via Stripe later. For now, email works best.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}


