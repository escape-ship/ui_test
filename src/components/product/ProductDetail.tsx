import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type OptionValue = {
  valueId: number;
  value: string;
};

type ProductOption = {
  optionId: number;
  optionName: string;
  values: OptionValue[];
};

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  categories?: { id: number; name: string }[];
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [options, setOptions] = useState<ProductOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    // 1) 상품 상세 정보 불러오기
    fetch(`http://localhost:8081/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.product);
        setSelectedImage(data.product.imageUrl || "https://via.placeholder.com/400");
      })
      .catch(console.error);

    // 2) 옵션 데이터 불러오기 (gRPC REST API)
    fetch(`http://localhost:8081/product/${id}/options`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then(res => res.json())
      .then(data => {
        setOptions(data.options || []);
      })
      .catch(console.error);
  }, [id]);

  // 옵션 선택 변경 핸들러
  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value,
    }));
  };

  // 장바구니 담기
  const handleAddToCart = () => {
    if (!product) return;

    // 모든 옵션이 선택됐는지 체크
    for (const opt of options) {
      if (!selectedOptions[opt.optionName]) {
        alert(`${opt.optionName} 옵션을 선택해주세요.`);
        return;
      }
    }

    const cartItemId = `${product.id}-${Object.values(selectedOptions).join("-")}`;

    const cartItem = {
      id: cartItemId,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity,
      options: { ...selectedOptions },
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = existingCart.findIndex((item: any) => item.id === cartItemId);

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("장바구니에 담았습니다!");
  };

  if (!product) return <div>Loading product...</div>;

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

        <p className="text-xl">{product.price.toLocaleString()}원</p>

        <p className="text-muted-foreground">A beautiful piece crafted from the finest materials.</p>

        {/* 동적으로 옵션 렌더링 */}
        {options.map(opt => (
          <div key={opt.optionId}>
            <label className="font-semibold">{opt.optionName} 선택</label>
            <select
              value={selectedOptions[opt.optionName] || ""}
              onChange={e => handleOptionChange(opt.optionName, e.target.value)}
              className="w-full border rounded-md p-2 mt-1"
            >
              <option value="">선택하세요</option>
              {opt.values.map(v => (
                <option key={v.valueId} value={v.value}>
                  {v.value}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* 수량 및 장바구니 버튼 */}
        {options.length > 0 && (
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
