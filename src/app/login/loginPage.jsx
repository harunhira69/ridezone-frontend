"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (session) router.replace(redirectTo);
  }, [session, redirectTo, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: redirectTo,
    });

    if (!result?.error) {
      alert("Login successful!");
      router.replace(result.url || redirectTo);
    } else {
      alert("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    const result = await signIn("google", {
      redirect: false,
      callbackUrl: redirectTo,
    });

    if (!result?.error) {
      toast.success("Logged in with Google!");
      router.replace(result.url || redirectTo);
    } else {
      toast.error("Google sign-in failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">

        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900 dark:text-white tracking-tight">
          Login to <span className="text-blue-500">RideZone</span>
        </h2>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center py-3 border border-gray-300 dark:border-gray-600 
          rounded-lg hover:shadow-md transition bg-gray-50 dark:bg-gray-700 dark:text-white"
        >
          <FcGoogle className="mr-2 text-2xl" />
          Sign in with Google
        </button>

        <div className="text-center text-gray-500 dark:text-gray-400 my-5">or</div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
              rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
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
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
              rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold 
            bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
            shadow-lg transition-all"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}
