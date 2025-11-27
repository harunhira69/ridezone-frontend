"use client";

import Link from "next/link";
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
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/products" className="hover:text-white">Products</Link></li>
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contact-us" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* CUSTOMER SUPPORT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link href="/shipping" className="hover:text-white">Shipping Info</Link></li>
          </ul>
        </div>

        {/* SOCIAL LINKS (External) */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex items-center space-x-5 text-2xl">
            <a href="https://www.facebook.com/ridezone" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaFacebook /></a>
            <a href="https://www.instagram.com/ridezone" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaInstagram /></a>
            <a href="https://www.twitter.com/ridezone" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaTwitter /></a>
            <a href="https://www.youtube.com/ridezone" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaYoutube /></a>
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
