"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SuccessReset() {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push("/pages/auth/signin");
  };

  return (
    <div className="flex min-h-screen">
      {/* Kiri (Putih - Konten) */}
      <div className="w-1/2 bg-white px-16 py-8 flex flex-col items-center justify-center text-center">
        <div className="max-w-lg w-full">
          {/* Ganti ikon centang dengan gambar success_reset */}
          <div className="mb-6 flex justify-center items-center">
            <Image
              src="/image/success_reset.png"
              alt="Success"
              width={96}
              height={96}
            />
          </div>

          {/* Judul */}
          <h1 className="text-2xl font-bold text-black mb-4">
            Your password has been successfully reset
          </h1>

          {/* Informasi */}
          <p className="text-sm text-black mb-6 leading-relaxed">
            You can log in with your new password. If you encounter any issues, <br />please contact support!
          </p>

          {/* Tombol Go to Login */}
          <button
            onClick={handleGoToLogin}
            className="w-full bg-gray-600 text-white p-2 rounded mb-6"
          >
            Login Now
          </button>

          {/* Back to log in via Link juga jika mau */}
          <Link
            href="/pages/auth/signin"
            className="flex items-center justify-center text-sm text-blue-600 hover:underline"
          >
            <span className="mr-2">&#8592;</span> Back to log in
          </Link>
        </div>
      </div>

      {/* Kanan (Logo) */}
      <div className="w-1/2 bg-[#7CA5BF] flex items-center justify-center">
        <Image src="/image/logo1.png" alt="Logo" width={400} height={400} />
      </div>
    </div>
  );
}
