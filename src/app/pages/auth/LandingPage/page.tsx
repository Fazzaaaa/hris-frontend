"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"Package" | "Seat">("Package");
  const router = useRouter();

  const goToCheckout = () => router.push("/pages/checkout");

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
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-white px-8 py-4 flex items-center justify-between shadow">
        <div className="flex items-center space-x-2">
          <Image src="/image/logo1.png" alt="HRIS Logo" width={40} height={40} />
        </div>
      </nav>

      {/* Header */}
      <section id="header" className="bg-[#1F3F60] text-white py-16 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between container mx-auto">
        <div className="max-w-xl space-y-4 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold leading-snug">
            Transform your HR department, <br /> from manual to modern.
          </h1>
          <p className="text-lg">
            Say goodbye to spreadsheets and scattered tools. <br />
            HRIS automates key HR functions so your team can focus on people, not paperwork. <br />
            Reliable, customizable, and built for teams of all sizes.
          </p>
          <Link href="#pricing" className="text-[#2D8DFE] font-semibold hover:underline">
            Choose Your Plan →
          </Link>

        </div>
        <div className="mt-10 md:mt-0 w-full md:w-1/2">
          <Image
            src="/image/dashboard.png"
            alt="Dashboard Preview"
            width={500}
            height={300}
            className="w-full h-auto"
          />
        </div>
      </section>

{/* Features Grid */}
      <section className="bg-[#EAF6FB] py-16 px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-10 container mx-auto">
          {/* Feature 1 */}
          <div className="flex items-start space-x-4">
            <Image src="/image/statistics.png" alt="Statistics" width={32} height={32} />
            <div>
              <h3 className="font-semibold text-lg text-black mb-1">Monitor your HR in one view</h3>
              <p className="text-sm text-gray-700">
                With a smart dashboard, you can track attendance, overtime, and employee updates all in real time. Build your next HR workspace.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start space-x-4">
            <Image src="/image/folder.png" alt="Folder" width={32} height={32} />
            <div>
              <h3 className="font-semibold text-lg text-black mb-1">Manage employee data easily</h3>
              <p className="text-sm text-gray-700">
                Centralize employee records, job info, and documents with zero hassle. Build your next HR workspace.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start space-x-4">
            <Image src="/image/clock.png" alt="Clock" width={32} height={32} />
            <div>
              <h3 className="font-semibold text-lg text-black mb-1">Automate attendance tracking</h3>
              <p className="text-sm text-gray-700">
                With smart check-in, GPS location, and shift scheduling, clocking in has never been easier. Build your next HR workspace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Detail (Zigzag) */}
      <section id="features" className="py-20 px-6 md:px-12 bg-[#EAF3F9] space-y-24">
        {/* Feature 4 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 container mx-auto">
          <div className="w-full md:w-1/2">
            <Image
              src="/image/dashboard.png"
              alt="Dashboard"
              width={500}
              height={300}
              className="w-full h-auto rounded shadow-lg"
            />
          </div>
          <div className="max-w-md w-full md:w-1/2">
            <h3 className="text-black text-xl font-extrabold mb-5">
              Track your workforce, effortlessly.
            </h3>
            <p className="text-gray-700 mb-4">
              Get a clear view of employee data, attendance stats, and billing all in one powerful
              dashboard designed to help HR make faster, smarter decisions.
            </p>
            <Link href="#pricing" className="text-[#2D8DFE] font-semibold hover:underline">
              Choose Your Plan →
            </Link>

          </div>
        </div>

        {/* Feature 5 */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-12 container mx-auto">
          <div className="w-full md:w-1/2">
            <Image
              src="/image/database.png"
              alt="Employee Database"
              width={500}
              height={300}
              className="w-full h-auto rounded shadow-lg"
            />
          </div>
          <div className="max-w-md w-full md:w-1/2">
            <h3 className="text-black text-xl font-extrabold mb-5">
              All your employee records in one place.
            </h3>
            <p className="text-gray-700 mb-4">
              Store, manage, and update personal details, job information, and key documents with ease. Say goodbye to scattered spreadsheets.
            </p>
            <Link href="#pricing" className="text-[#2D8DFE] font-semibold hover:underline">
              Choose Your Plan →
            </Link>

          </div>
        </div>

        {/* Feature 6 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 container mx-auto">
          <div className="w-full md:w-1/2">
            <Image
              src="/image/checkclock.png"
              alt="Checkclock"
              width={500}
              height={300}
              className="w-full h-auto rounded shadow-lg"
            />
          </div>
          <div className="max-w-md w-full md:w-1/2">
            <h3 className="text-black text-xl font-extrabold mb-5">
              Track attendance with precision.
            </h3>
            <p className="text-gray-700 mb-4">
              Let your team clock in and out from anywhere with location-based access, custom schedules, and automated reports to reduce manual errors.
            </p>
            <Link href="#pricing" className="text-[#2D8DFE] font-semibold hover:underline">
              Choose Your Plan →
            </Link>

          </div>
        </div>
      </section>

      {/* Pricing Section with Tabs */}
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
                  <button onClick={goToCheckout} className="w-full bg-[#1F3F60] text-white py-2 rounded hover:bg-[#2D8DFE]">
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
                    Rp {typeof seat.price === "number" ? seat.price.toLocaleString("id-ID") : seat.price}{" "}
                    <span className="text-sm font-normal text-gray-500">/user/month</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">{seat.description}</p>
                  <button onClick={goToCheckout} className="mt-4 w-full bg-[#1F3F60] text-white py-2 rounded hover:bg-[#2D8DFE]">
                    Upgrade Package →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-[#1F3F60] text-white py-12 px-6 md:px-12 text-sm">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
    
    {/* Company Info */}
    <div>
      <h3 className="text-lg font-bold mb-2">About HRIS</h3>
      <p className="mb-4">HRIS by CMLABS</p>
      <p className="mb-4">"A smart HR platform to manage your workforce with ease from attendance to payroll."</p>
      <p className="mb-1"><strong>Email:</strong> marketing@cmlabs.co</p>
      <p className="mb-1"><strong>Phone:</strong> +62 21 6660 4470</p>
      <p><strong>Address:</strong> Jl. Seruni No.9, Lowokwaru, Kec. Lowokwaru, Kota Malang, Jawa Timur 65141</p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-bold mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li>
          <a href="#header" className="hover:underline">About Us</a>
        </li>
        <li>
          <a href="#features" className="hover:underline">Features</a>
        </li>
        <li>
          <a href="#pricing" className="hover:underline">Pricing</a>
        </li>
        <li>
          <a href="mailto:marketing@cmlabs.co" className="hover:underline">Contact</a>
        </li>
      </ul>
    </div>

    {/* Social Media */}
    <div>
      <h3 className="text-lg font-bold mb-4">Social Media</h3>
      <ul className="space-y-2">
        <li>
          <a href="https://id.linkedin.com/company/cmlabs" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
        </li>
        <li>
          <a href="https://www.instagram.com/cmlabsco/" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
        </li>
        <li>
          <a href="https://x.com/cmlabsco" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter (X)</a>
        </li>
      </ul>
    </div>
  </div>

  {/* Bottom Text */}
  <div className="mt-10 text-center text-xs text-gray-300">
    &copy; 2025 CMLABS Indonesia Digital. All rights reserved.
  </div>
</footer>

    </div>
  );
}
