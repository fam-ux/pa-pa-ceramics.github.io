import { useMemo } from 'react'
import { useCart } from '../context/CartContext'
import payments from '../shared/payments'

export default function Checkout(){
  const { items, totalCents, clearCart } = useCart()
  const total = (totalCents/100).toFixed(2)
  const email = import.meta.env.VITE_CONTACT_EMAIL || 'haxule56@gmail.com'
  

  const emailHref = useMemo(() => {
    const lines = [
      'Hi Pa Pa,',
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
    const subject = encodeURIComponent('Order from Paw Paw Creations website')
    const body = encodeURIComponent(lines.join('\n'))
    return `mailto:${email}?subject=${subject}&body=${body}`
  }, [items, total, email])

  const payPalUrl = payments.paypalMe ? `https://paypal.me/${payments.paypalMe}/${total}` : null
  const cashAppUrl = payments.cashTag ? `https://cash.app/$${payments.cashTag}/${total}` : null
  const venmoUrl = payments.venmo ? `https://venmo.com/${payments.venmo}?txn=pay&amount=${total}&note=${encodeURIComponent('Paw Paw Creations order')}` : null

  

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
            {/* <div className="rounded-xl border border-slate-200 p-4">
              <h2 className="mb-2 text-lg font-semibold">Pay online (optional)</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {payPalUrl && <a target="_blank" rel="noreferrer" href={payPalUrl} className="rounded-md border border-slate-200 px-4 py-3 text-center hover:shadow">Pay with PayPal</a>}
                {cashAppUrl && <a target="_blank" rel="noreferrer" href={cashAppUrl} className="rounded-md border border-slate-200 px-4 py-3 text-center hover:shadow">Pay with Cash App</a>}
                {venmoUrl && <a target="_blank" rel="noreferrer" href={venmoUrl} className="rounded-md border border-slate-200 px-4 py-3 text-center hover:shadow">Pay with Venmo</a>}
                {!payPalUrl && !cashAppUrl && !venmoUrl}
              </div>
              <p className="mt-3 text-sm text-slate-600">If interest is high, we can enable card payments via Stripe later. For now, email works best!</p>
            </div> */}
          </div>
        )}
      </div>
    </section>
  )
}


