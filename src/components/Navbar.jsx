import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar(){
  const { openCart, totalQuantity } = useCart()
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <img src="/favicon.svg" alt="Paw Paw Ceramics" className="h-7 w-7" />
          <span>Paw Paw Ceramics</span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/shop" className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-slate-100'}`}>Shop</NavLink>
          <NavLink to="/about" className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-slate-100'}`}>About</NavLink>
          <NavLink to="/contact" className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-slate-100'}`}>Contact</NavLink>
          <button onClick={openCart} className="ml-2 inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 hover:shadow">
            <span>Cart</span>
            <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-brand text-white px-2 text-sm">{totalQuantity}</span>
          </button>
        </nav>
      </div>
    </header>
  )
}


