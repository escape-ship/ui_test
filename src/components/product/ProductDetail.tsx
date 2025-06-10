import { useParams } from "react-router-dom";
import { Product } from "./ProductCard";

const mockProduct: Product = {
  id: 1,
  name: 'Gold Ring',
  price: '$499',
  img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=60'
};

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <img src={mockProduct.img} alt={mockProduct.name} className="md:w-1/2 rounded-lg" />
      <div>
        <h1 className="text-3xl font-bold mb-4">{mockProduct.name} #{id}</h1>
        <p className="text-xl mb-2">{mockProduct.price}</p>
        <p className="text-muted-foreground">A beautiful piece crafted from the finest gold.</p>
      </div>
    </div>
  );
}
