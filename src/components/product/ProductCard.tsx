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
    <div className="border rounded-lg p-4 text-center flex flex-col gap-2">
      <img
        src={product.img}
        alt={product.name}
        className="h-40 w-full object-cover rounded"
      />
      <h3 className="font-semibold">{product.name}</h3>
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
