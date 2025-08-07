import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Quantity({ item, update }){
  return (
    <div className="inline-flex items-center rounded-md border border-slate-200">
      <button className="px-2 py-1" onClick={() => update(item.id, Math.max(1, item.quantity - 1))}>−</button>
      <span className="min-w-[2rem] text-center">{item.quantity}</span>
      <button className="px-2 py-1" onClick={() => update(item.id, item.quantity + 1)}>+</button>
    </div>
  )
}

export default function CartDrawer(){
  const { isOpen, closeCart, items, removeItem, updateQuantity, totalCents } = useCart()
  const total = (totalCents/100).toLocaleString(undefined, { style:'currency', currency:'USD' })
  return (
    <div className={`fixed inset-0 z-30 ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <div className={`absolute inset-0 bg-black/30 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={closeCart}/>
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-white shadow-xl transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={closeCart} className="rounded-md border border-slate-200 px-3 py-1">Close</button>
        </div>
        <div className="flex h-[calc(100%-9rem)] flex-col">
          <div className="flex-1 space-y-3 overflow-auto p-4">
            {items.length === 0 && <p className="text-slate-500">Your cart is empty.</p>}
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-slate-500">{item.type} • {item.theme}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Quantity item={item} update={updateQuantity} />
                  <div className="w-20 text-right font-semibold">{(item.priceCents*item.quantity/100).toLocaleString(undefined,{style:'currency',currency:'USD'})}</div>
                  <button className="text-sm text-slate-500 hover:text-red-600" onClick={()=>removeItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 p-4">
            <div className="mb-3 flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>{total}</span>
            </div>
            <Link to="/checkout" onClick={closeCart} className="block w-full rounded-md bg-brand px-4 py-2 text-center font-medium text-white hover:shadow">Checkout</Link>
          </div>
        </div>
      </aside>
    </div>
  )
}


