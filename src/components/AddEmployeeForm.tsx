// components/dashboard/AddEmployeeForm.tsx
"use client";

import { useEffect, useState, useRef } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface AddEmployeeFormProps {
  initialData?: any;
  mode: "add" | "edit";
}

export default function AddEmployeeForm({
  initialData,
  mode,
}: AddEmployeeFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    avatar: "",
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
    contractType: "fixed",
    bank: "",
    accountNumber: "",
    accountName: "",
    spType: "",
    idEmployee: "",
    password: "",
    ShiftType: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        dateBirth: initialData.dateBirth
          ? new Date(initialData.dateBirth)
          : null,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedData = localStorage.getItem("employees");
    const employeeList = storedData ? JSON.parse(storedData) : [];

    if (mode === "add") {
      const newEmployee = {
        ...formData,
        no: employeeList.length + 1,
        idEmployee: formData.idEmployee || `EMP${Date.now()}`,
      };
      employeeList.push(newEmployee);
      localStorage.setItem("employees", JSON.stringify(employeeList));
      alert("Employee added successfully!");
    } else if (mode === "edit") {
      const updatedList = employeeList.map((emp: any) =>
        emp.idEmployee === formData.idEmployee ? formData : emp
      );
      localStorage.setItem("employees", JSON.stringify(updatedList));
      alert("Employee updated successfully!");
    }
    router.push("/admin/employee");
  };

  const handleCancel = () => {
    router.push("/admin/employee");
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-semibold mb-6">
        {mode === "add" ? "Add New Employee" : "Edit Employee"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6 outline-1 p-6">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="Enter the first name"
              value={formData.firstName ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                // Hanya huruf dan spasi
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setFormData({ ...formData, firstName: value });
                }
              }}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Enter the last name"
              value={formData.lastName ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                // Hanya huruf dan spasi
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setFormData({ ...formData, lastName: value });
                }
              }}
              required
            />
          </div>
        </div>
        
        {/* Gender & Last Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <Label htmlFor="gender">Gender</Label>
            <Select
              onValueChange={(value) => handleSelectChange("gender", value)}
              value={formData.gender}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Choose Gender-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Laki laki">Laki Laki</SelectItem>
                <SelectItem value="Perempuan">Perempuan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              placeholder="Enter your Role"
              value={formData.role ?? ""}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Only letters and spaces
                handleChange({
                  ...e,
                  target: { ...e.target, id: "role", value },
                });
              }}
              pattern="[a-zA-Z\s]+"
              required
            />
          </div>
        </div>

        {/* Role & Branch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="branch">Branch</Label>
            <Input
              id="branch"
              placeholder="Enter the branch"
              value={formData.branch ?? ""}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, ""); // Letters, numbers, and spaces
                handleChange({
                  ...e,
                  target: { ...e.target, id: "branch", value },
                });
              }}
              pattern="[a-zA-Z0-9\s]+"
              required
            />
          </div>
          <div className="w-full">
            <Label htmlFor="ShiftType">Shift Type</Label>
            <Select
              onValueChange={(value) => handleSelectChange("ShiftType", value)}
              value={formData.ShiftType}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Choose Shift-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ShiftType1">Shift 1</SelectItem>
                <SelectItem value="ShiftType2">Shift 2</SelectItem>
                <SelectItem value="ShiftType3">Shift 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Contract Type & Grade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <Label>Contract type</Label>
            <RadioGroup
              defaultValue={formData.contractType}
              onValueChange={(value) =>
                handleSelectChange("contractType", value)
              }
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fixed" id="r1" />
                <Label htmlFor="r1">Tetap</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="contract" id="r2" />
                <Label htmlFor="r2">Percobaan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="past" id="r3" />
                <Label htmlFor="r3">Kontrak</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intern" id="r4" />
                <Label htmlFor="r4">Magang</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="w-full">
            <Label htmlFor="spType">SP Type</Label>
            <Select
              onValueChange={(value) => handleSelectChange("spType", value)}
              value={formData.spType}
            >
              <SelectTrigger className="w-full">
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
        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="text-red-600 border-red-600 hover:text-white hover:bg-red-600"
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-[#1F633D]">Save</Button>
        </div>
      </form>
    </div>
  );
}
