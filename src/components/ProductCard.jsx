import { useCart } from '../context/CartContext'
import ImageGallery from './ImageGallery'

export default function ProductCard({ product }){
  const { addItem } = useCart()
  const { id, name, priceCents, type, theme, imageAlt, images, image } = product
  const price = (priceCents/100).toLocaleString(undefined, { style:'currency', currency:'USD' })
  
  const productImages = images || (image ? [image] : [])

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
      <ImageGallery 
        images={productImages} 
        imageAlt={imageAlt} 
        productName={name}
      />
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


