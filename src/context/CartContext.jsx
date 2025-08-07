import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'pawpaw_cart_v1'

export function CartProvider({ children }){
  const [items, setItems] = useState(()=>{
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    }catch{ return [] }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if(existing){
        return prev.map(i => i.id===product.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsOpen(true)
  }

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))
  const updateQuantity = (id, qty) => setItems(prev => prev.map(i => i.id===id ? { ...i, quantity: qty } : i))
  const clearCart = () => setItems([])

  const totals = useMemo(()=>{
    const totalCents = items.reduce((sum,i)=> sum + i.priceCents * i.quantity, 0)
    const totalQuantity = items.reduce((sum,i)=> sum + i.quantity, 0)
    return { totalCents, totalQuantity }
  }, [items])

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const value = {
    ...totals,
    items,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(){
  const ctx = useContext(CartContext)
  if(!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}


