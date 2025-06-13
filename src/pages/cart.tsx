import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const items = [
  {
    id: 1,
    name: "Gold Ring",
    price: "$499",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=60",
    qty: 1,
  },
];

export default function CartPage() {
  const total = items.reduce((sum, item) => sum + parseFloat(item.price.slice(1)) * item.qty, 0);
  return (
    <div className="space-y-6">
      <table className="w-full text-left border">
        <thead className="bg-secondary">
          <tr>
            <th className="p-2">Product</th>
            <th className="p-2">Price</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="border-t">
              <td className="p-2 flex items-center gap-4">
                <img src={item.img} className="w-16 h-16 object-cover rounded" />
                {item.name}
              </td>
              <td className="p-2">{item.price}</td>
              <td className="p-2 w-24">
                <Input type="number" defaultValue={item.qty} min={1} />
              </td>
              <td className="p-2">
                ${parseFloat(item.price.slice(1)) * item.qty}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right space-y-2">
        <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
        <Button asChild>
          <Link to="/checkout">Checkout</Link>
        </Button>
      </div>
    </div>
  );
}
