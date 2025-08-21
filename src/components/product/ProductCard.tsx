import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export interface Product {
  id: string; // uuid
  name: string;
  price: number;
  image_url: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  // image_url이 없거나 빈 값이면 네이버 sunny CDN 기본 이미지 사용
  const imageUrl =
    product.image_url && product.image_url.trim() !== ""
      ? product.image_url
      : "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fitem.elandrs.com%2Fr%2Fimage%2Foa%2F2024-10-15%2F078c23b0-d445-4309-bbbf-1663e25a09ca.jpg&type=a340";

  // 장바구니 담기 핸들러
  const handleAddToCart = () => {
    if (!isLoggedIn || !user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    // 사용자별 장바구니 키 생성
    const userCartKey = `cart_${user.id || user.user_id}`;
    const existingCart = JSON.parse(localStorage.getItem(userCartKey) || "[]");
    const cartItemId = product.id;
    const existingIndex = existingCart.findIndex((item: any) => item.id === cartItemId);
    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push({
        id: cartItemId,
        name: product.name,
        imageUrl: product.image_url,
        price: product.price,
        quantity: 1,
        options: {},
      });
    }
    localStorage.setItem(userCartKey, JSON.stringify(existingCart));
    alert("장바구니에 담았습니다!");
  };

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
      <Button variant="secondary" className="mt-auto" onClick={handleAddToCart}>
        Add to Cart
      </Button>
      <Link to={`/product/${product.id}`} className="text-primary underline">
        View Details
      </Link>
    </div>
  );
}
