// components/dashboard/AddEmployeeForm.tsx
"use client";

import { useState, useRef } from "react"; // <--- TAMBAH useRef DI SINI
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export default function AddEmployeeForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null); // <--- TAMBAH REF UNTUK INPUT FILE

  const [formData, setFormData] = useState({
    avatar: "", // Ini akan menyimpan URL gambar atau base64 string
    firstName: "",
    lastName: "",
    mobileNumber: "",
    nik: "",
    gender: "",
    lastEducation: "",
    placeBirth: "",
    dateBirth: null as Date | null,
    role: "",
    branch: "",
    grade: "",
    contractType: "fixed", // Default value
    bank: "",
    accountNumber: "",
    accountName: "",
    spType: "",
    idEmployee: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prevData) => ({
      ...prevData,
      dateBirth: date || null,
    }));
  };

  // <--- TAMBAH FUNGSI BARU UNTUK MENANGANI PERUBAHAN FILE INPUT
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Ambil file pertama yang dipilih
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // reader.result akan berisi data URL (base64 string) dari gambar
        setFormData((prevData) => ({
          ...prevData,
          avatar: reader.result as string, // Simpan base64 string ke state avatar
        }));
      };
      reader.readAsDataURL(file); // Baca file sebagai Data URL
    }
  };
  // END --- TAMBAH FUNGSI BARU UNTUK MENANGANI PERUBAHAN FILE INPUT

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Employee Data:", formData);
    // Di sini Anda bisa mengirim data ke API atau menanganinya sesuai kebutuhan
    // Saat mengirim ke backend, Anda akan mengirim `formData.avatar` (base64 string)
    // atau Anda bisa mengkonversi seluruh form menjadi FormData object dan mengirim file langsung
    alert("Employee added successfully (simulated)!");
    router.push("/admin/employee"); // Kembali ke tabel karyawan setelah submit
  };

  const handleCancel = () => {
    router.push("/admin/employee"); // Kembali ke tabel karyawan tanpa menyimpan
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-6 outline-1 p-6">
        {/* Upload Avatar */}
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {formData.avatar ? (
              <img src={formData.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
            ) : (
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                ></path>
              </svg>
            )}
          </div>
          {/* <--- TAMBAH INPUT FILE TERSEMBUNYI */}
          <input
            type="file"
            ref={fileInputRef} // Ikat ref ke input ini
            onChange={handleFileChange}
            className="hidden" // Sembunyikan input file standar
            accept="image/*" // Hanya izinkan file gambar
          />
          {/* END --- TAMBAH INPUT FILE TERSEMBUNYI */}
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()} // <--- MODIFIKASI ONCLICK BUTTON
          >
            Upload Avatar
          </Button>
        </div>

        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="Enter the first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Enter the last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Mobile Number & NIK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              placeholder="Enter the Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              type="tel"
              required
            />
          </div>
          <div>
            <Label htmlFor="nik">NIK</Label>
            <Input
              id="nik"
              placeholder="Enter the NIK"
              value={formData.nik}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Gender & Last Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select onValueChange={(value) => handleSelectChange("gender", value)} value={formData.gender}>
              <SelectTrigger>
                <SelectValue placeholder="-Choose Gender-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="lastEducation">Last Education</Label>
            <Select onValueChange={(value) => handleSelectChange("lastEducation", value)} value={formData.lastEducation}>
              <SelectTrigger>
                <SelectValue placeholder="-Choose Last Education-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SD">SD</SelectItem>
                <SelectItem value="SMP">SMP</SelectItem>
                <SelectItem value="SMA">SMA</SelectItem>
                <SelectItem value="D3">D3</SelectItem>
                <SelectItem value="S1">S1</SelectItem>
                <SelectItem value="S2">S2</SelectItem>
                <SelectItem value="S3">S3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Place Birth & Date Birth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="placeBirth">Place birth</Label>
            <Input
              id="placeBirth"
              placeholder="Enter place of birth"
              value={formData.placeBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="dateBirth">Date birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dateBirth ? format(formData.dateBirth, "PPP") : <span>Enter date of birth</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.dateBirth || undefined}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Role & Branch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              placeholder="Enter your Role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="branch">Branch</Label>
            <Input
              id="branch"
              placeholder="Enter the branch"
              value={formData.branch}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Contract Type & Grade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <Label>Contract type</Label>
            <RadioGroup
              defaultValue={formData.contractType}
              onValueChange={(value) => handleSelectChange("contractType", value)}
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fixed" id="r1" />
                <Label htmlFor="r1">Fixed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="contract" id="r2" />
                <Label htmlFor="r2">Contract</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="past" id="r3" />
                <Label htmlFor="r3">Past</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="grade">Grade</Label>
            <Input
              id="grade"
              placeholder="Enter your grade"
              value={formData.grade}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Bank & Account Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bank">Bank</Label>
            <Select onValueChange={(value) => handleSelectChange("bank", value)} value={formData.bank}>
              <SelectTrigger>
                <SelectValue placeholder="-choose your bank-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BCA">BCA</SelectItem>
                <SelectItem value="Mandiri">Mandiri</SelectItem>
                <SelectItem value="BNI">BNI</SelectItem>
                <SelectItem value="BRI">BRI</SelectItem>
                <SelectItem value="CIMB">CIMB Niaga</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              placeholder="Enter your account number"
              value={formData.accountNumber}
              onChange={handleChange}
              type="number"
              required
            />
          </div>
        </div>

        {/* Account Name & SP Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="accountName">Account Name</Label>
            <Input
              id="accountName"
              placeholder="Enter the account name"
              value={formData.accountName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="spType">SP Type</Label>
            <Select onValueChange={(value) => handleSelectChange("spType", value)} value={formData.spType}>
              <SelectTrigger>
                <SelectValue placeholder="-choose SP-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SP1">SP1</SelectItem>
                <SelectItem value="SP2">SP2</SelectItem>
                <SelectItem value="SP3">SP3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ID Employee & Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="idEmployee">ID Employee</Label>
            <Input
              id="idEmployee"
              placeholder="Enter your ID Employee"
              value={formData.idEmployee}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}