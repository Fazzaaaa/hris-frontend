"use client";

import Image from "next/image";

export default function ContohDashboard() {
  return (
    <div className="flex min-h-screen bg-[#7CA5BF] items-center justify-center">
      {/* Logo */}
      <Image src="/image/logo1.png" alt="Logo" width={400} height={400} />
    </div>
  );
}
