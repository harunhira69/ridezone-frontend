"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonial = [
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          What Our <span className="text-purple-600">Customers Say</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Real feedback from our trusted users who found their perfect ride through RideZone.
        </motion.p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {testimonial.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="flex justify-center">
                <Image
                  src={t.image}
                  width={80}
                  height={80}
                  alt={t.name}
                  className="rounded-full border-4 border-purple-300 shadow-md"
                />
              </div>

              <p className="text-gray-700 text-center italic mt-5">
                “{t.quote}”
              </p>

              <h3 className="text-xl font-semibold text-center mt-4">
                {t.name}
              </h3>

              <p className="text-center text-gray-500 text-sm">{t.role}</p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
