"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const CheckoutPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<"single" | "monthly">(
    "single"
  );
  const [teamSize, setTeamSize] = useState<"1-50" | "51-100">("1-50");
  const [numEmployees, setNumEmployees] = useState(2);

  // Package information from URL params
  const [packageType, setPackageType] = useState<"package" | "seat">("package");
  const [packageName, setPackageName] = useState("Premium");
  const [packagePrice, setPackagePrice] = useState(17000);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract package information from URL params
  useEffect(() => {
    const type = searchParams.get("type") as "package" | "seat";
    const name = searchParams.get("package");
    const price = searchParams.get("price");

    if (type) setPackageType(type);
    if (name) setPackageName(name);
    if (price) setPackagePrice(parseInt(price));

    // Set default pricing based on package type and name
    if (type === "package") {
      // For package type, use default price of 17000
      setPackagePrice(17000);
    } else if (type === "seat" && price) {
      // For seat type, use the price from URL
      setPackagePrice(parseInt(price));
    }
  }, [searchParams]);

  // Get team size options based on package type and name
  const getTeamSizeOptions = () => {
    if (packageType === "seat") {
      switch (packageName) {
        case "STANDARD":
          return ["1-50"];
        case "STANDARD PLUS":
          return ["51-75"];
        case "PREMIUM":
          return ["76-100"];
        case "PREMIUM PLUS":
          return ["101-150"];
        case "ULTRA":
          return ["151-200"];
        case "ULTRA ENTERPRISE":
          return ["200+"];
        default:
          return ["1-50", "51-100"];
      }
    }
    return ["1-50", "51-100"];
  };

  const teamSizeOptions = getTeamSizeOptions();

  // Set initial team size based on package
  useEffect(() => {
    if (packageType === "seat" && teamSizeOptions.length === 1) {
      setTeamSize(teamSizeOptions[0] as "1-50" | "51-100");
    }
  }, [packageType, packageName]);

  const pricePerUser = packagePrice;
  const subtotal = numEmployees * pricePerUser;
  const tax = 0;
  const total = subtotal + tax;

  // Function to handle payment navigation with total amount
  const handleContinueToPayment = () => {
    const paymentUrl = `/admin/pricing/payment?total=${total}&package=${encodeURIComponent(
      packageName
    )}&employees=${numEmployees}&billing=${billingPeriod}`;
    router.push(paymentUrl);
  };

  return (
    <div className="min-h-screen bg-white text-black flex">
      {/* Left Section */}
      <div className="w-1/2 p-10 flex flex-col justify-between">
        <div>
          {/* Logo and Title */}
          <div className="flex items-center space-x-3 mb-6">
            <Image
              src="/images/vector-hris.png"
              alt="HRIS Logo"
              width={40}
              height={40}
            />
            <p className="font-semibold text-lg self-center">HRIS</p>
          </div>

          <h1 className="text-3xl font-bold mb-2">{packageName}</h1>
          <p className="text-sm text-gray-500 mb-4">
            {packageType === "package"
              ? `Upgrade to ${packageName.toLowerCase()}`
              : `${packageName} plan`}
          </p>

          {/* Billing Period */}
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Billing Period</h2>
            <div className="flex gap-2">
              <button
                className={`border px-4 py-2 rounded ${
                  billingPeriod === "single"
                    ? "border-black font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => setBillingPeriod("single")}
              >
                Single Payment - Rp {pricePerUser.toLocaleString()} / User
              </button>
              <button
                className={`border px-4 py-2 rounded ${
                  billingPeriod === "monthly"
                    ? "border-black font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => setBillingPeriod("monthly")}
              >
                Monthly - Rp {pricePerUser.toLocaleString()} / User
              </button>
            </div>
          </div>

          {/* Team Size */}
          <div className="mb-6">
            <h2 className="font-semibold mb-1">Size Matters</h2>
            <p className="text-sm text-gray-600 mb-2">
              Choose the right fit for your team!
            </p>
            <div className="flex gap-4">
              {teamSizeOptions.map((option) => (
                <label key={option} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="teamSize"
                    value={option}
                    checked={teamSize === option}
                    onChange={() => setTeamSize(option as "1-50" | "51-100")}
                    disabled={teamSizeOptions.length === 1}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Number of Employees */}
          <div className="mb-6">
            <h2 className="font-semibold mb-1">Number of Employees</h2>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() =>
                  setNumEmployees(numEmployees > 1 ? numEmployees - 1 : 1)
                }
                className="border rounded px-3 py-1"
              >
                -
              </button>
              <span className="font-semibold">{numEmployees}</span>
              <button
                onClick={() => setNumEmployees(numEmployees + 1)}
                className="border rounded px-3 py-1"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={() => router.push("/admin/pricing")}
            className="w-full border border-black py-3 font-semibold rounded hover:bg-black hover:text-white transition"
          >
            Change Plan
          </button>
        </div>
      </div>

      {/* Right Section - Order Summary Only */}
      <div className="w-1/2 bg-gray-100 p-10 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-2 mb-6 text-sm">
            <div className="flex justify-between">
              <span>Package</span>
              <span>: {packageName}</span>
            </div>
            <div className="flex justify-between">
              <span>Type</span>
              <span>
                :{" "}
                {packageType === "package" ? "Package Plan" : "Seat-based Plan"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Billing Period</span>
              <span>
                : {billingPeriod === "single" ? "Single Payment" : "Monthly"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Team Size</span>
              <span>: {teamSize}</span>
            </div>
            <div className="flex justify-between">
              <span>Number of Employees</span>
              <span>: {numEmployees}</span>
            </div>
            <div className="flex justify-between">
              <span>Price per User</span>
              <span>: Rp {pricePerUser.toLocaleString()}</span>
            </div>
          </div>

          <hr className="border-black my-4" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>Rp {tax.toLocaleString()}</span>
            </div>
          </div>

          <hr className="border-black my-4" />

          <div className="flex justify-between font-semibold text-lg mb-6">
            <span>Total at renewal</span>
            <span>Rp {total.toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={handleContinueToPayment}
          className="w-full border border-black py-3 font-semibold rounded hover:bg-black hover:text-white transition"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
