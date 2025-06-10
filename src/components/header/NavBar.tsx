import { NavigationMenu, NavigationMenuItem } from "../ui/navigation-menu"
import { Button } from "../ui/button"
import { ShoppingCart, Search, User } from "lucide-react"
import { Link } from "react-router-dom"
import MobileDrawer from "./MobileDrawer"

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Gold<span className="text-gray-500">Shop</span>
        </Link>

        {/* Desktop Nav */}
        <NavigationMenu className="hidden md:flex gap-6">
          <NavigationMenuItem asChild><Link to="/">Home</Link></NavigationMenuItem>
          <NavigationMenuItem asChild><Link to="/shop">Shop</Link></NavigationMenuItem>
          <NavigationMenuItem asChild><Link to="/custom-order">Custom Order</Link></NavigationMenuItem>
          <NavigationMenuItem asChild><Link to="/about">About</Link></NavigationMenuItem>
          <NavigationMenuItem asChild><Link to="/faq">FAQ</Link></NavigationMenuItem>
          <NavigationMenuItem asChild><Link to="/contact">Contact</Link></NavigationMenuItem>
        </NavigationMenu>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="search"><Search className="size-5" /></Button>
          <Button variant="ghost" size="icon" aria-label="account"><User className="size-5" /></Button>
          <Button asChild variant="outline" size="icon" aria-label="cart">
            <Link to="/cart"><ShoppingCart className="size-5" /></Link>
          </Button>

          {/* Mobile burger */}
          <MobileDrawer className="md:hidden" />
        </div>
      </div>
    </header>
  )
}
