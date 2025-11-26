"use client";
import { motion } from "framer-motion";
import { FiStar, FiTruck, FiShield, FiTrendingUp } from "react-icons/fi";

const feature = [
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          Why Choose <span className="text-purple-600">RideZone?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
        >
          We make your motorcycle shopping smarter with the best features and seamless user experience.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {feature.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all group"
            >
              <div className="text-purple-600 mb-4 group-hover:text-purple-800 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
