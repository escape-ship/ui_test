import { Link } from "react-router-dom";

export interface Product {
  id: number;
  name: string;
  price: string;
  img: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-4 text-center">
      <img src={product.img} alt={product.name} className="h-40 w-full object-cover rounded mb-2" />
      <h3 className="font-semibold mb-1">{product.name}</h3>
      <p className="text-sm text-muted-foreground mb-2">{product.price}</p>
      <Link to={`/product/${product.id}`} className="text-primary underline">
        View Details
      </Link>
    </div>
  );
}
