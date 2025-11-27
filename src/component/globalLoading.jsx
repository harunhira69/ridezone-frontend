"use client";

import { motion } from "framer-motion";

export default function GlobalLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-md z-[9999]">

      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
      />

      <motion.p
        className="absolute mt-28 text-gray-700 dark:text-gray-300 text-lg font-semibold"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Loading...
      </motion.p>

    </div>
  );
}
