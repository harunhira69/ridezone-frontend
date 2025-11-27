"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Rahim Ahmed",
    role: "Bike Enthusiast",
    image: "https://i.ibb.co/sphzpFvC/Lucid-Origin-Ultrarealistic-male-motorcycle-enthusiast-with-a-0.jpg",
    quote:
      "RideZone made buying my first bike incredibly easy. The UI is smooth, and product details are super accurate!",
  },
  {
    name: "Sadia Islam",
    role: "Student",
    image: "https://i.ibb.co/MJNhWrZ/Lucid-Origin-Photorealistic-portrait-of-a-young-female-student-1.jpg",
    quote:
      "I love the clean layout and fast browsing. The platform is perfect for comparing bikes before making a decision.",
  },
  {
    name: "Tanvir Hasan",
    role: "Professional Rider",
    image: "https://i.ibb.co/cXMrh6fD/Lucid-Origin-Realistic-male-professional-motorcycle-rider-with-1.jpg",
    quote:
      "Amazing experience! The details page gives everything clearly—from engine specs to real descriptions. Highly recommended!",
  },
];

export default function Testimonial() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-center mb-4 tracking-tight text-gray-900 dark:text-white"
        >
          What Our{" "}
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
            Customers Say
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16 text-lg md:text-xl leading-relaxed"
        >
          Real feedback from our trusted users who found their perfect ride through RideZone.
        </motion.p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              {/* Image with ring effect */}
              <div className="flex justify-center -mt-12 mb-5 relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 p-1 shadow-lg">
                  <Image
                    src={t.image}
                    width={88}
                    height={88}
                    alt={t.name}
                    className="rounded-full border-2 border-white dark:border-gray-900 object-cover"
                  />
                </div>
              </div>

              {/* Quote */}
              <p className="text-gray-700 dark:text-gray-300 text-center italic mb-6 leading-relaxed text-base md:text-lg">
                “{t.quote}”
              </p>

              {/* Name */}
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white text-center">
                {t.name}
              </h3>

              {/* Role */}
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm md:text-base">
                {t.role}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
