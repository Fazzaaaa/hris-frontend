// // src/app/admin/employee/edit-Employee/page.tsx
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { Employee } from "@/admin./dashboard/EmployeeTable"; // Import Employee type
// import { Button, Input } from "@/components/ui"; // Import UI components

// const EditEmployee = () => {
//   const router = useRouter();
//   const { id } = router.query; // Get employee ID from query
//   const [employee, setEmployee] = useState<Employee | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEmployee = async () => {
//       if (id) {
//         const response = await fetch(`/api/employees/${id}`);
//         const data = await response.json();
//         setEmployee(data);
//         setLoading(false);
//       }
//     };

//     fetchEmployee();
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (employee) {
//       setEmployee({ ...employee, [name]: value });
//     }
//   };

//   const handleSave = async () => {
//     if (employee) {
//       await fetch(`/api/employees/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(employee),
//       });
//       router.push("/admin/employee"); // Redirect back to employee list
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Edit Employee</h1>
//       <Input
//         name="firstName"
//         value={employee.firstName}
//         onChange={handleChange}
//         placeholder="First Name"
//       />
//       <Input
//         name="lastName"
//         value={employee.lastName}
//         onChange={handleChange}
//         placeholder="Last Name"
//       />
//       <Input
//         name="mobileNumber"
//         value={employee.mobileNumber}
//         onChange={handleChange}
//         placeholder="Mobile Number"
//       />
//       <Input
//         name="nik"
//         value={employee.nik}
//         onChange={handleChange}
//         placeholder="NIK"
//       />
//       <Input
//         name="gender"
//         value={employee.gender}
//         onChange={handleChange}
//         placeholder="Gender"
//       />
//       <Input
//         name="lastEducation"
//         value={employee.lastEducation}
//         onChange={handleChange}
//         placeholder="Last Education"
//       />
//       <Input
//         name="placeBirth"
//         value={employee.placeBirth}
//         onChange={handleChange}
//         placeholder="Place of Birth"
//       />
//       <Input
//         name="dateBirth"
//         type="date"
//         value={employee.dateBirth ? employee.dateBirth.toISOString().split('T')[0] : ''}
//         onChange={handleChange}
//         placeholder="Date of Birth"
//       />
//       <Input
//         name="role"
//         value={employee.role}
//         onChange={handleChange}
//         placeholder="Role"
//       />
//       <Input
//         name="branch"
//         value={employee.branch}
//         onChange={handleChange}
//         placeholder="Branch"
//       />
//       <Input
//         name="grade"
//         value={employee.grade}
//         onChange={handleChange}
//         placeholder="Grade"
//       />
//       <Input
//         name="contractType"
//         value={employee.contractType}
//         onChange={handleChange}
//         placeholder="Contract Type"
//       />
//       <Input
//         name="bank"
//         value={employee.bank}
//         onChange={handleChange}
//         placeholder="Bank"
//       />
//       <Input
//         name="accountNumber"
//         value={employee.accountNumber}
//         onChange={handleChange}
//         placeholder="Account Number"
//       />
//       <Input
//         name="accountName"
//         value={employee.accountName}
//         onChange={handleChange}
//         placeholder="Account Name"
//       />
//       <Button onClick={handleSave}>Save</Button>
//     </div>
//   );
// };

// export default EditEmployee;
