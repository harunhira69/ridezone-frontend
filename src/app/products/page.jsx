"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLoader } from "@/component/loaderProvider";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  // ❗ Correct destructuring
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    showLoader(); // Start loading

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        const uniqueCategories = [
          "All",
          ...Array.from(
            new Set(data.map((item) => item.category || "Uncategorized"))
          ),
        ];

        setCategories(uniqueCategories);

        hideLoader(); // Stop loading
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        hideLoader();
      });
  }, [showLoader,hideLoader]);

  // Filter logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch = (p.title || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || p.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mt-10">All Products</h2>
      <p className="text-center text-gray-600 mt-2 mb-8">
        Browse our exclusive collection and find the perfect product for you.
      </p>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg shadow-sm"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => {
          const imgSrc = product.image?.startsWith("http")
            ? product.image
            : "/placeholder.png";

          return (
            <div
              key={product._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col"
            >
              <Image
                src={imgSrc}
                alt={product.name || "Product image"}
                width={400}
                height={300}
                className="rounded-lg h-48 w-full object-cover mb-3"
              />

              <h3 className="text-xl font-bold mt-2">
                {product.title || "No Name"}
              </h3>

              <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                {product.shortDescription || "No description available."}
              </p>

              <p className="text-gray-500 mt-1">{product.brand || ""}</p>

              <p className="text-red-600 font-bold text-lg mt-1">
                ${product.price || "N/A"}
              </p>

              <Link href={`/products/${product._id}`}>
                <button className="mt-auto w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-3">
                  View Details
                </button>
              </Link>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-600 mt-10">
          No products found.
        </p>
      )}
    </div>
  );
}
