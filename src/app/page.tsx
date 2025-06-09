"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa"; // Import icons

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"Package" | "Seat">("Package");
  const router = useRouter();

  const goToCheckout = () => router.push("/pages/checkout");

  const tabButton = (tab: "Package" | "Seat") =>
    `px-5 py-2 text-base font-semibold rounded-lg transition-all duration-300 ${
      activeTab === tab
        ? "bg-gray-800 text-white shadow-lg"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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

  // --- Framer Motion Variants ---
  const fadeInSlideUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemChildVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardListVariants = {
    hidden: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };
  const cardItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Variants untuk logo section
  const logoSectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.2, // Stagger untuk setiap logo
      },
    },
  };

  const logoItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Variant for footer content
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const footerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white px-8 py-4 flex items-center justify-between shadow-md relative z-10"
      >
        <div className="flex items-center space-x-2">
          <Image
            src="/images/logo-hris-1.png"
            alt="HRIS Logo"
            width={100}
            height={100}
          />
        </div>
        <div>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 20px rgba(45, 141, 254, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#2D8DFE] text-white py-2 px-7 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 font-semibold"
            onClick={() => router.push("/auth/register")}
          >
            Free Trial
          </motion.button>
        </div>
      </motion.nav>

      {/* Header (Hero Section) */}
      <section
        id="header"
        className="bg-gradient-to-br from-[#1F3F60] to-[#2D8DFE] text-white py-20 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between container mx-auto rounded-xl shadow-2xl overflow-hidden mt-8"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInSlideUpVariants}
          className="max-w-xl space-y-6 text-center md:text-left mb-10 md:mb-0"
        >
          <motion.h1
            variants={itemChildVariants}
            className="text-4xl md:text-5xl font-extrabold leading-tight"
          >
            Transform your HR department, <br /> from manual to modern.
          </motion.h1>
          <motion.p
            variants={itemChildVariants}
            className="text-lg md:text-xl text-gray-200"
          >
            Say goodbye to spreadsheets and scattered tools. <br />
            HRIS automates key HR functions so your team can focus on people,
            not paperwork. <br />
            Reliable, customizable, and built for teams of all sizes.
          </motion.p>
          <motion.div variants={itemChildVariants}>
            <Link
              href="#pricing"
              className="inline-block bg-white text-[#2D8DFE] font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Choose Your Plan →
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="mt-10 md:mt-0 w-full md:w-1/2 flex justify-center items-center"
        >
          <Image
            src="/image/ilustration.png"
            alt="Dashboard Preview"
            width={1000}
            height={1000}
            className="w-full h-auto max-w-lg  "
          />
        </motion.div>
      </section>

      {/* Section "Collaborate With" */}
      <section className="bg-white py-16 px-6 md:px-12 text-center">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-extrabold text-gray-800 mb-10"
          >
            Collaborate With
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={logoSectionVariants}
            className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8" // Atur jarak antar logo
          >
            {/* Logo CMLABS */}
            <motion.div
              variants={logoItemVariants}
              whileHover={{ scale: 1.1 }} // Sedikit membesar saat hover
              className="relative w-48 h-24 flex items-center justify-center p-2" // Ukuran dan padding untuk kontainer logo
            >
              <Image
                src="/images/cmlabs.jpg" // Asumsi ini adalah logo berwarna
                alt="CMLABS Logo"
                width={200} // Sesuaikan ukuran
                height={90} // Sesuaikan ukuran
                className="logo-grayscale-hover object-contain" // Terapkan kelas CSS untuk grayscale
              />
            </motion.div>

            {/* Logo Polinema */}
            <motion.div
              variants={logoItemVariants}
              whileHover={{ scale: 1.1 }}
              className="relative w-48 h-24 flex items-center justify-center p-2"
            >
              <Image
                src="/images/polinema_logo.png" // Asumsi ini adalah logo berwarna
                alt="Polinema Logo"
                width={100} // Sesuaikan ukuran
                height={60} // Sesuaikan ukuran
                className="logo-grayscale-hover object-contain" // Terapkan kelas CSS untuk grayscale
              />
            </motion.div>

            {/* Anda bisa menambahkan logo lain di sini */}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-[#F8FAFC] py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-extrabold text-center text-gray-800 mb-12"
          >
            Streamline Your HR Operations
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInSlideUpVariants}
            className="grid md:grid-cols-3 gap-10"
          >
            {[
              {
                icon: "/image/statistics.png",
                title: "Monitor Your HR in One View",
                description:
                  "With a smart dashboard, you can track attendance, overtime, and employee updates all in real time. Build your next HR workspace.",
              },
              {
                icon: "/image/folder.png",
                title: "Manage Employee Data Easily",
                description:
                  "Centralize employee records, job info, and documents with zero hassle. Build your next HR workspace.",
              },
              {
                icon: "/image/clock.png",
                title: "Automate Attendance Tracking",
                description:
                  "With smart check-in, GPS location, and shift scheduling, clocking in has never been easier. Build your next HR workspace.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemChildVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                }}
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg transition-all duration-300"
              >
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={64}
                  height={64}
                  className="mb-4"
                />
                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Detail (Zigzag) */}
      <section
        id="features"
        className="py-20 px-6 md:px-12 bg-[#EAF3F9] space-y-24"
      >
        {/* Fitur 1 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInSlideUpVariants}
          className="flex flex-col md:flex-row items-center justify-between gap-16 container mx-auto"
        >
          <motion.div
            variants={slideInLeftVariants}
            className="w-full md:w-1/2"
          >
            <Image
              src="/image/dashboard.png"
              alt="Dashboard"
              width={700}
              height={500}
              className="w-full h-auto rounded-2xl shadow-xl border border-gray-200"
            />
          </motion.div>
          <motion.div
            variants={slideInRightVariants}
            className="max-w-md w-full md:w-1/2 space-y-4"
          >
            <h3 className="text-gray-800 text-3xl font-extrabold leading-tight">
              Track your workforce, effortlessly.
            </h3>
            <p className="text-lg text-gray-700">
              Get a clear view of employee data, attendance stats, and billing
              all in one powerful dashboard designed to help HR make faster,
              smarter decisions.
            </p>
            <Link
              href="#pricing"
              className="inline-block text-[#2D8DFE] font-semibold hover:underline text-lg"
            >
              Choose Your Plan →
            </Link>
          </motion.div>
        </motion.div>

        {/* Fitur 2 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInSlideUpVariants}
          className="flex flex-col md:flex-row-reverse items-center justify-between gap-16 container mx-auto"
        >
          <motion.div
            variants={slideInRightVariants}
            className="w-full md:w-1/2"
          >
            <Image
              src="/image/database.png"
              alt="Employee Database"
              width={700}
              height={500}
              className="w-full h-auto rounded-2xl shadow-xl border border-gray-200"
            />
          </motion.div>
          <motion.div
            variants={slideInLeftVariants}
            className="max-w-md w-full md:w-1/2 space-y-4"
          >
            <h3 className="text-gray-800 text-3xl font-extrabold leading-tight">
              All your employee records in one place.
            </h3>
            <p className="text-lg text-gray-700">
              Store, manage, and update personal details, job information, and
              key documents with ease. Say goodbye to scattered spreadsheets.
            </p>
            <Link
              href="#pricing"
              className="inline-block text-[#2D8DFE] font-semibold hover:underline text-lg"
            >
              Choose Your Plan →
            </Link>
          </motion.div>
        </motion.div>

        {/* Fitur 3 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInSlideUpVariants}
          className="flex flex-col md:flex-row items-center justify-between gap-16 container mx-auto"
        >
          <motion.div
            variants={slideInLeftVariants}
            className="w-full md:w-1/2"
          >
            <Image
              src="/image/checkclock.png"
              alt="Checkclock"
              width={700}
              height={500}
              className="w-full h-auto rounded-2xl shadow-xl border border-gray-200"
            />
          </motion.div>
          <motion.div
            variants={slideInRightVariants}
            className="max-w-md w-full md:w-1/2 space-y-4"
          >
            <h3 className="text-gray-800 text-3xl font-extrabold leading-tight">
              Track attendance with precision.
            </h3>
            <p className="text-lg text-gray-700">
              Let your team clock in and out from anywhere with location-based
              access, custom schedules, and automated reports to reduce manual
              errors.
            </p>
            <Link
              href="#pricing"
              className="inline-block text-[#2D8DFE] font-semibold hover:underline text-lg"
            >
              Choose Your Plan →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Pricing Section with Tabs */}
      <section
        id="pricing"
        className="py-20 px-6 md:px-12 bg-[#D7E3EB] text-center"
      >
        <div className="container mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="text-gray-900 text-5xl font-extrabold mb-4 leading-tight"
          >
            HRIS Pricing Plans
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-gray-700 mb-12 max-w-3xl mx-auto text-lg"
          >
            Choose the plan that suits your business! This HRIS offers
            <br />
            both subscription and pay-as-you-go payment options,
            <br />
            available in following packages.
          </motion.p>

          {/* Tabs */}
          <div className="inline-flex bg-gray-200 rounded-lg shadow-inner mb-12 p-1">
            <button
              onClick={() => setActiveTab("Package")}
              className={`${tabButton("Package")}`}
            >
              Package
            </button>
            <button
              onClick={() => setActiveTab("Seat")}
              className={`${tabButton("Seat")}`}
            >
              Seat
            </button>
          </div>

          {/* Pricing Cards Container */}
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={cardListVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {activeTab === "Package"
              ? packageData.map((pkg, index) => (
                  <motion.div
                    key={index}
                    variants={cardItemVariants}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    }}
                    className="bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-left border border-gray-100 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        {pkg.title}
                      </h3>
                      <p className="text-base text-gray-600 mb-5">
                        {pkg.description}
                      </p>
                      <ul className="text-base text-gray-700 space-y-2 mb-8">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <svg
                              className="w-5 h-5 text-[#2D8DFE] mr-2 mt-1 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={goToCheckout}
                      className="w-full bg-[#1F3F60] text-white py-3 rounded-lg hover:bg-[#2D8DFE] transition-colors duration-300 font-semibold mt-auto"
                    >
                      Select Package →
                    </button>
                  </motion.div>
                ))
              : seatData.map((seat, index) => (
                  <motion.div
                    key={index}
                    variants={cardItemVariants}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    }}
                    className="bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-left border border-gray-100 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {seat.name}
                      </h3>
                      <p className="text-3xl font-extrabold text-gray-900 mt-2">
                        Rp{" "}
                        {typeof seat.price === "number"
                          ? seat.price.toLocaleString("id-ID")
                          : seat.price}{" "}
                        <span className="text-base font-normal text-gray-600">
                          /user/month
                        </span>
                      </p>
                      <p className="text-base text-gray-600 mt-4 mb-8">
                        {seat.description}
                      </p>
                    </div>
                    <button
                      onClick={goToCheckout}
                      className="mt-auto w-full bg-[#1F3F60] text-white py-3 rounded-lg hover:bg-[#2D8DFE] transition-colors duration-300 font-semibold"
                    >
                      Upgrade Package →
                    </button>
                  </motion.div>
                ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#2D8DFE] to-[#1F3F60] text-white py-16 px-6 md:px-12 text-base">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          {/* About Section */}
          <motion.div variants={footerItemVariants}>
            <div className="mb-4">
              <Image
                src="/images/logo-hris-1.png"
                alt="HRIS Logo"
                width={150}
                height={40}
                className="mb-3"
              />
            </div>
            <p className="mb-4 text-gray-300">HRIS by CMLABS</p>
            <p className="mb-6 text-gray-300 leading-relaxed">
              "A smart HR platform to manage your workforce with ease from
              attendance to payroll."
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={footerItemVariants}>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#header" className="hover:underline text-gray-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#features" className="hover:underline text-gray-300">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:underline text-gray-300">
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="mailto:marketing@cmlabs.co"
                  className="hover:underline text-gray-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div variants={footerItemVariants}>
            <h3 className="text-xl font-bold mb-4">Social Media</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://id.linkedin.com/company/cmlabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-gray-300 flex items-center"
                >
                  <FaLinkedin className="mr-2" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/cmlabsco/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-gray-300 flex items-center"
                >
                  <FaInstagram className="mr-2" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/cmlabsco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-gray-300 flex items-center"
                >
                  <FaTwitter className="mr-2" /> Twitter (X)
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Location and Contact Info (using original CMLABS info) */}
          <motion.div variants={footerItemVariants}>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <FaEnvelope className="mr-2" />
                <a
                  href="mailto:marketing@cmlabs.co"
                  className="hover:underline"
                >
                  marketing@cmlabs.co
                </a>
              </li>
              <li className="flex items-center text-gray-300">
                <FaPhone className="mr-2" />
                <a href="tel:+622166604470" className="hover:underline">
                  +62 21 6660 4470
                </a>
              </li>
              <li className="flex items-start text-gray-300">
                <FaMapMarkerAlt className="mr-2 mt-1 flex-shrink-0" />
                <span>
                  Jl. Seruni No.9, Lowokwaru, Kec. Lowokwaru, Kota Malang, Jawa
                  Timur 65141
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-16 text-center text-sm text-gray-400 border-t border-gray-700 pt-8">
          &copy; {new Date().getFullYear()} CMLABS Indonesia Digital. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}
