import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { config } from "@/lib/config";

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  options?: Record<string, string>;
  checked?: boolean;
};

export default function CartPage() {
  const { isLoggedIn, user, token } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // 사용자별 장바구니 불러오기
  useEffect(() => {
    if (!isLoggedIn || !user) {
      setItems([]);
      return;
    }

    const userCartKey = `cart_${user.id}`;
    const saved = localStorage.getItem(userCartKey);
    if (saved) {
      // 모든 아이템에 checked=false 추가
      const arr = JSON.parse(saved).map((item: CartItem) => ({ ...item, checked: false }));
      setItems(arr);
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

  // 상품 선택 핸들러
  const handleCheckItem = (id: string, checked: boolean) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, checked } : item
    );
    setItems(updated);
  };

  // 전체 선택 핸들러
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setItems(items.map(item => ({ ...item, checked })));
  };

  // 선택 삭제
  const handleRemoveSelected = () => {
    if (!user) return;
    const updated = items.filter(item => !item.checked);
    setItems(updated);
    const userCartKey = `cart_${user.id}`;
    localStorage.setItem(userCartKey, JSON.stringify(updated));
  };

  // 모두 삭제
  const handleRemoveAll = () => {
    if (!user) return;
    setItems([]);
    const userCartKey = `cart_${user.id}`;
    localStorage.setItem(userCartKey, JSON.stringify([]));
  };

  // 선택 구매
  const handleBuySelected = async () => {
    await handleOrder(items.filter(item => item.checked));
  };

  // 모두 구매
  const handleBuyAll = async () => {
    await handleOrder(items);
  };

  // 주문하기 API 호출
  const handleOrder = async (orderItems: CartItem[]) => {
    if (!user || orderItems.length === 0) return;
    
    console.log(`🛒 [Cart] Starting order process for ${orderItems.length} items`);
    
    const total_price = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const quantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
    const itemsForApi = orderItems.map(item => ({
      product_id: item.id,
      product_name: item.name,
      product_options: item.options ? JSON.stringify(item.options) : "",
      product_price: item.price,
      quantity: item.quantity
    }));
    
    const payload = {
  user_id: user.user_id || user.id,
      order_number: `ORDER-${Date.now()}`,
      status: "pending",
      total_price,
      quantity,
      payment_method: "card",
      shipping_fee: 0,
      shipping_address: "",
      paid_at: new Date().toISOString(),
      memo: "",
      items: itemsForApi
    };
    
    console.log(`🛒 [Cart] Order payload:`, payload);
    console.log(`🛒 [Cart] User info:`, user);
    console.log(`🛒 [Cart] Token from context:`, token);
    console.log(`🛒 [Cart] Token from localStorage:`, localStorage.getItem("authToken"));
    
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json"
      };
      
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
        console.log(`🛒 [Cart] Authorization header set:`, headers["Authorization"]);
      } else {
        console.warn(`⚠️ [Cart] No token available!`);
      }
      
      console.log(`🛒 [Cart] Making API call to: ${config.BACKEND_URL}/v1/order/insert`);
      console.log(`🛒 [Cart] Request headers:`, headers);
      console.log(`🛒 [Cart] Request body:`, JSON.stringify(payload));
      
      const res = await fetch(`${config.BACKEND_URL}/v1/order/insert`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });
      
      console.log(`🛒 [Cart] API response status:`, res.status);
      console.log(`🛒 [Cart] API response status text:`, res.statusText);
      
      // 401 오류인 경우 응답 본문도 확인
      if (res.status === 401) {
        const errorText = await res.text();
        console.error(`❌ [Cart] 401 Unauthorized response:`, errorText);
        throw new Error(`Unauthorized: ${errorText}`);
      }
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const result = await res.json();
      console.log(`🛒 [Cart] API response data:`, result);
      
      alert("주문이 완료되었습니다! 주문번호: " + result.id);
      
      // 주문 완료 후 장바구니에서 주문한 아이템들 제거
      const remainingItems = items.filter(item => !orderItems.some(orderItem => orderItem.id === item.id));
      setItems(remainingItems);
      const userCartKey = `cart_${user.id}`;
      localStorage.setItem(userCartKey, JSON.stringify(remainingItems));
      
    } catch (e) {
      console.error(`❌ [Cart] Order API error:`, e);
      alert("주문 처리 중 오류가 발생했습니다: " + (e as Error).message);
    }
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
      <div className="flex gap-2 mb-2">
        <Button variant="outline" size="sm" onClick={() => handleSelectAll(!selectAll)}>
          {selectAll ? "전체 해제" : "전체 선택"}
        </Button>
        <Button variant="outline" size="sm" onClick={handleRemoveSelected}>
          선택 삭제
        </Button>
        <Button variant="outline" size="sm" onClick={handleRemoveAll}>
          모두 삭제
        </Button>
        <Button variant="default" size="sm" onClick={() => handleBuySelected()}>
          구매하기
        </Button>
      </div>
      <table className="w-full text-left border">
        <thead className="bg-secondary">
          <tr>
            <th className="p-2"><input type="checkbox" checked={selectAll} onChange={e => handleSelectAll(e.target.checked)} /></th>
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
              <td className="p-2 text-center">
                <input type="checkbox" checked={!!item.checked} onChange={e => handleCheckItem(item.id, e.target.checked)} />
              </td>
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
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleRemoveItem(item.id)}
                  title="삭제"
                  className="hover:bg-red-100 text-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-7 0v12a2 2 0 002 2h4a2 2 0 002-2V7" /></svg>
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
        </div>
      </div>
    </div>
  );
}
