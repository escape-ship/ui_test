import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export interface Product {
  id: number;
  name: string;
  price: string;
  img: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border p-6 text-center">
      <img
        src={product.img}
        alt={product.name}
        className="h-48 w-full rounded object-cover"
      />
      <h3 className="text-lg font-medium">{product.name}</h3>
      <p className="text-sm text-muted-foreground">{product.price}</p>
      <Button variant="secondary" className="mt-auto">
        Add to Cart
      </Button>
      <Link to={`/product/${product.id}`} className="text-primary underline">
        View Details
      </Link>
    </div>
  );
}
