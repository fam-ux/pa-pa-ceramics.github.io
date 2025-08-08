import { useCart } from '../context/CartContext'

export default function ProductCard({ product }){
  const { addItem } = useCart()
  const { id, name, priceCents, type, theme, imageAlt, image } = product
  const price = (priceCents/100).toLocaleString(undefined, { style:'currency', currency:'USD' })
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="grid h-48 place-items-center bg-gradient-to-b from-slate-50 to-slate-100">
        {image ? (
          <img
            src={`${import.meta.env.BASE_URL}products/${image}`}
            alt={imageAlt || name}
            className="h-44 w-auto object-contain"
            loading="lazy"
          />
        ) : (
          <svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label={imageAlt || name}>
            <rect x="0" y="0" width="120" height="120" rx="14" fill="#f3f7f5"/>
            <circle cx="60" cy="60" r="40" fill="#ffffff" stroke="#e6e7eb" />
          </svg>
        )}
      </div>
      <div className="space-y-2 p-4">
        <h3 className="font-semibold">{name}</h3>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{type} • {theme}</span>
          <span className="font-semibold text-slate-900">{price}</span>
        </div>
        <button
          onClick={() => addItem(product)}
          className="w-full rounded-md bg-brand px-3 py-2 font-medium text-white hover:shadow"
        >Add to cart</button>
      </div>
    </article>
  )
}


