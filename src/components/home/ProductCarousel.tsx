import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const items = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1475179593772-bdbf308cf0d4?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1490357538781-4365a3ee5816?auto=format&fit=crop&w=800&q=60',
];

export default function ProductCarousel() {
  return (
    <section className="py-12">
      <Carousel>
        <CarouselContent>
          {items.map((src, idx) => (
            <CarouselItem key={idx} className="basis-full">
              <img src={src} className="w-full h-64 object-cover rounded-lg" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
