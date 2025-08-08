import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar(){
  const { openCart, totalQuantity } = useCart()
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container flex flex-wrap items-center justify-between gap-2 py-3">
        <Link to="/" className="flex w-full items-center gap-2 font-bold sm:w-auto">
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="Paw Paw Creations" className="h-7 w-7" />
          <span>Paw Paw Creations</span>
        </Link>
        <nav className="mt-1 flex w-full items-center justify-end gap-1 sm:mt-0 sm:w-auto">
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


