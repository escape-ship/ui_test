import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const goldOptions = ["14k", "18k", "24k"];
const colorOptions: Record<string, string[]> = {
  "14k": ["화이트", "리얼화이트", "옐로우", "리얼옐로우", "핑크"],
  "18k": ["화이트", "리얼화이트", "옐로우", "리얼옐로우", "핑크"],
  "24k": ["옐로우"],
};
const sizeOptions = ["10호", "11호", "12호", "13호", "14호"];

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  // 옵션 상태
  const [selectedGold, setSelectedGold] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8081/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.product);
        setSelectedImage(data.product.imageUrl || "https://via.placeholder.com/400");
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    if (!product || !selectedGold || !selectedColor || !selectedSize) {
      alert("옵션을 모두 선택해주세요.");
      return;
    }

    const cartItem = {
      id: `${product.id}-${selectedGold}-${selectedColor}-${selectedSize}`,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: quantity,
      gold: selectedGold,
      color: selectedColor,
      size: selectedSize,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = existingCart.findIndex((item: any) => item.id === cartItem.id);

    if (existingIndex !== -1) {
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
      {/* 이미지 영역 */}
      <div className="md:w-1/2">
        <img src={selectedImage} alt="Product" className="rounded-lg w-full" />
        <div className="flex gap-2 mt-4">
          {images.map(img => (
            <button
              key={img}
              onClick={() => setSelectedImage(img)}
              className={`border rounded-md overflow-hidden ${selectedImage === img ? "border-ring" : ""}`}
            >
              <img src={img} className="h-16 w-16 object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* 상품 정보 및 옵션 선택 영역 */}
      <div className="space-y-4 md:w-1/2">
        <h1 className="text-3xl font-bold">{product.name}</h1>

        {product.categories?.length > 0 && (
          <p className="text-sm text-muted-foreground">
            카테고리: {product.categories.map(c => c.name).join(", ")}
          </p>
        )}

        <p className="text-xl">{parseInt(product.price, 10).toLocaleString()}원</p>

        <p className="text-muted-foreground">A beautiful piece crafted from the finest gold.</p>

        {/* 금 종류 선택 */}
        <div>
          <label className="font-semibold">옵션 선택 (금 종류)</label>
          <select
            value={selectedGold}
            onChange={e => {
              setSelectedGold(e.target.value);
              setSelectedColor("");
              setSelectedSize("");
            }}
            className="w-full border rounded-md p-2 mt-1"
          >
            <option value="">선택하세요</option>
            {goldOptions.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* 색상 선택 */}
        {selectedGold && (
          <div>
            <label className="font-semibold">색상 선택</label>
            <div className="flex gap-2 mt-1 flex-wrap">
              {colorOptions[selectedGold].map(color => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    setSelectedSize("");
                  }}
                  className={`px-3 py-1 rounded-full border ${
                    selectedColor === color ? "bg-black text-white" : "bg-gray-100"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 사이즈 선택 */}
        {selectedColor && (
          <div>
            <label className="font-semibold">사이즈 선택</label>
            <div className="flex gap-2 mt-1 flex-wrap">
              {sizeOptions.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 rounded-md border ${
                    selectedSize === size ? "bg-black text-white" : "bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 수량 및 장바구니 버튼 */}
        {selectedSize && (
          <div className="flex items-end gap-2 mt-4">
            <Input
              type="number"
              value={quantity}
              onChange={e => setQuantity(Math.max(1, parseInt(e.target.value)))}
              min={1}
              className="w-20"
            />
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </div>
        )}
      </div>
    </div>
  );
}
