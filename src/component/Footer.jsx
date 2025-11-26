"use client";

import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 dark:bg-black border-t border-zinc-800 mt-20">
      <div className="w-11/12 mx-auto py-12 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* BRAND / ABOUT */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">RideZone</h2>
          <p className="text-sm leading-6 text-zinc-400">
            Your trusted marketplace for premium bikes. Explore, compare, and buy your dream motorcycle with confidence.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* CUSTOMER SUPPORT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="/shipping" className="hover:text-white">Shipping Info</a></li>
          </ul>
        </div>

        {/* SOCIAL LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex items-center space-x-5 text-2xl">
            <a href="#" className="hover:text-white"><FaFacebook /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaYoutube /></a>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-zinc-800 py-5 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} RideZone. All rights reserved.
      </div>
    </footer>
  );
}
