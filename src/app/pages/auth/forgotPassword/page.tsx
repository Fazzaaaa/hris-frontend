"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState(""); 
  const router = useRouter(); 

  const handleResetPassword = () => {
    if (email) {
      router.push("/checkEmail"); 
    } else {
      alert("Please enter a valid email address!"); 
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Kiri (Putih - Form) */}
      <div className="w-1/2 bg-white px-16 py-8 flex flex-col items-center justify-center text-center">
        <div className="max-w-lg w-full">
          <h1 className="text-2xl font-bold text-black mb-4">Forgot Password</h1>
          <p className="text-sm text-black mb-6 leading-relaxed">
            No worries! Enter your email address below, and we’ll <br /> send you a link to reset your password.
          </p>

          <div className="mb-4 text-left">
            <label htmlFor="email" className="block text-sm text-black mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <button
            onClick={handleResetPassword} 
            className="w-full bg-gray-500 text-white p-2 rounded mb-6"
          >
            Reset Password
          </button>

          <Link
            href="/signin"
            className="flex items-center justify-center text-sm text-blue-600 hover:underline"
          >
            <span className="mr-2">&#8592;</span> Back to log in
          </Link>
        </div>
      </div>

      {/* Kanan (Biru - Logo) */}
      <div className="w-1/2 bg-[#7CA5BF] flex items-center justify-center">
        <Image src="/image/logo1.png" alt="Logo" width={400} height={400} />
      </div>
    </div>
  );
}
