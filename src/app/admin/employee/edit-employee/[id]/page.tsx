// app/admin/employee/edit-employee/[id]/page.tsx
"use client";
import { usePageTitle } from "@/context/PageTitleContext";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AddEmployeeForm from "@/components/AddEmployeeForm";

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [employeeData, setEmployeeData] = useState<any>(null);
  const { setTitle } = usePageTitle();
  setTitle("Edit Employee");
  
  useEffect(() => {
    if (id) {
      const storedData = localStorage.getItem("employees");
      if (storedData) {
        const allEmployees = JSON.parse(storedData);
        const employee = allEmployees.find((emp: any) => emp.idEmployee === id);
        if (employee) setEmployeeData(employee);
        else alert("Employee not found");
      }
    }
  }, [id]);

  if (!id || !employeeData) return <div className="p-4">Loading...</div>;

  return <AddEmployeeForm initialData={employeeData} mode="edit" />;
}