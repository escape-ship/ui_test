import { Outlet, Route, Routes } from 'react-router-dom'
import NavBar from '../components/header/NavBar'
import Footer from '../components/footer/Footer'
import Home from '../pages/home'
import Shop from '../pages/shop'
import ProductDetail from '../pages/product/[id]'
import Cart from '../pages/cart'
import Checkout from '../pages/checkout'
import CustomOrder from '../pages/custom-order'
import About from '../pages/about'
import Faq from '../pages/faq'
import Contact from '../pages/contact'

export default function AppLayout() {
  return (
    <div className="bg-white min-h-screen text-gray-800">
      <NavBar />
      <main className="pt-16">{/* sticky header height */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/custom-order" element={<CustomOrder />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
