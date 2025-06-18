import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export interface Product {
  id: string; // uuid
  name: string;
  price: number;
  image_url: string;
}

export default function ProductCard({ product }: { product: Product }) {
  // image_url이 없거나 빈 값이면 네이버 sunny CDN 기본 이미지 사용
  const imageUrl =
    product.image_url && product.image_url.trim() !== ""
      ? product.image_url
      : "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fitem.elandrs.com%2Fr%2Fimage%2Foa%2F2024-10-15%2F078c23b0-d445-4309-bbbf-1663e25a09ca.jpg&type=a340";
  return (
    <div className="flex flex-col gap-3 rounded-lg border p-6 text-center">
      <img
        src={imageUrl}
        alt={product.name}
        className="h-48 w-full rounded object-contain bg-white"
      />
      <h3 className="text-lg font-medium">{product.name}</h3>
      <p className="text-sm text-muted-foreground">
        {product.price.toLocaleString()}원
      </p>
      <Button variant="secondary" className="mt-auto">
        Add to Cart
      </Button>
      <Link to={`/product/${product.id}`} className="text-primary underline">
        View Details
      </Link>
    </div>
  );
}
