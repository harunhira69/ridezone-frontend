"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useLoader } from "@/component/LoaderProvider";

export default function AddProduct() {
  const { data: session } = useSession();
  const { showLoader, hideLoader } = useLoader();

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    model: "",
    price: "",
    image: "",
    shortDescription: "",
    category: "", // 🔥 added
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) return setMessage("You must be logged in to add a product");

    showLoader();
    setMessage("");

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          ...formData,
          userId: session.user.id,
        }
      );

      setMessage(data.message || "Product added successfully!");

      setFormData({
        title: "",
        brand: "",
        model: "",
        price: "",
        image: "",
        shortDescription: "",
        category: "",
      });
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Server error. Try again later.");
    }

    hideLoader();
  };

  return (
    <div className="py-10 px-4 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-xl shadow">
        
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full p-3 border rounded"
          required
        />

        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="w-full p-3 border rounded"
          required
        />

        <input
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Model"
          className="w-full p-3 border rounded"
        />

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-3 border rounded"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-3 border rounded"
          required
        />

        {/* 🔥 Category Section Added */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="bicycle">Bicycle</option>
        </select>

        <textarea
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          placeholder="Short Description"
          rows={4}
          className="w-full p-3 border rounded"
        />

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
