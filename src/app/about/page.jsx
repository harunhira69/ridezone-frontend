"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-80 md:h-[28rem] rounded-3xl overflow-hidden shadow-lg"
        >
          <Image
            src="https://i.ibb.co/CKjgJ0kd/Lucid-Origin-Professional-motorcycle-showroom-interior-with-sl-0.jpg" // Example placeholder, replace with your URL
            alt="RideZone"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Right: Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            About <span className="text-purple-600">RideZone</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-6">
            RideZone is your ultimate platform for discovering, comparing, and purchasing bikes, cars, bicycles, and watches. 
            We bring the latest technology, trusted reviews, and seamless browsing experience together so you can make smarter and faster decisions.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-6">
            Our mission is to simplify your search for the perfect ride, whether it’s a high-speed bike, a luxury car, or a reliable bicycle. 
            RideZone combines cutting-edge design, real user reviews, and curated product collections to provide the best online shopping experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300">
              Learn More
            </button>
            <button className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium px-6 py-3 rounded-xl shadow-lg transition-all duration-300">
              Contact Us
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
