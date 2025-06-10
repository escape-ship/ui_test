import ProductCard, { Product } from "@/components/product/ProductCard";

const products: Product[] = [
  { id: 1, name: 'Gold Ring', price: '$499', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=60' },
  { id: 2, name: 'Gold Necklace', price: '$899', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=60' },
];

export default function ShopPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
