"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";

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

  const animatedWords = [
    "Adventure Awaits",
    "Ride Smarter",
    "Find Your Dream Bike",
    "Speed & Style",
  ];

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">

      {/* Background Slider */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="absolute inset-0 w-full h-full"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={img}
              alt={`Hero ${idx + 1}`}
              fill
              priority={idx === 0}
              className="object-cover"
              sizes="100vw"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm"></div>

      {/* Text Content Layered On Top */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center text-center md:text-left">
        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-lg min-h-20"
        >
          <Typewriter
            words={animatedWords}
            loop={Infinity}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto md:mx-0"
        >
          Explore top-rated motorcycles, compare specs, and choose the perfect ride. RideZone brings you the ultimate experience.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
        >
          <Link href="/products">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-xl shadow-lg flex items-center gap-2 text-lg transition">
              Explore Bikes <FiArrowRight />
            </button>
          </Link>

          <Link href="/about">
            <button className="bg-white/20 hover:bg-white/30 text-white font-medium px-8 py-3 rounded-xl shadow-lg text-lg transition">
              Learn More
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
