import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import { useAuth } from "@/context/AuthContext";

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
  const navigate = useNavigate();
  const { isLoggedIn, user, token } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [options, setOptions] = useState<any>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>({});
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  // 디버깅용 로그
  useEffect(() => {
    console.log(`🔍 [ProductDetail] Component mounted/updated`);
    console.log(`🔍 [ProductDetail] isLoggedIn: ${isLoggedIn}`);
    console.log(`🔍 [ProductDetail] user:`, user);
    console.log(`🔍 [ProductDetail] token:`, token);
    console.log(`🔍 [ProductDetail] localStorage authToken:`, localStorage.getItem("authToken"));
    console.log(`🔍 [ProductDetail] localStorage user:`, localStorage.getItem("user"));
  }, [isLoggedIn, user, token]);

  useEffect(() => {
    if (!id) return;

    // 상품 상세 정보 및 옵션(optionsJson) 함께 불러오기
    fetch(`${config.BACKEND_URL}/products/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(`✅ [ProductDetail] Full API response:`, data);
        
        setProduct(data.product);
        setSelectedImage(data.product.imageUrl || data.product.image_url || "https://via.placeholder.com/400");
        
        // optionsJson 파싱 - 백엔드 응답에 맞게 수정
        let parsedOptions: any = {};
        const optionsJson = data.product.optionsJson;
        
        console.log(`🔍 [ProductDetail] Raw optionsJson:`, optionsJson);
        
        if (optionsJson) {
          try {
            parsedOptions = JSON.parse(optionsJson);
            console.log(`✅ [ProductDetail] Parsed options:`, parsedOptions);
          } catch (e) {
            console.error("❌ [ProductDetail] 옵션 JSON 파싱 오류", e);
            parsedOptions = {};
          }
        }
        
        setOptions(parsedOptions);
      })
      .catch(error => {
        console.error(`❌ [ProductDetail] API fetch error:`, error);
      });
  }, [id, token, isLoggedIn, user, navigate]);

  // 옵션 선택 변경 핸들러
  const handleOptionChange = (optionName: string, value: any) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value,
    }));
  };

  // 장바구니 담기
  const handleAddToCart = () => {
    console.log(`🛒 [ProductDetail] Add to cart clicked`);
    console.log(`🛒 [ProductDetail] Product:`, product);
    console.log(`🛒 [ProductDetail] Options:`, options);
    console.log(`🛒 [ProductDetail] Selected options:`, selectedOptions);
    
    if (!product) return;

    // 로그인 체크
    if (!isLoggedIn || !user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    // 모든 옵션이 선택됐는지 체크 (옵션이 있는 경우에만)
    if (Object.keys(options).length > 0) {
      for (const key of Object.keys(options)) {
        if (!selectedOptions[key]) {
          alert(`${options[key].label || key} 옵션을 선택해주세요.`);
          return;
        }
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

    console.log(`🛒 [ProductDetail] Cart item:`, cartItem);

    // 사용자별 장바구니 키 생성
    const userCartKey = `cart_${user.id}`;
    const existingCart = JSON.parse(localStorage.getItem(userCartKey) || "[]");
    const existingIndex = existingCart.findIndex((item: any) => item.id === cartItemId);

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem(userCartKey, JSON.stringify(existingCart));
    console.log(`✅ [ProductDetail] Cart updated:`, existingCart);
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
        {Object.entries(options).map(([key, opt]: [string, any]) => {
          console.log(`🔍 [ProductDetail] Rendering option:`, key, opt);
          
          if (key === "metal") {
            return (
              <div key={key}>
                <label className="font-semibold">{opt.label} 선택</label>
                <select
                  value={selectedOptions[key] || ""}
                  onChange={e => handleOptionChange(key, e.target.value)}
                  className="w-full border rounded-md p-2 mt-1"
                >
                  <option value="">선택하세요</option>
                  {opt.values && opt.values.map((v: any) => (
                    <option key={v.name} value={v.name}>
                      {v.name} {v.extra_price ? `(+${v.extra_price.toLocaleString()}원)` : ""}
                    </option>
                  ))}
                </select>
              </div>
            );
          }
          
          if (key === "size") {
            return (
              <div key={key}>
                <label className="font-semibold">{opt.label} 선택</label>
                <select
                  value={selectedOptions[key] || ""}
                  onChange={e => handleOptionChange(key, e.target.value)}
                  className="w-full border rounded-md p-2 mt-1"
                >
                  <option value="">선택하세요</option>
                  {opt.values && opt.values.map((v: string) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            );
          }
          
          if (key === "color" && opt.dependency === "metal") {
            // metal 선택에 따라 색상 옵션 변경
            const selectedMetal = selectedOptions["metal"];
            const colorValues = selectedMetal && opt.values[selectedMetal] ? opt.values[selectedMetal] : [];
            
            return (
              <div key={key}>
                <label className="font-semibold">{opt.label} 선택</label>
                <select
                  value={selectedOptions[key] || ""}
                  onChange={e => handleOptionChange(key, e.target.value)}
                  className="w-full border rounded-md p-2 mt-1"
                  disabled={!selectedMetal}
                >
                  <option value="">선택하세요</option>
                  {colorValues.map((color: string) => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
                {!selectedMetal && (
                  <p className="text-sm text-muted-foreground mt-1">
                    먼저 금속 종류를 선택해주세요.
                  </p>
                )}
              </div>
            );
          }
          
          return null;
        })}

        {/* 수량 및 장바구니 버튼 */}
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
      </div>
    </div>
  );
}
