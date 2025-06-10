import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function MobileDrawer() {
  return (
    <div className="md:hidden">
      <Drawer direction="left">
        <DrawerTrigger className="p-2"><Menu /></DrawerTrigger>
        <DrawerContent className="p-6 w-64">
          <nav className="flex flex-col gap-4">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/custom-order">Custom Order</Link>
            <Link to="/about">About</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
