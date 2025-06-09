"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<"Package" | "Seat">("Package");
  const router = useRouter();

  const goToCheckout = () => router.push("/pricing/checkout");

  const tabButton = (tab: "Package" | "Seat") =>
    `px-4 py-2 text-sm font-medium transition-all ${
      activeTab === tab
        ? "bg-gray-800 text-white"
        : "bg-gray-300 text-black hover:bg-gray-400"
    }`;

  const packageData = [
    {
      title: "Basic",
      description: "Perfect for small teams",
      features: [
        "Feature list",
        "GPS-based attendance validation",
        "Employee data management",
        "Leave & time-off request",
        "Overtime management \n(government regulation)",
        "Fixed work schedule management",
        "Automatic tax calculation",
      ],
    },
    {
      title: "Premium",
      description: "Best for growing businesses",
      features: [
        "All Standard features",
        "Click-in & Clock-out attendance settings",
        "Fingerprint integration",
        "Employee document management",
        "Sick leave & time-off settings",
        "Shift management",
        "Comprehensive reports",
        "Overtime management \n(goverment & custom regulations)",
      ],
    },
    {
      title: "Ultra",
      description: "For advanced HR operations",
      features: [
        "All Premium features",
        "Face Recognition",
        "Automated check-out attendance",
        "Employee turnover dashboard",
        "Custom dashboard for statistic & analytics",
      ],
    },
  ];

  const seatData = [
    {
      name: "STANDARD",
      price: 15000,
      description: "For teams with 1–50 employees",
    },
    {
      name: "STANDARD PLUS",
      price: 20000,
      description: "For teams with 51–75 employees",
    },
    {
      name: "PREMIUM",
      price: 25000,
      description: "For teams with 76–100 employees",
    },
    {
      name: "PREMIUM PLUS",
      price: 30000,
      description: "For teams with 101–150 employees",
    },
    {
      name: "ULTRA",
      price: 40000,
      description: "For teams with 151–200 employees",
    },
    {
      name: "ULTRA ENTERPRISE",
      price: 50000,
      description: "For enterprises above 200 employees",
    },
  ];

  return (
    <section id="pricing" className="py-16 px-6 md:px-12 bg-[#D7E3EB] text-center">
      <div className="container mx-auto">
        <h1 className="text-black text-5xl font-extrabold mb-4">HRIS Pricing Plans</h1>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Choose the plan that suits your business! This HRIS offers
          <br />both subscription and pay-as-you-go payment options,
          <br />available in following packages.
        </p>

        {/* Tabs */}
        <div className="inline-flex mb-10">
          <button onClick={() => setActiveTab("Package")} className={`${tabButton("Package")} rounded-l-lg`}>
            Package
          </button>
          <button onClick={() => setActiveTab("Seat")} className={`${tabButton("Seat")} rounded-r-lg`}>
            Seat
          </button>
        </div>

        {/* Package Cards */}
        {activeTab === "Package" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packageData.map((pkg, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition-all text-left">
                <h3 className="text-xl font-bold text-gray-700 mb-2">{pkg.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{pkg.description}</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  {pkg.features.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
                <button
                  onClick={goToCheckout}
                  className="w-full bg-[#1F3F60] text-white py-2 rounded hover:bg-[#2D8DFE]"
                >
                  Select Package →
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Seat Cards */}
        {activeTab === "Seat" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {seatData.map((seat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition-all text-left">
                <h3 className="text-lg font-semibold text-gray-700">{seat.name}</h3>
                <p className="text-xl font-bold text-gray-800 mt-2">
                  Rp {seat.price.toLocaleString("id-ID")}{" "}
                  <span className="text-sm font-normal text-gray-500">/user/month</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">{seat.description}</p>
                <button
                  onClick={goToCheckout}
                  className="mt-4 w-full bg-[#1F3F60] text-white py-2 rounded hover:bg-[#2D8DFE]"
                >
                  Upgrade Package →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
