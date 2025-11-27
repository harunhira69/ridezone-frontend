"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Edit, Trash2, Save, X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from "next/link";

export default function ManageProducts() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});


  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      setProducts(data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") fetchProducts();
  }, [status]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  const handleChange = (e) => setEditData({ ...editData, [e.target.name]: e.target.value });

  const startEdit = (product) => {
    setEditingId(product._id);
    setEditData({
      title: product.title,
      brand: product.brand,
      model: product.model || "",
      price: product.price,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const updateProduct = async (id) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, editData);
      setMessage("Product updated successfully!");
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage("Failed to update product.");
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
      setMessage("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete product.");
    }
  };

  // Render Login Prompt if not authenticated
  if (status === "loading") {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900 dark:text-white">
            Login Required
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            You need to login to manage products
          </p>

          {/* Google Sign In */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/manageProducts" })}
            className="w-full flex items-center justify-center py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:shadow-md transition bg-gray-50 dark:bg-gray-700 dark:text-white mb-4"
          >
            <FcGoogle className="mr-2 text-2xl" /> Sign in with Google
          </button>

          <div className="text-center text-gray-500 dark:text-gray-400 my-4">or</div>

          {/* Email Sign In */}
          <Link href="/login?callbackUrl=/manageProducts">
            <button className="w-full py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg transition-all mb-4">
              Sign in with Email
            </button>
          </Link>

          <p className="text-center text-gray-700 dark:text-gray-300">
            Dont have an account?{" "}
            <Link
              href="/register?callbackUrl=/manageProducts"
              className="text-green-500 hover:underline dark:text-green-400 font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mt-10 mb-6 text-center text-gray-900 dark:text-gray-100">
        Manage Products
      </h2>

      {message && (
        <p className="text-center mb-4 px-4 py-2 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 rounded transition">
          {message}
        </p>
      )}

      {loading ? (
        <p className="text-center py-20 text-gray-600 dark:text-gray-300">Loading products...</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="overflow-x-auto hidden sm:block">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Price
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-4">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.title || "Product"}
                          width={60}
                          height={60}
                          className="rounded object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center text-xs text-gray-600 dark:text-gray-200">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === product._id ? (
                        <input
                          name="title"
                          value={editData.title || ""}
                          onChange={handleChange}
                          className="border p-1 rounded w-full dark:bg-gray-700 dark:text-gray-100"
                        />
                      ) : (
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {product.title}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === product._id ? (
                        <input
                          name="brand"
                          value={editData.brand || ""}
                          onChange={handleChange}
                          className="border p-1 rounded w-full dark:bg-gray-700 dark:text-gray-100"
                        />
                      ) : (
                        <span className="text-gray-700 dark:text-gray-200">{product.brand}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === product._id ? (
                        <input
                          type="number"
                          name="price"
                          value={editData.price || ""}
                          onChange={handleChange}
                          className="border p-1 rounded w-full dark:bg-gray-700 dark:text-gray-100"
                        />
                      ) : (
                        <span className="text-gray-700 dark:text-gray-200">${product.price}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      {editingId === product._id ? (
                        <>
                          <button
                            onClick={() => updateProduct(product._id)}
                            className="text-green-600 hover:text-green-800 flex items-center gap-1"
                          >
                            <Save size={16} /> Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-gray-600 hover:text-gray-800 flex items-center gap-1"
                          >
                            <X size={16} /> Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(product)}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <Edit size={16} /> Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="text-red-600 hover:text-red-800 flex items-center gap-1"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 sm:hidden gap-6 mt-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4 transition"
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title || "Product"}
                    width={100}
                    height={100}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-300 dark:bg-gray-600 rounded mb-4 flex items-center justify-center text-gray-600 dark:text-gray-200">
                    No Image
                  </div>
                )}
                {editingId === product._id ? (
                  <div className="space-y-2">
                    <input
                      name="title"
                      value={editData.title || ""}
                      onChange={handleChange}
                      className="border p-1 rounded w-full dark:bg-gray-700 dark:text-gray-100"
                    />
                    <input
                      name="brand"
                      value={editData.brand || ""}
                      onChange={handleChange}
                      className="border p-1 rounded w-full dark:bg-gray-700 dark:text-gray-100"
                    />
                    <input
                      type="number"
                      name="price"
                      value={editData.price || ""}
                      onChange={handleChange}
                      className="border p-1 rounded w-full dark:bg-gray-700 dark:text-gray-100"
                    />
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={() => updateProduct(product._id)}
                        className="text-green-600 flex items-center gap-1"
                      >
                        <Save size={16} /> Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-600 flex items-center gap-1"
                      >
                        <X size={16} /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">
                      {product.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200">Brand: {product.brand}</p>
                    <p className="text-gray-700 dark:text-gray-200">Price: ${product.price}</p>
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={() => startEdit(product)}
                        className="text-blue-600 flex items-center gap-1"
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="text-red-600 flex items-center gap-1"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
