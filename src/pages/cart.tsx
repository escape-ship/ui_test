import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type CartItem = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  quantity: number;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  // localStorage에서 장바구니 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  // 수량 변경 핸들러
  const handleQtyChange = (id: number, newQty: number) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // 합계 계산
  const total = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div className="space-y-6">
      <table className="w-full text-left border">
        <thead className="bg-secondary">
          <tr>
            <th className="p-2">Product</th>
            <th className="p-2">Price</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="border-t">
              <td className="p-2 flex items-center gap-4">
                <img
                  src={item.imageUrl}
                  className="w-16 h-16 object-cover rounded"
                  alt={item.name}
                />
                {item.name}
              </td>
              <td className="p-2">{parseFloat(item.price).toLocaleString()}원</td>
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
                {(parseFloat(item.price) * item.quantity).toLocaleString()}원
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right space-y-2">
        <p className="text-lg font-semibold">Total: {total.toLocaleString()}원</p>
        <Button asChild>
          <Link to="/checkout">Checkout</Link>
        </Button>
      </div>
    </div>
  );
}
