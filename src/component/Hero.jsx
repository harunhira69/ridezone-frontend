"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";

export default function Hero({ heroImages }) {
  // Default images
  const images = heroImages?.length
    ? heroImages
    : [
        "https://i.ibb.co/7crpyJH/Pix-Verse-Image-Effect-prompt-Blue-Yamaha-R15-V.jpg",
        "https://i.ibb.co/hRsVcsZz/Pix-Verse-Image-Effect-prompt-Futuristic-electr.jpg",
        "https://i.ibb.co/v6CZJnf9/Pix-Verse-Image-Effect-prompt-High-end-modern-c.jpg",
        "https://i.ibb.co/N2LnyGKt/Pix-Verse-Image-Effect-prompt-Fat-tire-adventur.jpg",
      ];

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx} className="relative w-full h-full">
            <Image
              src={img}
              alt={`Hero ${idx + 1}`}
              fill
              priority={idx === 0}
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
