import { useEffect, useState } from "react";
import ProductCardList from "@/components/product/ProductCardList";
import { Product } from "@/components/product/ProductCard";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:8081/products")
      .then((res) => res.json())
      .then((data) => {
        // imageUrl -> image_url로 변환
        const mapped = (data.products ?? []).map((p: any) => ({
          ...p,
          image_url: p.imageUrl || p.image_url || ""
        }));
        setProducts(mapped);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <ProductCardList products={products} />;
}
