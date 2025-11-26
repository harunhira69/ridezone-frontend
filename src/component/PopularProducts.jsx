"use client";
import React from "react";
import { Star } from "lucide-react";

const PopularProducts = () => {
  const products = [
    {
      id: 1,
      name: "Yamaha R15 V3",
      category: "Bike",
      price: "$2,500",
      rating: 4.9,
      img: "https://i.ibb.co/7crpyJH/Pix-Verse-Image-Effect-prompt-Blue-Yamaha-R15-V.jpg",
    },
    {
      id: 2,
      name: "Tesla Model 3",
      category: "Car",
      price: "$35,000",
      rating: 4.8,
      img: "https://i.ibb.co/v6CZJnf9/Pix-Verse-Image-Effect-prompt-High-end-modern-c.jpg",
    },
    {
      id: 3,
      name: "Giant MTB Bike",
      category: "Bicycle",
      price: "$1,200",
      rating: 4.7,
      img: "https://i.ibb.co/N2LnyGKt/Pix-Verse-Image-Effect-prompt-Fat-tire-adventur.jpg",
    },
    {
      id: 4,
      name: "Apple Watch Series 9",
      category: "Watch",
      price: "$399",
      rating: 4.8,
      img: "https://i.ibb.co/Z60sW1KK/Lucid-Origin-Apple-Watch-Series-9-with-a-sleek-and-modern-desi-0.jpg",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Popular Products
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg md:text-xl">
            Our best-selling bikes, cars, bicycles, and watches
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 flex flex-col items-center text-center"
            >
              {/* Image */}
              <div className="relative w-full h-56 mb-4">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Category Badge */}
              <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium mb-2">
                {product.category}
              </span>

              {/* Product Info */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {product.name}
              </h3>

              <div className="flex items-center gap-2 mt-1">
                <Star size={18} className="text-yellow-400" />
                <p className="text-gray-700 dark:text-gray-300 font-medium">{product.rating}</p>
              </div>

              <p className="text-blue-600 dark:text-blue-400 font-bold text-lg mt-2">
                {product.price}
              </p>

              {/* Button */}
              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 rounded-2xl transition-all duration-300">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
