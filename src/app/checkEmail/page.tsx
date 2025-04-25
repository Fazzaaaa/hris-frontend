"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function CheckEmail() {
  const router = useRouter(); // Menggunakan router untuk navigasi

  const handleResendEmail = () => {
    alert("Resending email..."); // Fungsi untuk mengirim ulang email, bisa disesuaikan dengan implementasi backend
  };

  return (
    <div className="flex min-h-screen">
      {/* Kiri (Putih - Form) */}
      <div className="w-1/2 bg-white px-16 py-8 flex flex-col items-center justify-center text-center">
        <div className="max-w-lg w-full">
          {/* Profile Picture (Oval) */}
          <div className="mb-6 w-24 h-24 bg-gray-400 rounded-full mx-auto"></div>

          {/* "Check your Email" Text */}
          <h1 className="text-2xl font-bold text-black mb-4">Check your Email</h1>

          {/* Email Information */}
          <p className="text-sm text-black mb-6 leading-relaxed">
            We sent a password reset link to your email <strong>uremail@gmail.com</strong> which is valid for 24 hours after receiving the email. Please check your inbox!
          </p>

          {/* "Open Gmail" Button */}
          <button className="w-full bg-gray-600 text-white p-2 rounded mb-6">
            Open Gmail
          </button>

          {/* Resend Email Link */}
          <p className="text-sm mb-4 text-black">
            Don't receive the email?{" "}
            <span
              onClick={handleResendEmail}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Click here to resend!
            </span>
          </p>

          {/* Back to Login Button */}
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
