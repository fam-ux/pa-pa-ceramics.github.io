import { useMemo, useState } from 'react'
import products from '../shared/products'
import ProductCard from '../components/ProductCard'

export default function Shop(){
  const [theme, setTheme] = useState('all')
  const [type, setType] = useState('all')
  const filtered = useMemo(() => products.filter(p => (theme==='all'||p.theme===theme) && (type==='all'||p.type===type)), [theme, type])
  return (
    <section className="py-8">
      <div className="container">
        <h1 className="mb-4 text-2xl font-bold">Shop Handmade Products</h1>
        <div className="mb-4 flex gap-3">
          <label className="text-sm text-slate-600">Theme
            <select className="ml-2 rounded-md border border-slate-200 px-3 py-2" value={theme} onChange={e=>setTheme(e.target.value)}>
              <option value="all">All</option>
              <option value="floral">Floral</option>
              <option value="animals">Animals</option>
              <option value="nature">Nature</option>
            </select>
          </label>
          <label className="text-sm text-slate-600">Type
            <select className="ml-2 rounded-md border border-slate-200 px-3 py-2" value={type} onChange={e=>setType(e.target.value)}>
              <option value="all">All</option>
              <option value="mug">Mugs</option>
              <option value="plate">Plates</option>
              <option value="bowl">Bowls</option>
            </select>
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  )
}


