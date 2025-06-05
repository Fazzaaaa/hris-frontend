"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";

// Types
type PackageType = {
  title: string;
  description: string;
  features: string[];
};

type SeatType = {
  name: string;
  price: number | string;
  description: string;
};

// Dummy Data
const packageData: PackageType[] = [
  {
    title: "Nama Paket",
    description: "Best for growing business",
    features: [
      "Feature list",
      "GPS-based attendance validation",
      "Employee data management",
      "Leave & time-off request",
      "Overtime management (government regulation)",
      "Fixed work schedule management",
      "Automatic tax calculation",
    ],
  },
  {
    title: "Premium",
    description: "Best for growing business",
    features: [
      "All Standard features ✔",
      "Click-in & Clock-out attendance settings ✔",
      "Fingerprint integration ✔",
      "Employee document management ✔",
      "Sick leave & time-off settings ✔",
      "Shift management ✔",
      "Comprehensive reports ✔",
      "Overtime management (gov & custom rules) ✔",
    ],
  },
  {
    title: "Ultra",
    description: "Best for growing business",
    features: [
      "All Premium features",
      "Face Recognition",
      "Automated check-out attendance",
      "Employee turnover dashboard",
      "Custom dashboard for statistics & analysis",
    ],
  },
];

const seatData: SeatType[] = [
  {
    name: "STANDARD",
    price: 15000,
    description: "This package for 1 until 50 employee",
  },
  {
    name: "PREMIUM",
    price: 15000,
    description: "This package for 1 until 50 employee",
  },
  {
    name: "ULTRA",
    price: 15000,
    description: "This package for 1 until 50 employee",
  },
  {
    name: "Nama Paket",
    price: "Harga",
    description: "Deskripsi jumlah karyawan yang bisa menggunakan",
  },
  {
    name: "Nama Paket",
    price: "Harga",
    description: "Deskripsi jumlah karyawan yang bisa menggunakan",
  },
  {
    name: "Nama Paket",
    price: "Harga",
    description: "Deskripsi jumlah karyawan yang bisa menggunakan",
  },
];

// Components
const PackageCard = ({ title, description, features, onSelect }: PackageType & { onSelect: () => void }) => (
  <div
    className="bg-gray-100 rounded-2xl p-6 shadow text-left transition-all transform hover:scale-105 hover:bg-gray-300 hover:shadow-xl border border-gray-300 group"
    data-testid={`package-card-${title}`}
  >
    <div className="relative">
      <h2 className="text-xl font-semibold text-gray-400 group-hover:text-white group-hover:bg-gray-800 group-hover:rounded-md transition-all px-3 py-1 inline-block">
        {title}
      </h2>
    </div>
    <p className="text-sm text-gray-500 mb-3">{description}</p>
    <ul className="text-sm text-gray-600 space-y-2">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
    <button
      onClick={onSelect}
      className="mt-4 w-full bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500"
    >
      Select Package →
    </button>
  </div>
);

const SeatCard = ({ name, price, description, onSelect }: SeatType & { onSelect: () => void }) => (
  <div
    className="bg-gray-100 rounded-xl p-6 shadow text-left flex flex-col justify-between"
    data-testid={`seat-card-${name}`}
  >
    <h2 className="text-base font-semibold text-gray-400">{name}</h2>
    <p className="text-2xl font-bold text-gray-400 mt-2">
      Rp {typeof price === "number" ? price.toLocaleString("id-ID") : price}
      <span className="text-sm font-normal text-gray-400"> /user/month</span>
    </p>
    <p className="text-sm mt-2 text-gray-500">{description}</p>
    <button
      onClick={onSelect}
      className="mt-4 w-full bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500"
    >
      Upgrade Package →
    </button>
  </div>
);

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<"Package" | "Seat">("Package");
  const router = useRouter();

  const goToCheckout = () => router.push("/pricing/checkout");

  const tabButton = (tab: "Package" | "Seat") =>
    `px-4 py-2 text-sm font-medium transition-all ${
      activeTab === tab
        ? "bg-gray-800 text-white"
        : "bg-gray-300 text-black hover:bg-gray-400"
    }`;

  return (
    <div className="min-h-screen text-center px-4 py-10" style={{ backgroundColor: "#7CA5BF" }}>
      <button
        onClick={() => router.push("/admin/dashboard")}
        className="absolute top-4 right-4 text-black hover:text-white bg-gray-200 hover:bg-gray-600 p-1 rounded-full transition"
        aria-label="Close"
      >
        <MdClose size={24} />
      </button>
      <h1 className="text-5xl font-bold text-black mb-4">HRIS Pricing Plans</h1>
      <p className="mt-2 text-m text-gray-100 max-w-md mx-auto mb-4">
        Choose the plan that suits your business! This HRIS offers both
        subscription and pay-as-you-go payment options, available in the
        following packages.
      </p>

      <div className="mt-4 inline-flex">
        <button
          onClick={() => setActiveTab("Package")}
          className={`${tabButton("Package")} rounded-l-lg`}
        >
          Package
        </button>
        <button
          onClick={() => setActiveTab("Seat")}
          className={`${tabButton("Seat")} rounded-r-lg`}
        >
          Seat
        </button>
      </div>

      {activeTab === "Package" && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {packageData.map((pkg, index) => (
            <PackageCard
              key={index}
              title={pkg.title}
              description={pkg.description}
              features={pkg.features}
              onSelect={goToCheckout}
            />
          ))}
        </div>
      )}

      {activeTab === "Seat" && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {seatData.map((pkg, index) => (
            <SeatCard
              key={index}
              name={pkg.name}
              price={pkg.price}
              description={pkg.description}
              onSelect={goToCheckout}
            />
          ))}
        </div>
      )}
    </div>
  );
}
