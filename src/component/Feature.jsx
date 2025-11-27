"use client";
import { motion } from "framer-motion";
import { FiStar, FiTruck, FiShield, FiTrendingUp } from "react-icons/fi";

const features = [
  {
    icon: <FiStar size={32} />,
    title: "Top Rated Bikes",
    desc: "Explore premium motorcycles trusted by thousands of riders.",
  },
  {
    icon: <FiTruck size={32} />,
    title: "Fast Delivery",
    desc: "Get your dream bike delivered right to your location quickly.",
  },
  {
    icon: <FiShield size={32} />,
    title: "Secure Purchase",
    desc: "Your transactions and payments are safe with advanced security.",
  },
  {
    icon: <FiTrendingUp size={32} />,
    title: "Best Price Deals",
    desc: "Compare prices and find the most affordable options easily.",
  },
];

export default function Feature() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-center mb-4 tracking-tight text-gray-900 dark:text-white"
        >
          Why Choose{" "}
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
            RideZone?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16 text-lg md:text-xl leading-relaxed"
        >
          We make your motorcycle shopping smarter with the best features and seamless user experience.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            >
              {/* Icon Circle */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 mb-5 text-white text-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
