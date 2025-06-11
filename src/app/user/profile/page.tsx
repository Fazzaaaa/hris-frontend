"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, AlertCircle, Eye, EyeOff, Camera, Upload, User, Phone, CreditCard, GraduationCap, MapPin, Calendar, Briefcase, Building, FileText, DollarSign, Lock, Clock, Edit } from "lucide-react";

interface ProfilePageProps {
  avatar: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  nik: string;
  gender: string;
  lastEducation: string;
  placeBirth: string;
  dateBirth: Date | string | null;
  role: string;
  branch: string;
  contractType: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  spType: string;
  companyUsername: string;
  shiftType: string;
  password: string;
}

// Komponen helper untuk menampilkan satu baris detail dengan icon
const DetailItem: React.FC<{ label: string; value: string | React.ReactNode; icon: React.ReactNode; isEmpty?: boolean }> = ({ label, value, icon, isEmpty = false }) => (
  <div className={`flex items-start space-x-3 p-4 bg-gradient-to-r rounded-lg border transition-all duration-300 group ${isEmpty ? 'from-red-50 to-red-100 border-red-200' : 'from-gray-50 to-white border-gray-100 hover:shadow-md'}`}>
    <div className={`p-2 rounded-lg transition-colors duration-300 ${isEmpty ? 'bg-red-100 text-red-600 group-hover:bg-red-200' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'}`}>
      {icon}
    </div>
    <div className="flex-1">
      <span className="text-sm font-medium text-gray-500 block mb-1">{label}</span>
      <span className={`text-base font-medium break-words ${isEmpty ? 'text-red-600 italic' : 'text-gray-800'}`}>
        {isEmpty ? 'Required - Please complete your profile' : (value || '-')}
      </span>
    </div>
  </div>
);

// Password Display Component
const PasswordDisplay: React.FC<{ password: string }> = ({ password }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="flex items-center space-x-2">
      <span className="text-base text-gray-800 font-medium">
        {showPassword ? password : '••••••••'}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 hover:bg-gray-100"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff className="h-3 w-3 text-gray-500" />
        ) : (
          <Eye className="h-3 w-3 text-gray-500" />
        )}
      </Button>
    </div>
  );
};

// Password Input Component
interface PasswordInputWithToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const PasswordInputWithToggle: React.FC<PasswordInputWithToggleProps> = ({ id, value, onChange, className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className={className}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-gray-500" />
        ) : (
          <Eye className="h-4 w-4 text-gray-500" />
        )}
        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
      </Button>
    </div>
  );
};

const ProfilePage: React.FC<ProfilePageProps> = ({
  avatar,
  firstName,
  lastName,
  mobileNumber: initialMobileNumber,
  nik: initialNik,
  gender,
  lastEducation: initialLastEducation,
  placeBirth: initialPlaceBirth,
  dateBirth: initialDateBirth,
  role,
  branch,
  contractType,
  bank:initialBank,
  accountNumber:initialAccountNumber,
  accountName:initialAccountName,
  spType,
  companyUsername,
  password: initialPassword,
  shiftType
}) => {
  // State untuk data yang bisa diedit user
  const [mobileNumber, setMobileNumber] = useState(initialMobileNumber || "");
  const [nik, setNik] = useState(initialNik || "");
  const [lastEducation, setLastEducation] = useState(initialLastEducation || "");
  const [placeBirth, setPlaceBirth] = useState(initialPlaceBirth || "");
  const [dateBirth, setDateBirth] = useState(initialDateBirth || "");
  const [bank, setBank] = useState(initialBank || "");
  const [accountNumber, setAccountNumber] = useState(initialAccountNumber || "");
  const [accountName, setAccountName] = useState(initialAccountName || "");
  
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [isChangePhotoDialogOpen, setIsChangePhotoDialogOpen] = useState(false);
  const [isEditPersonalInfoDialogOpen, setIsEditPersonalInfoDialogOpen] = useState(false);
  const [isEditBankInfoDialogOpen, setIsEditBankInfoDialogOpen] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState(initialPassword);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // State untuk form edit personal info
  const [bankInfoForm, setbankInfoForm] = useState({
    bank: bank,
    accountNumber: accountNumber,
    accountName: accountName,
  });

  // State untuk form edit personal info
  const [personalInfoForm, setPersonalInfoForm] = useState({
    mobileNumber: mobileNumber,
    nik: nik,
    lastEducation: lastEducation,
    placeBirth: placeBirth,
    dateBirth: dateBirth ? (typeof dateBirth === 'string' ? dateBirth.split('T')[0] : new Date(dateBirth).toISOString().split('T')[0]) : "",
  });

  const [personalInfoError, setPersonalInfoError] = useState<string | null>(null);
  const [personalInfoSuccess, setPersonalInfoSuccess] = useState<string | null>(null);

  const [bankInfoError, setBankInfoError] = useState<string | null>(null);
  const [bankInfoSuccess, setBankInfoSuccess] = useState<string | null>(null);

  // Cek apakah ada field yang kosong (required)
  const hasEmptyRequiredFields = !mobileNumber || !nik || !lastEducation || !placeBirth || !dateBirth || !bank || !accountNumber || !accountName;

  const formattedDateBirth = dateBirth
    ? new Date(dateBirth).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : '';

  const initials = `${firstName ? firstName.charAt(0) : ''}${lastName ? lastName.charAt(0) : ''}`;

  const educationOptions = [
    "SD",
    "SMP",
    "SMA/SMK",
    "D2",
    "D3",
    "D4",
    "S1",
    "S2",
  ];

  const bankOptions = [
    "Bank Mandiri",
    "Bank BCA",
    "Bank BNI",
    "Bank BRI",
    "Bank CIMB Niaga",
    "Bank Danamon",
    "Bank BTN",
    "Bank Permata",
  ];

  const handlePasswordFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [id]: value,
    }));
    setPasswordError(null);
    setPasswordSuccess(null);
  };

  const handlePersonalInfoFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPersonalInfoForm((prev) => ({
      ...prev,
      [id]: value,
    }));
    setPersonalInfoError(null);
    setPersonalInfoSuccess(null);
  };

  const handlePersonalInfoSelectChange = (value: string, field: string) => {
    setPersonalInfoForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    setPersonalInfoError(null);
    setPersonalInfoSuccess(null);
  };

  const handleBankInfoFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setbankInfoForm((prev) => ({
      ...prev,
      [id]: value,
    }));
    setBankInfoError(null);
    setBankInfoSuccess(null);
  };

  const handleBankInfoSelectChange = (value: string, field: string) => {
    setbankInfoForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    setBankInfoError(null);
    setBankInfoSuccess(null);
  };

  const handleChangePassword = async () => {
    setPasswordError(null);
    setPasswordSuccess(null);

  const { oldPassword, newPassword, confirmNewPassword } = passwordForm;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setPasswordError("All password fields are required.");
      return;
    }

    if (oldPassword !== currentPassword) {
      setPasswordError("Incorrect old password.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError("New password and confirm new password do not match.");
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setCurrentPassword(newPassword);
      setPasswordSuccess("Password changed successfully!");
      setPasswordForm({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
      
      setTimeout(() => {
        setIsChangePasswordDialogOpen(false);
        setPasswordSuccess(null);
      }, 2000);
      
    } catch (error) {
      console.error("Error changing password:", error);
      setPasswordError("An unexpected error occurred. Please try again.");
    }
  };

  const handleSavePersonalInfo = async () => {
    setPersonalInfoError(null);
    setPersonalInfoSuccess(null);

    const { mobileNumber: formMobile, nik: formNik, lastEducation: formEducation, placeBirth: formPlace, dateBirth: formDate } = personalInfoForm;

    // Validasi required fields
    if (!formMobile || !formNik || !formEducation || !formPlace || !formDate) {
      setPersonalInfoError("All fields are required.");
      return;
    }

    // Validasi NIK (16 digit)
    if (formNik.length !== 16 || !/^\d+$/.test(formNik)) {
      setPersonalInfoError("NIK must be exactly 16 digits.");
      return;
    }

    // Validasi mobile number
    if (!/^(\+62|62|0)8[1-9][0-9]{6,9}$/.test(formMobile)) {
      setPersonalInfoError("Please enter a valid Indonesian mobile number.");
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update state dengan data baru
      setMobileNumber(formMobile);
      setNik(formNik);
      setLastEducation(formEducation);
      setPlaceBirth(formPlace);
      setDateBirth(formDate);

      setPersonalInfoSuccess("Personal information updated successfully!");
      
      setTimeout(() => {
        setIsEditPersonalInfoDialogOpen(false);
        setPersonalInfoSuccess(null);
      }, 2000);
      
    } catch (error) {
      console.error("Error updating personal info:", error);
      setPersonalInfoError("An unexpected error occurred. Please try again.");
    }
  };

  const handleSaveBankInfo = async () => {
    setBankInfoError(null);
    setBankInfoSuccess(null);

    const { bank: formBank, accountName: formAccountName, accountNumber: formAccountNumber} = bankInfoForm;

    // Validasi required fields
    if (!formBank || !formAccountName || !accountNumber) {
      setBankInfoError("All fields are required.");
      return;
    }

    // Validasi account name
    if (!/^[A-Za-z]+$/.test(formAccountName)) {
      setBankInfoError("Nama hanya boleh berisi huruf tanpa angka atau simbol.");
      return;
    }

    // Validasi mobile number
    if (!/^\d+$/.test(formAccountNumber)) {
      setBankInfoError("Nomor rekening hanya boleh berisi angka.");
      return;
    }


    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update state dengan data baru
      setBank(formBank);
      setAccountName(formAccountName);
      setAccountNumber(formAccountNumber);

      setBankInfoSuccess("Bank information updated successfully!");
      
      setTimeout(() => {
        setIsEditBankInfoDialogOpen(false);
        setBankInfoSuccess(null);
      }, 2000);
      
    } catch (error) {
      console.error("Error updating bank information:", error);
      setBankInfoError("An unexpected error occurred. Please try again.");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedFile) return;
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Uploading photo:", selectedFile);
    
    setIsChangePhotoDialogOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl flex items-center justify-center p-4">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          {hasEmptyRequiredFields && (
            <Card className="shadow-lg border border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-full">
                    <User className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-red-800 font-semibold">Profile Incomplete</p>
                    <p className="text-red-600 text-sm">Please complete your personal information to continue using the system.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Profile Header Card */}
          <Card className="shadow-2xl bg-gradient-to-r from-[#1C3D5A] to-white text-white border-0 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                {/* Avatar Section */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-32 h-32 lg:w-40 lg:h-40 border-4 border-white shadow-2xl">
                      <AvatarImage src={avatar} alt={`${firstName} ${lastName}'s Avatar`} className="object-cover" />
                      <AvatarFallback className="bg-white text-blue-600 text-4xl lg:text-5xl font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {/* Edit Photo Button */}
                  <Dialog open={isChangePhotoDialogOpen} onOpenChange={setIsChangePhotoDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Edit Photo
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Change Profile Photo</DialogTitle>
                        <DialogDescription>
                          Upload a new profile photo. The image should be square and at least 200x200 pixels.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex flex-col items-center space-y-4">
                          {previewUrl ? (
                            <img 
                              src={previewUrl} 
                              alt="Preview" 
                              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                            />
                          ) : (
                            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
                              <Upload className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="max-w-xs"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setIsChangePhotoDialogOpen(false);
                            setSelectedFile(null);
                            setPreviewUrl(null);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="button" 
                          onClick={handlePhotoUpload}
                          disabled={!selectedFile}
                        >
                          Upload Photo
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center lg:text-left space-y-3">
                  <h2 className="text-4xl lg:text-5xl font-bold">{firstName} {lastName}</h2>
                  <p className="text-xl lg:text-2xl font-semibold text-blue-100">{role}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-blue-100">
                    <div className="flex items-center justify-center lg:justify-start space-x-2">
                      <Building className="w-5 h-5" />
                      <span className="font-medium">{branch}</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start space-x-2">
                      <Briefcase className="w-5 h-5" />
                      <span className="font-medium">{companyUsername}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3">
                  <Dialog open={isChangePasswordDialogOpen} onOpenChange={setIsChangePasswordDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="secondary" 
                        className="bg-white/20 hover:bg-black/30 text-black border border-[#1C3D5A]/20 backdrop-blur-sm"
                      >
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                          Enter your old password and new password here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="oldPassword" className="text-right">
                            Old Password
                          </Label>
                          <div className="col-span-3">
                            <PasswordInputWithToggle
                              id="oldPassword"
                              value={passwordForm.oldPassword}
                              onChange={handlePasswordFormChange}
                              maxLength={20}
                              className={`focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${passwordError && passwordError.includes("old password") ? 'border-red-500' : ''}`}
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="newPassword" className="text-right">
                            New Password
                          </Label>
                          <div className="col-span-3">
                            <PasswordInputWithToggle
                              id="newPassword"
                              value={passwordForm.newPassword}
                              onChange={handlePasswordFormChange}
                              maxLength={20}
                              className={`focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${passwordError && (passwordError.includes("New password must") || passwordError.includes("match")) ? 'border-red-500' : ''}`}
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="confirmNewPassword" className="text-right">
                            Confirm New Password
                          </Label>
                          <div className="col-span-3">
                            <PasswordInputWithToggle
                              id="confirmNewPassword"
                              value={passwordForm.confirmNewPassword}
                              onChange={handlePasswordFormChange}
                              maxLength={20}
                              className={`focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${passwordError && passwordError.includes("match") ? 'border-red-500' : ''}`}
                              required
                            />
                          </div>
                        </div>

                        {passwordError && (
                          <p className="text-red-500 text-sm text-center -mt-2">
                            {passwordError}
                          </p>
                        )}
                        {passwordSuccess && (
                          <p className="text-green-500 text-sm text-center -mt-2">
                            {passwordSuccess}
                          </p>
                        )}

                        <DialogFooter className="mt-4">
                          <Button type="button" variant="outline" onClick={() => {
                            setIsChangePasswordDialogOpen(false);
                            setPasswordError(null);
                            setPasswordSuccess(null);
                            setPasswordForm({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
                          }}>Cancel</Button>
                          <Button type="button" onClick={handleChangePassword}>Save changes</Button>
                        </DialogFooter>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information Card */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
                  <User className="w-6 h-6 text-blue-600" />
                  <span>Personal Information</span>
                </CardTitle>
                <Dialog open={isEditPersonalInfoDialogOpen} onOpenChange={setIsEditPersonalInfoDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Personal Info</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden">
                    <DialogHeader className="space-y-3 pb-6">
                      <DialogTitle className="text-xl font-semibold text-gray-900">
                        Edit Personal Information
                      </DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Update your personal information. All fields marked with * are required.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="overflow-y-auto max-h-[60vh] pr-2">
                      <div className="space-y-6">

                        {/* Mobile Number */}
                        <div className="space-y-2">
                          <Label htmlFor="mobileNumber" className="flex items-center text-sm font-medium text-gray-700">
                            <Phone className="w-4 h-4 mr-2 text-blue-600" />
                            Mobile Number *
                          </Label>
                          <Input
                            id="mobileNumber"
                            type="tel"
                            placeholder="08123456789"
                            value={personalInfoForm.mobileNumber}
                            onChange={handlePersonalInfoFormChange}
                            className="h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          />
                        </div>

                        {/* NIK */}
                        <div className="space-y-2">
                          <Label htmlFor="nik" className="flex items-center text-sm font-medium text-gray-700">
                            <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                            NIK (National Identity Number) *
                          </Label>
                          <Input
                            id="nik"
                            type="text"
                            placeholder="1234567890123456"
                            maxLength={16}
                            value={personalInfoForm.nik}
                            onChange={handlePersonalInfoFormChange}
                            className="h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          />
                          <p className="text-xs text-gray-500">16 digits national identity number</p>
                        </div>

                        {/* Last Education */}
                        <div className="space-y-2 ">
                          <Label htmlFor="lastEducation" className="flex items-center text-sm font-medium text-gray-700">
                            <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                            Last Education *
                          </Label>
                          <Select
                            value={personalInfoForm.lastEducation}
                            onValueChange={(value) => handlePersonalInfoSelectChange(value, 'lastEducation')}
                          >
                            <SelectTrigger className="w-full h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all">
                              <SelectValue placeholder="Select your highest education level" />
                            </SelectTrigger>
                            <SelectContent>
                              {educationOptions.map((education) => (
                                <SelectItem key={education} value={education}>
                                  {education}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Birth Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="placeBirth" className="flex items-center text-sm font-medium text-gray-700">
                              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                              Place of Birth *
                            </Label>
                            <Input
                              id="placeBirth"
                              type="text"
                              placeholder="e.g., Jakarta"
                              value={personalInfoForm.placeBirth}
                              onChange={handlePersonalInfoFormChange}
                              className="h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="dateBirth" className="flex items-center text-sm font-medium text-gray-700">
                              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                              Date of Birth *
                            </Label>
                            <Input
                              id="dateBirth"
                              type="date"
                              value={personalInfoForm.dateBirth}
                              onChange={handlePersonalInfoFormChange}
                              className="h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            />
                          </div>
                        </div>

                        {/* Error Message */}
                        {personalInfoError && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                            <div className="flex items-center">
                              <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                              <p className="text-sm font-medium text-red-700">{personalInfoError}</p>
                            </div>
                          </div>
                        )}

                        {/* Success Message */}
                        {personalInfoSuccess && (
                          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                            <div className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                              <p className="text-sm font-medium text-green-700">{personalInfoSuccess}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <DialogFooter className="pt-6 mt-6 border-t border-gray-200">
                      <div className="flex justify-end w-full space-x-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsEditPersonalInfoDialogOpen(false);
                            setPersonalInfoError(null);
                            setPersonalInfoSuccess(null);
                            setPersonalInfoForm({
                              mobileNumber: mobileNumber,
                              nik: nik,
                              lastEducation: lastEducation,
                              placeBirth: placeBirth,
                              dateBirth: dateBirth ? (typeof dateBirth === 'string' ? dateBirth.split('T')[0] : new Date(dateBirth).toISOString().split('T')[0]) : "",
                            });
                          }}
                          className="px-6 hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={handleSavePersonalInfo}
                          className="px-6 bg-[#247046] hover:bg-[#1F633D] text-white transition-colors"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <DetailItem
                  label="NIK" 
                  value={nik} 
                  icon={<CreditCard  className="w-5 h-5 text-[#1C3D5A]" />}
                />
                <DetailItem
                  label="Mobile Number" 
                  value={mobileNumber} 
                  icon={<Phone className="w-5 h-5 text-[#1C3D5A]" />}
                  isEmpty={!mobileNumber}
                />
                <DetailItem
                  label="Gender" 
                  value={gender} 
                  icon={<User  className="w-5 h-5 text-[#1C3D5A]" />}
                />
                <DetailItem
                  label="Last Education" 
                  value={lastEducation} 
                  icon={<GraduationCap  className="w-5 h-5 text-[#1C3D5A]" />}
                  isEmpty={!lastEducation}
                />
                <DetailItem
                  label="Place of Birth" 
                  value={placeBirth} 
                  icon={<MapPin  className="w-5 h-5 text-[#1C3D5A]" />}
                  isEmpty={!placeBirth}
                />
                <DetailItem 
                  label="Date of Birth" 
                  value={formattedDateBirth} 
                  icon={<Calendar className="w-5 h-5 text-[#1C3D5A]" />}
                  isEmpty={!dateBirth}
                />
                <DetailItem 
                  label="Role" 
                  value={role} 
                  icon={<Briefcase  className="w-5 h-5 text-[#1C3D5A]" />}
                />
                <DetailItem 
                  label="Branch" 
                  value={branch} 
                  icon={<FileText className="w-5 h-5 text-[#1C3D5A]" />}
                />
                <DetailItem 
                  label="Contract Type" 
                  value={contractType} 
                  icon={<FileText className="w-5 h-5 text-[#1C3D5A]" />}
                />
                <DetailItem 
                  label="SP Type" 
                  value={spType} 
                  icon={<Briefcase className="w-5 h-5 text-[#1C3D5A]" />}
                />
                <DetailItem 
                  label="Shift Type" 
                  value={shiftType} 
                  icon={<Clock className="w-5 h-5 text-[#1C3D5A]" />}
                />
                <DetailItem 
                  label="Company Username" 
                  value={companyUsername} 
                  icon={<Building className="w-5 h-5 text-[#1C3D5A]" />}
                />
                <DetailItem 
                  label="Password" 
                  value={<PasswordDisplay password={currentPassword} />} 
                  icon={<Lock className="w-5 h-5 text-[#1C3D5A]" />}
                />
              </div>
            </CardContent>
          </Card>

          {/* Bank Information Card */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
                <DollarSign className="w-6 h-6 text-green-600" />
                <span>Bank Information</span>
              </CardTitle>
              <Dialog open={isEditBankInfoDialogOpen} onOpenChange={setIsEditBankInfoDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center space-x-2 "
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Bank Info</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden">
                    <DialogHeader className="space-y-3 pb-6">
                      <DialogTitle className="text-xl font-semibold text-gray-900">
                        Edit Bank Information
                      </DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Update your Bank information. All fields marked with * are required.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="overflow-y-auto max-h-[60vh] pr-2">
                      <div className="space-y-6">

                        

                        {/* Bank */}
                        <div className="space-y-2 ">
                          <Label htmlFor="bank" className="flex items-center text-sm font-medium text-gray-700">
                            <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                            Bank *
                          </Label>
                          <Select
                            value={bankInfoForm.bank}
                            onValueChange={(value) => handleBankInfoSelectChange(value, 'bank')}
                          >
                            <SelectTrigger className="w-full h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all">
                              <SelectValue placeholder="Select your highest education level" />
                            </SelectTrigger>
                            <SelectContent>
                              {bankOptions.map((bank) => (
                                <SelectItem key={bank} value={bank}>
                                  {bank}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Birth Information */}
                        <div className="space-y-2">
                            <Label htmlFor="accountName" className="flex items-center text-sm font-medium text-gray-700">
                              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                              Account Name *
                            </Label>
                            <Input
                              id="accountName"
                              type="text"
                              placeholder="e.g., Asep"
                              value={bankInfoForm.accountName}
                              onChange={handleBankInfoFormChange}
                              className="h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="accountNumber" className="flex items-center text-sm font-medium text-gray-700">
                              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                              Account Number *
                            </Label>
                            <Input
                              id="accountNumber"
                              type="text"
                              placeholder="e.g., Asep"
                              value={bankInfoForm.accountNumber}
                              onChange={handleBankInfoFormChange}
                              className="h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            />
                        </div>

                        {/* Error Message */}
                        {bankInfoError && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                            <div className="flex items-center">
                              <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                              <p className="text-sm font-medium text-red-700">{bankInfoError}</p>
                            </div>
                          </div>
                        )}

                        {/* Success Message */}
                        {bankInfoSuccess && (
                          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                            <div className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                              <p className="text-sm font-medium text-green-700">{bankInfoSuccess}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <DialogFooter className="pt-6 mt-6 border-t border-gray-200">
                      <div className="flex justify-end w-full space-x-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsEditBankInfoDialogOpen(false);
                            setBankInfoError(null);
                            setBankInfoSuccess(null);
                            setbankInfoForm({
                              bank: bank,
                              accountName: accountName,
                              accountNumber: accountNumber,
                            });
                          }}
                          className="px-6 hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={handleSaveBankInfo}
                          className="px-6 bg-[#247046] hover:bg-[#1F633D] text-white transition-colors"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <DetailItem 
                  label="Bank" 
                  value={bank} 
                  icon={<Building className="w-5 h-5" />}
                  isEmpty={!bank}
                />
                <DetailItem 
                  label="Account Number" 
                  value={accountNumber} 
                  icon={<CreditCard className="w-5 h-5" />}
                  isEmpty={!accountNumber}
                />
                <DetailItem 
                  label="Account Name" 
                  value={accountName} 
                  icon={<User className="w-5 h-5" />}
                  isEmpty={!accountName}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Demo data for testing
const DemoProfilePage = () => {
  const demoData = {
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    firstName: "John",
    lastName: "Doe",
    mobileNumber: "",
    nik: "1234567890123456",
    gender: "Male",
    lastEducation: "Bachelor's Degree",
    placeBirth: "New York",
    dateBirth: new Date("1990-01-15"),
    role: "Senior Developer",
    branch: "Tech Division",
    contractType: "Full-time",
    bank: "Bank of America",
    accountNumber: "1234567890",
    accountName: "",
    spType: "Permanent",
    companyUsername: "john.doe@techcorp.com",
    shiftType: "Shift 1",
    password: "password123"
  };

  return <ProfilePage {...demoData} />;
};

export default DemoProfilePage ; //ProfilePage;