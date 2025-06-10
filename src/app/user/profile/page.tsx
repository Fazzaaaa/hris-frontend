// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Eye, EyeOff } from "lucide-react"; // Import Eye dan EyeOff icons

// interface ProfilePageProps {
//   avatar: string;
//   firstName: string;
//   lastName: string;
//   mobileNumber: string;
//   nik: string;
//   gender: string;
//   lastEducation: string;
//   placeBirth: string;
//   dateBirth: Date | string | null;
//   role: string;
//   branch: string;
//   contractType: string;
//   bank: string;
//   accountNumber: string;
//   accountName: string;
//   spType: string;
//   companyUsername: string;
// }

// // Komponen helper untuk menampilkan satu baris detail
// const DetailItem: React.FC<{ label: string; value: string | React.ReactNode }> = ({ label, value }) => (
//   <div className="flex flex-col">
//     <span className="text-sm font-medium text-gray-500">{label}</span>
//     <span className="text-base text-gray-800 break-words">{value || '-'}</span>
//   </div>
// );

// // --- NEW COMPONENT: PasswordInputWithToggle ---
// interface PasswordInputWithToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   id: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   className?: string; // Optional className from parent
// }

// const PasswordInputWithToggle: React.FC<PasswordInputWithToggleProps> = ({ id, value, onChange, className, ...props }) => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="relative w-full">
//       <Input
//         id={id}
//         type={showPassword ? "text" : "password"}
//         value={value}
//         onChange={onChange}
//         className={className} // Pass parent's className
//         {...props} // Pass any other props (e.g., required)
//       />
//       <Button
//         type="button"
//         variant="ghost"
//         size="sm"
//         className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" // Adjust padding
//         onClick={() => setShowPassword((prev) => !prev)}
//       >
//         {showPassword ? (
//           <EyeOff className="h-4 w-4 text-gray-500" />
//         ) : (
//           <Eye className="h-4 w-4 text-gray-500" />
//         )}
//         <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
//       </Button>
//     </div>
//   );
// };
// // --- END NEW COMPONENT ---

// const ProfilePage: React.FC<ProfilePageProps> = ({
//   avatar,
//   firstName,
//   lastName,
//   mobileNumber,
//   nik,
//   gender,
//   lastEducation,
//   placeBirth,
//   dateBirth,
//   role,
//   branch,
//   contractType,
//   bank,
//   accountNumber,
//   accountName,
//   spType,
//   companyUsername,
// }) => {
//   const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
//   const [passwordForm, setPasswordForm] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmNewPassword: "",
//   });
//   const [passwordError, setPasswordError] = useState<string | null>(null);
//   const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

//   const formattedDateBirth = dateBirth
//     ? new Date(dateBirth).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       })
//     : '-';

//   const initials = `${firstName ? firstName.charAt(0) : ''}${lastName ? lastName.charAt(0) : ''}`;

//   const handlePasswordFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setPasswordForm((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//     setPasswordError(null);
//     setPasswordSuccess(null);
//   };

//   const handleChangePassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setPasswordError(null);
//     setPasswordSuccess(null);

//     const { oldPassword, newPassword, confirmNewPassword } = passwordForm;

//     if (!oldPassword || !newPassword || !confirmNewPassword) {
//       setPasswordError("All password fields are required.");
//       return;
//     }

//     if (newPassword.length < 6) {
//       setPasswordError("New password must be at least 6 characters long.");
//       return;
//     }

//     if (newPassword !== confirmNewPassword) {
//       setPasswordError("New password and confirm new password do not match.");
//       return;
//     }

//     // --- Simulasi Pengiriman ke API ---
//     try {
//         await new Promise(resolve => setTimeout(resolve, 1000));

//         if (oldPassword === "wrong_password") { // Ganti dengan logika validasi password lama yang sebenarnya
//             setPasswordError("Incorrect old password.");
//             return;
//         }

//         setPasswordSuccess("Password changed successfully!");
//         setPasswordForm({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
//         // setTimeout(() => setIsChangePasswordDialogOpen(false), 2000);

//     } catch (error) {
//         console.error("Error changing password:", error);
//         setPasswordError("An unexpected error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className=" bg-white rounded-2xl p-6 md:p-8 space-y-6 max-w-4xl mx-auto animate-fadeIn">
//       <h2 className="text-xl font-semibold">Employees Profile</h2>
//       <Card className="shadow-lg transform transition-transform duration-300 hover:scale-[1.01] rounded-lg overflow-hidden">
//         <CardContent className="flex flex-col md:flex-row items-center md:items-start p-6 space-y-4 md:space-y-0 md:space-x-6">
//           <div className="relative group">
//             <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-gray-100 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
//               <AvatarImage src={avatar} alt={`${firstName} ${lastName}'s Avatar`} className="object-cover" />
//               <AvatarFallback className="bg-blue-500 text-white text-3xl md:text-4xl font-bold">
//                 {initials}
//               </AvatarFallback>
//             </Avatar>
//             <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
//               <span className="text-white text-sm">Change</span>
//             </div>
//           </div>
//           <div className="flex-1 text-center md:text-left space-y-1 mt-4 md:mt-0">
//             <h2 className="text-3xl font-bold text-gray-800">{firstName} {lastName}</h2>
//             <p className="text-lg text-blue-600 font-semibold">{role}</p>
//             <p className="text-md text-gray-600">Branch: <span className="font-medium">{branch}</span></p>
//             <p className="text-md text-gray-600">Company: <span className="font-medium">{companyUsername}</span></p>
//           </div>
//           <div className="flex flex-col gap-2 self-center md:self-start">
            
//             <Dialog open={isChangePasswordDialogOpen} onOpenChange={setIsChangePasswordDialogOpen}>
//               <DialogTrigger asChild>
//                 <Button variant="outline" className="text-black hover:bg-blue-50 transition-colors duration-200">
//                   Change Password
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>Change Password</DialogTitle>
//                   <DialogDescription>
//                     Enter your old password and new password here. Click save when you're done.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <form onSubmit={handleChangePassword} className="grid gap-4 py-4">
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="oldPassword" className="text-right">
//                       Old Password
//                     </Label>
//                     <div className="col-span-3"> {/* Wrapper div for PasswordInputWithToggle */}
//                       <PasswordInputWithToggle
//                         id="oldPassword"
//                         value={passwordForm.oldPassword}
//                         onChange={handlePasswordFormChange}
//                         className={`focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${passwordError && passwordError.includes("old password") ? 'border-red-500' : ''}`}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="newPassword" className="text-right">
//                       New Password
//                     </Label>
//                     <div className="col-span-3"> {/* Wrapper div for PasswordInputWithToggle */}
//                       <PasswordInputWithToggle
//                         id="newPassword"
//                         value={passwordForm.newPassword}
//                         onChange={handlePasswordFormChange}
//                         className={`focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${passwordError && (passwordError.includes("New password must") || passwordError.includes("match")) ? 'border-red-500' : ''}`}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="confirmNewPassword" className="text-right">
//                       Confirm New Password
//                     </Label>
//                     <div className="col-span-3"> {/* Wrapper div for PasswordInputWithToggle */}
//                       <PasswordInputWithToggle
//                         id="confirmNewPassword"
//                         value={passwordForm.confirmNewPassword}
//                         onChange={handlePasswordFormChange}
//                         className={`focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${passwordError && passwordError.includes("match") ? 'border-red-500' : ''}`}
//                         required
//                       />
//                     </div>
//                   </div>

//                   {passwordError && (
//                     <p className="text-red-500 text-sm text-center -mt-2 animate-fadeIn">
//                       {passwordError}
//                     </p>
//                   )}
//                   {passwordSuccess && (
//                     <p className="text-green-500 text-sm text-center -mt-2 animate-fadeIn">
//                       {passwordSuccess}
//                     </p>
//                   )}

//                   <DialogFooter className="mt-4">
//                     <Button type="button" variant="outline" onClick={() => {
//                       setIsChangePasswordDialogOpen(false);
//                       setPasswordError(null); // Clear errors when closing dialog
//                       setPasswordSuccess(null); // Clear success when closing dialog
//                       setPasswordForm({ oldPassword: "", newPassword: "", confirmNewPassword: "" }); // Reset form
//                     }}>Cancel</Button>
//                     <Button type="submit">Save changes</Button>
//                   </DialogFooter>
//                 </form>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Card untuk Informasi Personal */}
//       <Card className="shadow-md animate-slideInUp rounded-lg">
//         <CardHeader className="flex flex-row items-center justify-between p-6 pb-4 border-b">
//           <CardTitle className="text-xl font-semibold text-gray-800">Personal Information</CardTitle>
//           {/* <Button variant="ghost" className="text-blue-600 hover:bg-blue-50 transition-colors duration-200">
//             Edit
//           </Button> */}
//         </CardHeader>
//         <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
//           <DetailItem label="Mobile Number" value={mobileNumber} />
//           <DetailItem label="NIK" value={nik} />
//           <DetailItem label="Gender" value={gender} />
//           <DetailItem label="Last Education" value={lastEducation} />
//           <DetailItem label="Place of Birth" value={placeBirth} />
//           <DetailItem label="Date of Birth" value={formattedDateBirth} />
//           <DetailItem label="Contract Type" value={contractType} />
//           <DetailItem label="SP Type" value={spType} />
//         </CardContent>
//       </Card>

//       {/* Card untuk Informasi Bank */}
//       <Card className="shadow-md animate-slideInUp delay-100 rounded-lg">
//         <CardHeader className="flex flex-row items-center justify-between p-6 pb-4 border-b">
//           <CardTitle className="text-xl font-semibold text-gray-800">Bank Information</CardTitle>
//           {/* <Button variant="ghost" className="text-blue-600 hover:bg-blue-50 transition-colors duration-200">
//             Edit
//           </Button> */}
//         </CardHeader>
//         <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
//           <DetailItem label="Bank" value={bank} />
//           <DetailItem label="Account Number" value={accountNumber} />
//           <DetailItem label="Account Name" value={accountName} />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ProfilePage;