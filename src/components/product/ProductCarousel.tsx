import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

type Props = {
  title: string
  query: string
}

type Product = { id: string; name: string; price: number; img: string }

export default function ProductCarousel({ title, query }: Props) {
  const [items, setItems] = useState<Product[]>([])

  useEffect(() => {
    // fetch products (placeholder)
    fetch(`/api/products?${query}`)
      .then(res => res.json())
      .then(setItems)
  }, [query])

  return (
    <section className="mt-16 md:mt-24 wrapper space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex gap-4 overflow-auto snap-x">
        {items.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  )
}
