"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid Credentials");
        return;
      }

      toast.success("Login successful!");

      setTimeout(() => {
        router.push("/");
      }, 800);
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Welcome Back 👋
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="●●●●●●●"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 dark:text-gray-300 mt-5">
          Don’t have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
