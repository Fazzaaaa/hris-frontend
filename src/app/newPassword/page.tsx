"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Menggunakan useRouter untuk navigasi
import Image from "next/image";
import Link from "next/link";

export default function NewPassword() {
  const [email, setEmail] = useState(""); // State untuk menyimpan email
  const router = useRouter(); // Menggunakan router untuk navigasi

  const handleResetPassword = () => {
    if (email) {
      router.push("/checkEmail"); // Mengarahkan ke halaman checkEmail saat email terisi
    } else {
      alert("Please enter a valid email address!"); // Pemberitahuan jika email belum diisi
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
              onChange={(e) => setEmail(e.target.value)} // Mengupdate state email saat diketik
            />
          </div>

          <button
            onClick={handleResetPassword} // Menangani klik tombol Reset Password
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
