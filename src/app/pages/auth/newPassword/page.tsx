"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SetNewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSetPassword = () => {
    if (!password || !confirmPassword) {
      alert("Please fill in both fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    router.push("/pages/auth/successReset");
  };

  return (
    <div className="flex min-h-screen">
      {/* Kiri (Form) */}
      <div className="w-1/2 bg-white px-16 py-8 flex flex-col items-center justify-center text-center">
        <div className="max-w-lg w-full">
          <h1 className="text-2xl font-bold text-black mb-4">Set New Password</h1>
          <p className="text-sm text-black mb-6 leading-relaxed">
            Enter your new password below to complete the reset process. <br />Ensure it's strong and secure.
          </p>

          <div className="mb-4 text-left">
            <label htmlFor="password" className="block text-sm text-black mb-2">
              New Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6 text-left">
            <label htmlFor="confirmPassword" className="block text-sm text-black mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleSetPassword}
            className="w-full bg-gray-600 text-white p-2 rounded mb-6"
          >
            Reset password
          </button>

          <Link
            href="/pages/auth/signin"
            className="flex items-center justify-center text-sm text-blue-600 hover:underline"
          >
            <span className="mr-2">&#8592;</span> Back to log in
          </Link>
        </div>
      </div>

      {/* Kanan (Gambar) */}
      <div className="w-1/2 bg-[#7CA5BF] flex items-center justify-center">
        <Image src="/image/logo1.png" alt="Logo" width={400} height={400} />
      </div>
    </div>
  );
}
