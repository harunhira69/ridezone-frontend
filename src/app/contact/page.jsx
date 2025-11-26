"use client";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-4"
        >
          Get in <span className="text-purple-600">Touch</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center text-gray-700 dark:text-gray-300 mb-12"
        >
          Have questions or suggestions? We love to hear from you!
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg grid gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 transition"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 transition"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 transition"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 transition"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
          >
            Send Message
          </button>
        </motion.form>

        {/* Optional Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-3xl mx-auto mt-12 text-center text-gray-700 dark:text-gray-300"
        >
          <p>Email: <span className="font-semibold text-purple-600">support@ridezone.com</span></p>
          <p>Phone: <span className="font-semibold text-purple-600">+880 1234 567 890</span></p>
          <p>Address: <span className="font-semibold text-purple-600">Dhaka, Bangladesh</span></p>
        </motion.div>

      </div>
    </section>
  );
}
