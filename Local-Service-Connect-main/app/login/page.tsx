"use client";
import { useState, useEffect } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://major-backend-f0nm.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      if (response.ok) {
        console.log("Login successful:", data.user);
        toast.success("Login successful");
        const { role, subscription, free_Count } = data.user;
        if (data.user.role === "admin") {
          router.push("/admin/dashboard");
        } else {
           setTimeout(() => {
             if (subscription.status === false && free_Count >= 3) {
               if (role === "customer") {
                 router.push("/plans/customer");
               } else if (role === "worker") {
                 router.push("/plans/worker");
               } else {
                 router.push("/");
               }
             } else {
               router.push("/");
             }
           }, 500); 
        }
        
      } else {
        setError(data.message || "Login failed");
        console.error("Login failed:", data.message);
        toast.error("Login failed");
      }
    } catch (err) {
      setError("Network error or server unavailable");
      console.error("Error during login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 p-4">
      <ToastContainer />
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl w-full max-w-4xl flex overflow-hidden">
        <div
          className="flex-1 hidden md:block bg-cover bg-center"
          style={{ backgroundImage: "url('/images/login-bg.jpg')" }}
        ></div>
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center text-indigo-900 mb-6">
              Login
            </h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-indigo-900 mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F8F6F4] text-[#333333] border-[#C4DFDF]"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-indigo-900 mb-1"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F8F6F4] text-[#333333] border-[#C4DFDF]"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl py-2.5 rounded-lg font-semibold"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-indigo-900">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-indigo-900 hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
            <div className="mt-4 text-center">
              <Link href="/" className="text-indigo-900 hover:text-[#C4DFDF]">
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
