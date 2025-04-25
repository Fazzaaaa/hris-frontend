"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

  const handleSignUp = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setFormError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    setFormError("");
    router.push("/contohDashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Kiri */}
      <div className="w-1/2 bg-[#7CA5BF] flex items-center justify-center">
        <Image src="/image/logo1.png" alt="Logo" width={500} height={500} />
      </div>

      {/* Kanan */}
      <div className="w-1/2 bg-white p-8">
        <div className="flex justify-between items-center mb-8">
          <Image src="/image/logo1.png" alt="Logo" width={120} height={40} />
          <Link href="/signin" className="text-blue-600 text-sm font-medium underline hover:opacity-80">
            Login here!
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-black">Sign Up</h1>
        <p className="text-sm mb-6 text-black">
          Create your account and streamline your employee management.
        </p>

        {/* Error Message */}
        {formError && <div className="text-red-600 mb-4">{formError}</div>}

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label htmlFor="firstName" className="block text-sm text-black">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-2 text-black"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="lastName" className="block text-sm text-black">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-2 text-black"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
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
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
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
              {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </div>
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
            <span className="text-sm text-black">I agree with the terms of use of HRIS</span>
          </label>
        </div>

        <button onClick={handleSignUp} className="w-full bg-gray-500 text-white p-2 rounded mb-4">
          SIGN UP
        </button>

        <button className="w-full bg-white border border-black text-black p-2 rounded">
          Sign up with Google
        </button>


        <div className="text-center mt-6">
          <span className="text-black">Already have an account? </span>
          <Link href="/signin" className="text-blue-600 font-medium hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
