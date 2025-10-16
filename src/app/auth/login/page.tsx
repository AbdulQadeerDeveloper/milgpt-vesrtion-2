"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/milgpt");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b0b0b] via-[#101010] to-[#1a1a1a] text-white relative overflow-hidden">
      {/* Glowing Background Orbs */}
      <div className="absolute w-72 h-72 bg-[#6B946A]/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-[#DCD194]/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-[#111]/80 backdrop-blur-xl border border-[#333] rounded-2xl p-8 shadow-[0_0_30px_rgba(107,148,106,0.3)]">
        <h1 className="text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-[#6B946A] to-[#DCD194] bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Sign in to continue your journey with{" "}
          <span className="text-[#DCD194]">MilGPT</span>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:ring-2 focus:ring-[#6B946A] outline-none text-white placeholder-gray-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:ring-2 focus:ring-[#6B946A] outline-none text-white placeholder-gray-500 transition"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#6B946A] to-[#DCD194] text-black font-semibold shadow-md hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-[#DCD194] hover:underline transition"
          >
            Register
          </Link>
        </p>

        <Link
          href="/"
          className="block mt-6 text-center text-sm text-gray-500 hover:text-[#DCD194] transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
