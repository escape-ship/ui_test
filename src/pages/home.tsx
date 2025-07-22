import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductCarousel from "@/components/home/ProductCarousel";
import PromoBanner from "@/components/home/PromoBanner";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <Hero />
      <CategoryGrid />
      <ProductCarousel />
      <PromoBanner />
    </div>
  );
}
