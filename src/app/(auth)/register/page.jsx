"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { signIn, useSession, getSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useLoader } from "@/component/loaderProvider";

export default function RegisterPage() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    // Client-only: useSearchParams inside effect
    const searchParams = new URLSearchParams(window.location.search);

    const refreshSession = async () => {
      const freshSession = await getSession();
      if (freshSession) await update();
    };

    if (session) {
      refreshSession();

      if (searchParams.get("google") === "success") {
        toast.success("Logged in with Google successfully!");
      }

      router.replace("/", { scroll: false });
    }
  }, [session, router, update]);

  const handleGoogleSignIn = async () => {
    showLoader();
    try {
      await signIn("google", { callbackUrl: "/?google=success" });
    } catch (error) {
      toast.error("Google sign-in failed.");
    } finally {
      hideLoader();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    showLoader();

    if (!name || !email || !password) {
      toast.error("Please fill in all required fields.");
      setLoading(false);
      hideLoader();
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        { name, email, password, image },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(res.data.message || "Registration successful!");

      // Auto-login
      await signIn("credentials", { redirect: false, email, password });
      await update();
      router.replace("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Registration failed!");
      } else {
        toast.error("Network error! Could not connect to the API.");
      }
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 pt-20 px-4 transition-colors">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md w-full p-8 transition-colors">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6">
          Create Your Account
        </h2>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center py-3 border rounded-lg hover:shadow-md transition mb-5 bg-white dark:bg-gray-700"
        >
          <FcGoogle className="mr-2 text-2xl" />
          Sign up with Google
        </button>

        <div className="text-center text-gray-500 dark:text-gray-400 mb-5">or</div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Profile Image URL (optional)
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-semibold bg-linear-to-r from-green-500 to-emerald-500"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
