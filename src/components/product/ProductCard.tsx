import { Card, CardContent } from '../ui/card'

type Props = {
  product: { id: string; name: string; price: number; img: string }
}
export default function ProductCard({ product }: Props) {
  return (
    <Card className="w-56 shrink-0 bg-white hover:shadow-lg transition">
      <img src={product.img} alt={product.name} className="h-40 w-full object-cover rounded-t-xl" />
      <CardContent className="p-3">
        <p className="truncate">{product.name}</p>
        <p className="font-semibold mt-1">{product.price.toLocaleString()}원</p>
      </CardContent>
    </Card>
  )
}
