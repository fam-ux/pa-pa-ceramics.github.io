import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { CartProvider } from './context/CartContext'
import CartDrawer from './components/CartDrawer'

export default function App(){
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white text-slate-900">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  )
}


