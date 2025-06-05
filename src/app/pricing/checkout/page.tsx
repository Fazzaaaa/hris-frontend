'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<'single' | 'monthly'>('single');
  const [teamSize, setTeamSize] = useState<'1-50' | '51-100'>('1-50');
  const [numEmployees, setNumEmployees] = useState(2);
  const router = useRouter();

  const pricePerUser = 17000;
  const subtotal = numEmployees * pricePerUser;
  const tax = 0;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-white text-black flex">
      {/* Left Section */}
      <div className="w-1/2 p-10 flex flex-col justify-between">
        <div>
          <button
              onClick={() => router.push("/pricing")}
              className="absolute top-4 right-4 text-black hover:text-white bg-gray-200 hover:bg-gray-600 p-1 rounded-full transition"
              aria-label="Close"
              >
            <MdClose size={24} />
          </button>
          {/* Logo and HRIS */}
          <div className="flex items-center space-x-3 mb-6">
            <Image src="/images/vector-hris.png" alt="HRIS Logo" width={40} height={40} />
            <p className="font-semibold text-lg self-center">HRIS</p>
          </div>

          <h1 className="text-3xl font-bold mb-2">Premium</h1>
          <p className="text-sm text-gray-500 mb-4">upgrade to premium</p>

          <Link href="/pricing" className="text-sm text-blue-600 underline mb-4 block hover:text-blue-800 transition">
            Change plan
          </Link>

          {/* Billing Period */}
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Billing Period</h2>
            <div className="flex gap-2">
              <button
                className={`border px-4 py-2 rounded ${billingPeriod === 'single' ? 'border-black font-semibold' : 'text-gray-600'}`}
                onClick={() => setBillingPeriod('single')}
              >
                Single Payment - Rp 17,000 / User
              </button>
              <button
                className={`border px-4 py-2 rounded ${billingPeriod === 'monthly' ? 'border-black font-semibold' : 'text-gray-600'}`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly - Rp 17,000 / User
              </button>
            </div>
          </div>

          {/* Team Size */}
          <div className="mb-6">
            <h2 className="font-semibold mb-1">Size Matters</h2>
            <p className="text-sm text-gray-600 mb-2">Choose the right fit for your team!</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="teamSize"
                  value="1-50"
                  checked={teamSize === '1-50'}
                  onChange={() => setTeamSize('1-50')}
                />
                <span>1 - 50</span>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="teamSize"
                  value="51-100"
                  checked={teamSize === '51-100'}
                  onChange={() => setTeamSize('51-100')}
                />
                <span>51 - 100</span>
              </label>
            </div>
          </div>

          {/* Number of Employees */}
          <div className="mb-6">
            <h2 className="font-semibold mb-1">Number of Employees</h2>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => setNumEmployees(numEmployees > 1 ? numEmployees - 1 : 1)}
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

        {/* Continue Button (Left) */}
        <button className="w-full border border-black py-3 font-semibold rounded hover:bg-black hover:text-white transition">
          Continue to Payment
        </button>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-gray-100 p-10 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold">Order Summary</h2>
          </div>

          <div className="space-y-2 mb-6 text-sm">
            <div className="flex justify-between">
              <span>Package</span>
              <span>: Premium</span>
            </div>
            <div className="flex justify-between">
              <span>Billing Period</span>
              <span>: {billingPeriod === 'single' ? 'Single Payment' : 'Monthly'}</span>
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

        {/* Continue Button (Right) */}
        <button className="w-full border border-black py-3 font-semibold rounded hover:bg-black hover:text-white transition">
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
