import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageWrapper from "@/components/layout/PageWrapper";
import HomePage from "@/pages/home";
import ShopPage from "@/pages/shop";
import ProductDetailPage from "@/pages/product/[id]";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import CustomOrderPage from "@/pages/custom-order";
import AboutPage from "@/pages/about";
import FAQPage from "@/pages/faq";
import ContactPage from "@/pages/contact";
import "./index.css";

export function App() {
  return (
    <BrowserRouter>
      <PageWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/custom-order" element={<CustomOrderPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </PageWrapper>
    </BrowserRouter>
  );
}

export default App;
