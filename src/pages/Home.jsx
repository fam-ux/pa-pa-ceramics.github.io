import { Link } from 'react-router-dom'
import products from '../shared/products'
import ProductCard from '../components/ProductCard'

export default function Home(){
  const featured = products.slice(0,4)
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-light/60 to-transparent">
        <div className="container grid items-center gap-8 py-12 md:grid-cols-2">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">Handmade Ceramics from a San Antonio Local</h1>
            <p className="text-lg text-slate-700">Plates and mugs lovingly crafted and hand‑painted by a senior artist. Themes include pandas, dogs, cats, and Texas florals. When you shop here, you support a local small business and a creative grandma.</p>
            <div className="flex gap-3">
              <Link to="/shop" className="rounded-md bg-brand px-4 py-2 font-medium text-white hover:shadow">Shop Ceramics</Link>
              <Link to="/about" className="rounded-md border border-slate-200 px-4 py-2 hover:shadow">Meet Pa Pa</Link>
            </div>
            <div className="flex flex-wrap gap-2 pt-1 text-sm" aria-label="Local and small business badges">
              {['San Antonio, TX','Small Business','Senior Artist','Hand Painted'].map(b => (
                <span key={b} className="rounded-full border border-dashed border-brand bg-brand-light px-3 py-1 text-brand">{b}</span>
              ))}
            </div>
          </div>
          <div className="relative h-72 md:h-80">
            <div className="absolute left-8 top-8 h-48 w-48 -rotate-6 rounded-full border-8 border-slate-200 bg-white shadow-lg md:h-60 md:w-60"/>
            <div className="absolute bottom-4 right-6 h-40 w-56 rounded-2xl border-8 border-slate-200 bg-white shadow-lg md:h-48 md:w-64"/>
          </div>
        </div>
      </section>
      <section className="py-10">
        <div className="container">
          <h2 className="mb-4 text-xl font-semibold">Featured Pieces</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="mt-6">
            <Link to="/shop" className="rounded-md bg-brand px-4 py-2 font-medium text-white hover:shadow">See All</Link>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-10">
        <div className="container grid items-start gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Why Shop Local?</h3>
            <p>Every purchase helps keep art alive in San Antonio. Pa Pa is a senior citizen who pours love and patience into each piece. Your support goes directly to a local artist and her small business.</p>
          </div>
          <div className="grid gap-3">
            {[['🎨','One‑of‑a‑kind','No two pieces are the same—each is hand‑painted with care.'],['🌸','Nature & Pets','Beloved themes: pandas, pups, kitties, and Texas blooms.'],['🤝','Community','Supporting a neighbor keeps your dollars close to home.']].map(([icon,title,desc]) => (
              <div key={title} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-xl">{icon}</div>
                <div>
                  <div className="font-semibold">{title}</div>
                  <p className="text-slate-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


