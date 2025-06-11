"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { loginEmployee } from "@/app/services/auth";

export default function SignInEmployee() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formError, setFormError] = useState("");
  const [password, setPassword] = useState("");
  const [companyUsername, setCompanyUsername] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
      if (!companyUsername || !password) {
        setFormError("Please fill in both fields.");
        return;
      }
      try {
        const result = await loginEmployee(companyUsername, password);
        console.log("Login berhasil:", result); // result = nilai yg dikembalikan
  
        // Redirect ke dashboard
        router.push("/admin/dashboard");
      } catch (error: any) {
        setFormError(error.message || "Login failed");
      }
    }
  return (
    <div className="flex min-h-screen">
      {/* Kiri */}
      <div className="w-1/2 bg-[#9cd0f1] flex items-center justify-center">
        <Image src="/images/logo-hris-1.png" alt="Logo" width={500} height={500} />
      </div>

      {/* Kanan */}
      <div className="w-1/2 bg-white p-8">
        <div className="flex justify-between items-center mb-8">
          <Image src="/images/logo-hris-1.png" alt="Logo" width={120} height={40} />
          <Link href="/auth/register" className="text-sm font-medium underline text-blue-600 hover:opacity-80">
            Try for free!
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-black">Sign in with Employee Username</h1>
        <p className="text-sm mb-6 text-black">
          Welcome back to HRIS cmlabs! Manage everything with ease.
        </p>

        <div className="mb-4">
          <label htmlFor="companyId" className="block text-sm text-black">
            Company Username
          </label>
          <input
            id="companyId"
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2 text-black"
            placeholder="Enter your Company Username"
            value={companyUsername}
            onChange={(e) => setCompanyUsername(e.target.value)}
          />
        </div>

        {/* <div className="mb-4">
          <label htmlFor="employeeID" className="block text-sm text-black">
            ID Employee
          </label>
          <input
            id="employeeId"
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2 text-black"
            placeholder="Enter your ID Employee"
          />
        </div> */}
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm text-black">
            Password
          </label>
          <div className="relative mt-2">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full p-2 pr-10 border border-gray-300 rounded text-black"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-black"
            >
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </div>
          </div>
        </div>

          {formError && (
            <div className="text-red-500 text-sm mb-4">
              {formError}
            </div>
          )}

        <div className="flex items-center justify-between mb-4 mt-2">
          <label htmlFor="rememberMe" className="flex items-center text-sm text-black cursor-pointer">
            <input
              id="rememberMe"
              type="checkbox"
              className="appearance-none h-4 w-4 rounded-full border-2 border-gray-400 checked:bg-blue-500 checked:border-blue-500 transition-all duration-200 mr-2"
            />
            Remember me
          </label>
          <Link href="/auth/forgotPasswordEmployee" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          onClick={handleSignIn}
          className={`w-full text-white p-2 rounded mb-4 ${(!companyUsername || !password) ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-500'}`}
          disabled={!companyUsername || !password}
        >
          SIGN IN
        </button>

        <div className="border border-black text-black rounded p-2 text-center cursor-pointer hover:bg-gray-100 transition">
          Use a different sign-in method
        </div>

        <div className="text-center mt-6">
          <span className="text-black">Don't have an account? </span>
          <Link href="/auth/register" className="text-blue-600 font-medium hover:underline">
            Sign up now and get started
          </Link>
        </div>
      </div>
    </div>
  );
}
