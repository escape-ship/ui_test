import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Menu, Search, ShoppingCart } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function NavBar() {
  const { isLoggedIn } = useAuth();
  const links = (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link to="/">Home</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link to="/shop">Shop</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link to="/custom-order">Custom Order</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link to="/about">About</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link to="/faq">FAQ</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link to="/contact">Contact</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </>
  );

  return (
    <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="text-xl font-bold">
          Gold Shop
        </Link>
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">{links}</NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hidden md:block" aria-label="Search">
            <Search className="size-5" />
          </button>
          <Link to="/cart" aria-label="Cart">
            <ShoppingCart className="size-5" />
          </Link>
          <Link
            to={isLoggedIn ? "/profile" : "/login"}
            className="text-sm"
          >
            {isLoggedIn ? "My Account" : "Login"}
          </Link>
          <Drawer direction="left">
            <DrawerTrigger className="md:hidden p-2" aria-label="Menu">
              <Menu />
            </DrawerTrigger>
            <DrawerContent className="p-6 w-64">
              <nav className="flex flex-col gap-4">
                {(
                  [
                    { to: "/", label: "Home" },
                    { to: "/shop", label: "Shop" },
                    { to: "/custom-order", label: "Custom Order" },
                    { to: "/about", label: "About" },
                    { to: "/faq", label: "FAQ" },
                    { to: "/contact", label: "Contact" },
                  ] as const
                ).map(link => (
                  <Link key={link.to} to={link.to} className="text-base">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
