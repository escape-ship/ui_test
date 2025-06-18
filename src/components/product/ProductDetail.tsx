import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [selected, setSelected] = useState("");
  const [quantity, setQuantity] = useState(1); // 수량 상태 추가

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8081/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.product);
        setSelected(data.product.imageUrl || "https://via.placeholder.com/400");
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: quantity,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = existingCart.findIndex((item: any) => item.id === product.id);

    if (existingIndex !== -1) {
      // 이미 있으면 수량 추가
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("장바구니에 담았습니다!");
  };

  if (!product) return <div>Loading...</div>;

  const images = [
    product.imageUrl || "https://via.placeholder.com/400",
    "https://images.unsplash.com/photo-1475179593772-bdbf308cf0d4?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1490357538781-4365a3ee5816?auto=format&fit=crop&w=800&q=60",
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        <img src={selected} alt="Product" className="rounded-lg w-full" />
        <div className="flex gap-2 mt-4">
          {images.map(img => (
            <button
              key={img}
              onClick={() => setSelected(img)}
              className={`border rounded-md overflow-hidden ${
                selected === img ? "border-ring" : ""
              }`}
            >
              <img src={img} className="h-16 w-16 object-cover" />
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4 md:w-1/2">
        <h1 className="text-3xl font-bold">{product.name}</h1>

        {product.categories?.length > 0 && (
          <p className="text-sm text-muted-foreground">
            카테고리: {product.categories.map(c => c.name).join(", ")}
          </p>
        )}

        <p className="text-xl">
          {parseInt(product.price, 10).toLocaleString()}원
        </p>

        <p className="text-sm text-muted-foreground">재고: {product.inventory}개</p>

        <p className="text-muted-foreground">
          A beautiful piece crafted from the finest gold.
        </p>

        <div className="flex items-end gap-2">
          <Input
            type="number"
            value={quantity}
            onChange={e => setQuantity(Math.max(1, parseInt(e.target.value)))}
            min={1}
            className="w-20"
          />
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
