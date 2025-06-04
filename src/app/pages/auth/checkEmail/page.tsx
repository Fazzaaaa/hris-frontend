"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function CheckEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleResendEmail = () => {
    alert("Resending email...");
  };

  const handleOpenGmail = () => {
    router.push("/pages/auth/newPassword");
  };

  return (
    <div className="flex min-h-screen">
      {/* Kiri (Putih - Form) */}
      <div className="w-1/2 bg-white px-16 py-8 flex flex-col items-center justify-center text-center">
        <div className="max-w-lg w-full">
          {/* Gambar check_email */}
          <div className="mb-6 flex justify-center items-center">
            <Image
              src="/image/check_email.png"
              alt="Check Email"
              width={96}
              height={96}
            />
          </div>

          <h1 className="text-2xl font-bold text-black mb-4">Check your Email</h1>

          <p className="text-sm text-black mb-6 leading-relaxed">
            We sent a password reset link to your email{" "}
            <strong>{email || "your email"}</strong> which is valid for 24 hours after receiving the email. Please check your inbox!
          </p>

          <button
            onClick={handleOpenGmail}
            className="w-full bg-gray-600 text-white p-2 rounded mb-6"
          >
            Open Gmail
          </button>

          <p className="text-sm mb-4 text-black">
            Don't receive the email?{" "}
            <span
              onClick={handleResendEmail}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Click here to resend!
            </span>
          </p>

          <Link
            href="/pages/auth/signin"
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
