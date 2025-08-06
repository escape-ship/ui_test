import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  options?: Record<string, string>;
};

export default function CartPage() {
  const { isLoggedIn, user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  // 사용자별 장바구니 불러오기
  useEffect(() => {
    if (!isLoggedIn || !user) {
      setItems([]);
      return;
    }

    const userCartKey = `cart_${user.id}`;
    const saved = localStorage.getItem(userCartKey);
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, [isLoggedIn, user]);

  // 수량 변경 핸들러
  const handleQtyChange = (id: string, newQty: number) => {
    if (!user) return;

    const updated = items.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setItems(updated);
    
    const userCartKey = `cart_${user.id}`;
    localStorage.setItem(userCartKey, JSON.stringify(updated));
  };

  // 상품 삭제 핸들러
  const handleRemoveItem = (id: string) => {
    if (!user) return;

    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    
    const userCartKey = `cart_${user.id}`;
    localStorage.setItem(userCartKey, JSON.stringify(updated));
  };

  // 로그인하지 않은 경우
  if (!isLoggedIn || !user) {
    return (
      <div className="text-center py-8">
        <p className="text-lg mb-4">장바구니를 보려면 로그인이 필요합니다.</p>
        <Button asChild>
          <Link to="/login">로그인</Link>
        </Button>
      </div>
    );
  }

  // 장바구니가 비어있는 경우
  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg mb-4">장바구니가 비어있습니다.</p>
        <Button asChild>
          <Link to="/shop">쇼핑하러 가기</Link>
        </Button>
      </div>
    );
  }

  // 합계 계산
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">장바구니</h1>
      <table className="w-full text-left border">
        <thead className="bg-secondary">
          <tr>
            <th className="p-2">Product</th>
            <th className="p-2">Price</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Subtotal</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="border-t">
              <td className="p-2 flex items-center gap-4">
                <img
                  src={item.imageUrl || "https://via.placeholder.com/64"}
                  className="w-16 h-16 object-cover rounded"
                  alt={item.name}
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  {item.options && (
                    <div className="text-sm text-muted-foreground">
                      {Object.entries(item.options).map(([key, value]) => (
                        <span key={key} className="mr-2">
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </td>
              <td className="p-2">{item.price.toLocaleString()}원</td>
              <td className="p-2 w-24">
                <Input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={e =>
                    handleQtyChange(item.id, Math.max(1, Number(e.target.value)))
                  }
                />
              </td>
              <td className="p-2">
                {(item.price * item.quantity).toLocaleString()}원
              </td>
              <td className="p-2">
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  삭제
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right space-y-2">
        <p className="text-lg font-semibold">Total: {total.toLocaleString()}원</p>
        <div className="space-x-2">
          <Button variant="outline" asChild>
            <Link to="/shop">쇼핑 계속하기</Link>
          </Button>
          <Button asChild>
            <Link to="/checkout">결제하기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
