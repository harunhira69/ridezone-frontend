"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const routes = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full backdrop-blur-lg bg-white/60 dark:bg-black/60 shadow-md z-50 border-b border-white/20 dark:border-gray-800 transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="RideZone Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              RideZone
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {routes.map((route) => (
              <Link
                key={route.name}
                href={route.path}
                className="text-gray-800 dark:text-gray-300 font-medium hover:text-purple-600 dark:hover:text-purple-400 transition"
              >
                {route.name}
              </Link>
            ))}

            {/* Only when user is logged in */}
            {session && (
              <>
                <Link
                  href="addProducts"
                  className="text-gray-800 dark:text-gray-300 font-medium hover:text-purple-600 dark:hover:text-purple-400 transition"
                >
                  Add Product
                </Link>

                <Link
                  href="/manageProducts"
                  className="text-gray-800 dark:text-gray-300 font-medium hover:text-purple-600 dark:hover:text-purple-400 transition"
                >
                  Manage Products
                </Link>
              </>
            )}

            {/* Auth Section */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={session.user.image || "/default-user.png"}
                    alt="User"
                    width={36}
                    height={36}
                    className="rounded-full border border-gray-300 dark:border-gray-700"
                  />
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {session.user.name.split(" ")[0]}
                  </span>
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-gray-900 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                    <div className="px-3 py-2 border-b border-gray-300 dark:border-gray-700">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {session.user.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {session.user.email}
                      </p>
                    </div>

                    <div className="mt-2">
                      <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded font-semibold"
                      >
                        <FiLogOut /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-lg font-semibold bg-purple-600 text-white hover:bg-purple-700 shadow"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-5 py-2 rounded-lg font-semibold bg-pink-600 text-white hover:bg-pink-700 shadow"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl text-gray-800 dark:text-gray-200"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-white dark:bg-black text-gray-900 dark:text-gray-100 space-y-2 border-t dark:border-gray-800">

          {routes.map((route) => (
            <Link
              key={route.name}
              href={route.path}
              className="block py-2 font-medium hover:text-purple-600 dark:hover:text-purple-400"
            >
              {route.name}
            </Link>
          ))}

          {session && (
            <>
              <Link
                href="/add-product"
                className="block py-2 font-medium hover:text-purple-600 dark:hover:text-purple-400"
              >
                Add Product
              </Link>

              <Link
                href="/manage-products"
                className="block py-2 font-medium hover:text-purple-600 dark:hover:text-purple-400"
              >
                Manage Products
              </Link>
            </>
          )}

          {!session ? (
            <>
              <Link
                href="/login"
                className="block text-center py-2 bg-purple-600 text-white rounded-lg font-semibold"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="block text-center py-2 bg-pink-600 text-white rounded-lg font-semibold"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full mt-2 bg-red-600 text-white py-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
