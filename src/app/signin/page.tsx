"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation"; // Hook for navigation

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const router = useRouter(); // Hook for navigating to another page

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {
    if (!email || !password) {
      setFormError("Please fill in both fields.");
      return;
    }

    // Reset error and navigate if form is valid
    setFormError("");
    router.push("/contohDashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Kiri */}
      <div className="w-1/2 bg-[#7CA5BF] flex items-center justify-center">
        <Image src="/image/logo1.png" alt="Logo" width={500} height={500} />
      </div>

      {/* Kanan */}
      <div className="w-1/2 bg-white p-8">
        <div className="flex justify-between items-center mb-8">
          <Image src="/image/logo1.png" alt="Logo" width={120} height={40} />
          <Link
            href="/signup"
            className="text-sm underline underline-offset-2 text-blue-600 hover:text-blue-800"
          >
            Try for free!
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-black">Sign In</h1>
        <p className="text-sm mb-6 text-black">
          Welcome back to HRIS cmlabs! Manage everything with ease.
        </p>

        {/* Error Message */}
        {formError && <div className="text-red-600 mb-4">{formError}</div>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-black">
            Email or Phone Number
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border border-gray-300 rounded mt-2 text-black"
            placeholder="Enter your email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm text-black">
            Password
          </label>
          <div className="relative mt-2">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full p-2 pr-10 border border-gray-300 rounded text-black"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-black"
            >
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 mt-2">
          <label htmlFor="rememberMe" className="flex items-center text-sm text-black cursor-pointer">
            <input
              id="rememberMe"
              type="checkbox"
              className="appearance-none h-4 w-4 rounded-full border-2 border-gray-400 checked:bg-blue-500 checked:border-blue-500 transition-all duration-200 mr-2"
            />
            Remember me
          </label>
          <Link href="/forgotPassword" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          onClick={handleSignIn}
          className="w-full bg-gray-500 text-white p-2 rounded mb-4"
          disabled={!email || !password} // Disable if any field is empty
        >
          SIGN IN
        </button>

        <div className="space-y-4 mt-4">
          <div className="border border-black rounded p-2 text-center cursor-pointer hover:bg-gray-100 transition text-black">
            Sign in with Google
          </div>

          <Link
            href="/signinEmployee"
            className="block border border-black rounded p-2 text-center cursor-pointer hover:bg-gray-100 transition text-black"
          >
            Sign in with ID Employee
          </Link>
        </div>

        <div className="text-center mt-6">
          <span className="text-black">Don't have an account? </span>
          <Link href="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up now and get started
          </Link>
        </div>
      </div>
    </div>
  );
}
