import { useParams } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Product } from "./ProductCard";

const mockProduct: Product = {
  id: 1,
  name: "Gold Ring",
  price: "$499",
  img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=60",
};

const images = [
  mockProduct.img,
  "https://images.unsplash.com/photo-1475179593772-bdbf308cf0d4?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1490357538781-4365a3ee5816?auto=format&fit=crop&w=800&q=60",
];

export default function ProductDetail() {
  const { id } = useParams();
  const [selected, setSelected] = useState(images[0]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        <img
          src={selected}
          srcSet={`${selected} 1x, ${selected.replace('w=800', 'w=1600')} 2x`}
          sizes="(min-width: 768px) 50vw, 100vw"
          loading="lazy"
          alt="Product"
          className="rounded-lg w-full object-cover"
        />
        <div className="flex gap-2 mt-4">
          {images.map(img => (
            <button key={img} onClick={() => setSelected(img)} className={`border rounded-md overflow-hidden ${selected === img ? 'border-ring' : ''}`}>
              <img
                src={img}
                srcSet={`${img} 1x, ${img.replace('w=800', 'w=1600')} 2x`}
                sizes="64px"
                loading="lazy"
                className="h-16 w-16 object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4 md:w-1/2">
        <h1 className="text-3xl font-bold">{mockProduct.name} #{id}</h1>
        <p className="text-xl">{mockProduct.price}</p>
        <p className="text-muted-foreground">A beautiful piece crafted from the finest gold.</p>
        <div className="flex items-end gap-2">
          <Input type="number" defaultValue={1} min={1} className="w-20" />
          <Button>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
