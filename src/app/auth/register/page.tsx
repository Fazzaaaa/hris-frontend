"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { registerAdmin } from "@/app/services/auth";

export default function SignUpPage() {
  const [company, setCompany] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [bank, setBank] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formError, setFormError] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignUp = async () => {
    if (!company || !email || !bank || !number || !password || !confirmPassword) {
      setFormError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      setFormError(""); // Bersihkan error sebelumnya

      const payload = {
        company_name: company,
        email,
        bank_name: bank,
        bank_number: number,
        password,
        password_confirmation: confirmPassword, // Laravel butuh ini untuk validasi konfirmasi
      };

      const response = await registerAdmin(payload);
      console.log("Register berhasil:", response);

      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error("Register gagal:", error);
      setFormError(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Kiri */}
      <div className="w-1/2 bg-[#9cd0f1] flex items-center justify-center">
        <Image
          src="/images/logo-hris-1.png"
          alt="Logo"
          width={500}
          height={500}
        />
      </div>

      {/* Kanan */}
      <div className="w-1/2 bg-white p-8">
        <div className="flex justify-between items-center mb-8">
          <Image
            src="/images/logo-hris-1.png"
            alt="Logo"
            width={120}
            height={40}
          />
          <Link
            href="/auth/loginAdmin"
            className="text-blue-600 text-sm font-medium underline hover:opacity-80"
          >
            Login here!
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-black">Register</h1>
        <p className="text-sm mb-6 text-black">
          Create your account and streamline your employee management.
        </p>

        {/* Error Message */}
        {formError && <div className="text-red-600 mb-4">{formError}</div>}
        <div className="mb-4">
          <label htmlFor="company" className="block text-sm text-black">
            Company Name
          </label>
          <input
            id="company"
            type="company"
            className="w-full p-2 border border-gray-300 rounded mt-2 text-black"
            placeholder="Enter your company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-black">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border border-gray-300 rounded mt-2 text-black"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm text-black">
            Password
          </label>
          <div className="relative mt-2">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full p-2 pr-10 border border-gray-300 rounded text-black"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-black"
            >
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm text-black">
            Confirm Password
          </label>
          <div className="relative mt-2">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="w-full p-2 pr-10 border border-gray-300 rounded text-black"
              placeholder="Enter your confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-black"
            >
              {showConfirmPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label htmlFor="bank" className="block text-sm text-black">
              Bank
            </label>
            <select
              id="bank"
              className="w-full p-2 border border-gray-300 rounded mt-2 text-black"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            >
              <option value="">Choose your bank</option>
              <option value="BCA">BCA</option>
              <option value="BRI">BRI</option>
              <option value="BNI">BNI</option>
              <option value="MANDIRI">MANDIRI</option>
            </select>
          </div>
          <div className="w-1/2">
            <label htmlFor="number" className="block text-sm text-black">
              Account Number
            </label>
            <input
              id="number"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full p-2 border border-gray-300 rounded mt-2 text-black"
              placeholder="Enter your account number"
              value={number}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, ""); // remove non-numeric characters
                setNumber(numericValue);
              }}
            />
          </div>
        </div>

        <div className="flex items-center mb-6">
          <label htmlFor="terms" className="flex items-center cursor-pointer">
            <input
              id="terms"
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="appearance-none h-5 w-5 rounded-full border-2 border-gray-400 checked:bg-blue-500 checked:border-blue-500 transition-all duration-200 mr-2"
            />
            <span className="text-sm text-black">
              I agree with the terms of use of HRIS
            </span>
          </label>
        </div>

        <button
          onClick={handleSignUp}
          className="w-full bg-gray-500 text-white p-2 rounded mb-4"
        >
          SIGN UP
        </button>

        <button className="w-full bg-white border border-black text-black p-2 rounded">
          Sign up with Google
        </button>

        <div className="text-center mt-6">
          <span className="text-black">Already have an account? </span>
          <Link
            href="/auth/loginAdmin"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
