"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function AddProduct() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    price: "",
    image: "",
   shortDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) return setMessage("You must be logged in to add a product");

    setLoading(true);
    setMessage("");

    try {
      const { data } = await axios.post("http://localhost:5000/products", {
        ...formData,
        userId: session.user.id,
      });

      setMessage(data.message || "Product added successfully!");

      // Reset form
      setFormData({
        name: "",
        brand: "",
        model: "",
        price: "",
        image: "",
        shortDescription: "",
      });

    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="py-10 px-4 max-w-xl  mx-auto">
      <h1 className="text-3xl font-bold text-center mt-10 mb-8">Add New Product</h1>

      {message && (
        <p className="text-center mb-4 text-red-500">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
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
        />

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
          disabled={loading}
          className="w-full py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
