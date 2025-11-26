"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Google redirect toast
  useEffect(() => {
    if (session) {
      if (searchParams.get("google") === "success") {
        toast.success("Logged in with Google successfully!");
        router.replace("/", { scroll: false });
      } else {
        router.push("/");
      }
    }
  }, [session, router, searchParams]);

  // Google login
  const handleGoogleSignIn = async () => {
    await signIn("google", {
      callbackUrl: "/?google=success",
    });
  };

  // REGISTER USER (Send data to backend using Axios)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Regsitering ")

    try {
      const res = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });

      toast.success("Registration successful!");
      router.push("/login");

    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(error.response.data.message || "Registration failed!");
      } else {
        toast.error("Network error!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create Your Account
        </h2>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center py-3 border rounded-lg hover:shadow-md transition mb-5"
        >
          <FcGoogle className="mr-2 text-2xl" />
          Sign up with Google
        </button>

        <div className="text-center text-gray-500 mb-5">or</div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold 
                       bg-gradient-to-r from-green-500 to-emerald-500 
                       hover:from-green-600 hover:to-emerald-600 
                       shadow-lg transition-all"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
