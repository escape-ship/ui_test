import Hero from '../components/hero/Hero'
import CategoryGrid from '../components/category/CategoryGrid'
import ProductCarousel from '../components/product/ProductCarousel'
import PromoBanner from '../components/banner/PromoBanner'
import Newsletter from '../components/newsletter/Newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductCarousel title="\uD83D\uDD25 New Arrivals" query="sort=latest&limit=10" />
      <PromoBanner />
      <ProductCarousel title="Best Sellers" query="sort=popular&limit=10" />
      <Newsletter />
    </>
  )
}
