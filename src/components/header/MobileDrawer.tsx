import { useState } from "react"
import { Menu } from "lucide-react"
import { Link } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"

export default function MobileDrawer({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className={className} aria-label="open menu">
          <Menu />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-6 space-y-4">
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/shop" onClick={() => setOpen(false)}>Shop</Link>
        <Link to="/custom-order" onClick={() => setOpen(false)}>Custom Order</Link>
        <Link to="/about" onClick={() => setOpen(false)}>About</Link>
        <Link to="/faq" onClick={() => setOpen(false)}>FAQ</Link>
        <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
      </SheetContent>
    </Sheet>
  )
}
