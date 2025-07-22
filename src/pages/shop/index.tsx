import { useEffect, useState } from "react";
import ProductCardList from "@/components/product/ProductCardList";
import { Product } from "@/components/product/ProductCard";
import { config } from "@/lib/config";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    console.log(`🌐 [ShopPage] Fetching products from: ${config.BACKEND_URL}/products`);
    
    fetch(`${config.BACKEND_URL}/products`)
      .then((res) => {
        console.log(`📡 [ShopPage] Response status: ${res.status}`, res);
        return res.json();
      })
      .then((data) => {
        console.log(`📦 [ShopPage] Products data received:`, data);
        // imageUrl -> image_url로 변환
        const mapped = (data.products ?? []).map((p: any) => ({
          ...p,
          image_url: p.imageUrl || p.image_url || ""
        }));
        console.log(`✅ [ShopPage] Mapped products:`, mapped);
        setProducts(mapped);
      })
      .catch((err) => {
        console.error(`❌ [ShopPage] API Error:`, err);
      });
  }, []);

  return <ProductCardList products={products} />;
}
