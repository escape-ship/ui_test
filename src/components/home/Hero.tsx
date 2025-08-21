import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

const images = [
  "/banner/banner1.png",
  "/banner/banner2.jpg",
  "/banner/banner3.jpg"
];

export default function Hero() {
  return (
    <div className="relative z-20">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="h-[600px] w-full relative"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <section className="relative h-full w-full">
              <img
                src={img}
                alt={`슬라이드 ${index + 1}`}
                className="absolute inset-0 w-full h-full object-contain z-0"
              />
              <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_60px_40px_rgba(0,0,0,0.1)]" />
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
