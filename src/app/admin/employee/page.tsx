// components/dashboard/EmployeeTable.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import Pagination from "@/components/ui/pagination";
import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/context/PageTitleContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { deleteEmployee } from "@/lib/utils/employeeActions";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { format } from "date-fns";

interface Employee {
  no: number;
  avatar: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  nik: string;
  gender: string;
  lastEducation: string;
  placeBirth: string;
  dateBirth: Date | null;
  role: string;
  branch: string;
  // grade: string;
  contractType: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  spType: string;
  companyUsername: string;
  password: string;
  shiftType: string; 
}
// Contoh data karyawan (mock data)
const mockEmployees: Employee[] = [
  {
    no: 1,
    avatar: "",
    firstName: "Juanita",
    lastName: "Smith",
    mobileNumber: "08111111111",
    nik: "3201011234567890",
    gender: "Perempuan",
    lastEducation: "S1",
    placeBirth: "Bandung",
    dateBirth: new Date("1990-05-15"),
    role: "CEO",
    branch: "Bekasi",
    // grade: "A1",
    contractType: "fixed",
    bank: "BCA",
    accountNumber: "1234567890",
    accountName: "Juanita Smith",
    spType: "SP1",
    companyUsername: "EMP001",
    password: "password123",
    shiftType:"",
  },
  {
    no: 2,
    avatar: "",
    firstName: "Broni",
    lastName: "Smith",
    mobileNumber: "08111111111",
    nik: "3201011234567890",
    gender: "Laki Laki",
    lastEducation: "S1",
    placeBirth: "Bandung",
    dateBirth: new Date("1990-05-15"),
    role: "CEO",
    branch: "Bekasi",
    // grade: "A1",
    contractType: "fixed",
    bank: "BCA",
    accountNumber: "1234567890",
    accountName: "Juanita Smith",
    spType: "SP1",
    companyUsername: "EMP002",
    password: "password123",
    shiftType: "",
  },
];

type SortDirection = "asc" | "desc" | null;
type SortColumn = keyof Employee | null;

export default function EmployeeTable() {
  const router = useRouter();
  const { setTitle } = usePageTitle();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const itemsPerPage = 10;
  const [selectedPeriod, setSelectedPeriod] = useState("November, 2025");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  // State baru untuk filter
  const [filterGender, setFilterGender] = useState<string | null>(null);
  const [filterBranch, setFilterBranch] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState<string | null>(null);

  const goToAddEmployeePage = () => {
    router.push("/admin/employee/add-Employee");
  };
  const goToEditEmployeePage = () => {
    router.push("/admin/employee/edit-employee?id=${employee.companyUsername}");
  };

  const goToEmployeeDetails = (employeeNo: number) => {
    const foundEmployee = employees.find((emp) => emp.no === employeeNo);
    setSelectedEmployee(foundEmployee || null);
    setIsSheetOpen(true);
  };

  const periods = [
    "November, 2025",
    "October, 2025",
    "September, 2025",
    "August, 2025",
    "July, 2025",
    "June, 2025",
    "May, 2025",
    "April, 2025",
    "March, 2025",
    "February, 2025",
    "January, 2025",
  ];

  // Data mock untuk statistik (akan berubah sesuai periode)
  const [totalEmployee, setTotalEmployee] = useState(employees.length);
  const [totalNewHire, setTotalNewHire] = useState(20); // Contoh nilai, bisa disesuaikan
  const [fullTimeEmployee, setFullTimeEmployee] = useState(
    employees.filter((emp) => emp.contractType === "fixed").length
  );

  // Efek samping untuk memperbarui statistik ketika `employees` berubah
  useEffect(() => {
    const stored = localStorage.getItem("employees");
    if (stored) {
      setEmployees(JSON.parse(stored));
    } else {
      localStorage.setItem("employees", JSON.stringify(mockEmployees));
      setEmployees(mockEmployees);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));

    setTotalEmployee(employees.length);
    setFullTimeEmployee(
      employees.filter((emp) => emp.contractType === "fixed").length
    );

    // Logika untuk totalNewHire bisa lebih kompleks, tergantung definisi "new hire"
  }, [employees]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSort = (column: keyof Employee) => {
    if (sortColumn === column) {
      setSortDirection(
        sortDirection === "asc"
          ? "desc"
          : sortDirection === "desc"
          ? null
          : "asc"
      );
      if (sortDirection === "desc") {
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleStatusChange = (employeeNo: number, newStatus: boolean) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.no === employeeNo ? { ...emp, status: newStatus } : emp
      )
    );
    console.log(`Status for employee ${employeeNo} changed to ${newStatus}`);
  };

  const handleExportData = (formatType: "csv" | "json") => {
    let dataToExport = sortedAndFilteredEmployees;

    if (dataToExport.length === 0) {
      alert("No data to export.");
      return;
    }

    if (formatType === "csv") {
      const headers = Object.keys(dataToExport[0])
        .filter((key) => key !== "avatar")
        .join(",");
      const rows = dataToExport.map(
        (
          employee: Employee // Explicitly type employee
        ) =>
          Object.entries(employee)
            .filter(([key]) => key !== "avatar")
            .map(([key, value]) => {
              if (typeof value === "boolean") {
                return value ? "true" : "false";
              }
              if (value instanceof Date) {
                return format(value, "yyyy-MM-dd");
              }
              if (
                typeof value === "string" &&
                (value.includes(",") || value.includes('"'))
              ) {
                return `"${value.replace(/"/g, '""')}"`; // Corrected escaping
              }
              return String(value);
            })
            .join(",")
      );
      const csvContent = [headers, ...rows].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "employees.csv");
      link.click();
      URL.revokeObjectURL(url);
      console.log("Exporting as CSV...");
    } else if (formatType === "json") {
      const jsonContent = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([jsonContent], {
        type: "application/json;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "employees.json");
      link.click();
      URL.revokeObjectURL(url);
      console.log("Exporting as JSON...");
    }
  };

  const triggerImport = () => {
    fileInputRef.current?.click();
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let importedData: Employee[] = [];

        if (file.type === "application/json") {
          const parsedData = JSON.parse(content);
          if (
            !Array.isArray(parsedData) ||
            !parsedData.every(
              (item) => "no" in item && "firstName" in item && "status" in item
            )
          ) {
            alert(
              "Invalid JSON format. Please ensure it contains an array of employee objects with required fields."
            );
            return;
          }
          importedData = parsedData.map((emp: any) => ({
            // Use any for parsing, then cast
            ...emp,
            status:
              typeof emp.status === "string"
                ? emp.status.toLowerCase() === "true"
                : emp.status,
            dateBirth: emp.dateBirth ? new Date(emp.dateBirth) : null,
          }));
        } else if (file.type === "text/csv") {
          const lines = content
            .split("\n")
            .filter((line) => line.trim() !== "");
          if (lines.length === 0) {
            alert("CSV file is empty.");
            return;
          }
          const headers = lines[0].split(",").map((h) => h.trim());
          importedData = lines.slice(1).map((line) => {
            const values = line.split(",");
            const employee: Partial<Employee> = {};
            headers.forEach((header, index) => {
              const key = header as keyof Employee;
              let value: string | number | boolean | Date | null =
                values[index]?.trim() || "";

              if (key === "no") {
                (employee as any)[key] = parseInt(value as string, 10);
                // } else if (key === 'status') {
                //   (employee as any)[key] = (value as string).toLowerCase() === 'true';
              } else if (key === "dateBirth") {
                (employee as any)[key] = value
                  ? new Date(value as string)
                  : null;
              } else {
                (employee as any)[key] = value;
              }
            });
            // Pastikan semua properti yang dibutuhkan ada, berikan nilai default jika kosong
            return {
              no: employee.no || 0,
              avatar: employee.avatar || "/avatars/default.png",
              firstName: employee.firstName || "",
              lastName: employee.lastName || "",
              mobileNumber: employee.mobileNumber || "",
              nik: employee.nik || "",
              gender: employee.gender || "",
              lastEducation: employee.lastEducation || "",
              placeBirth: employee.placeBirth || "",
              dateBirth: employee.dateBirth || null,
              role: employee.role || "",
              branch: employee.branch || "",
              // grade: employee.grade || '',
              contractType: employee.contractType || "",
              bank: employee.bank || "",
              accountNumber: employee.accountNumber || "",
              accountName: employee.accountName || "",
              spType: employee.spType || "",
              companyUsername:
                employee.companyUsername || `EMP${employee.no || Date.now()}`,
              // status: employee.status !== undefined ? employee.status : true,
            } as Employee;
          });
          if (
            importedData.length === 0 ||
            !importedData.every(
              (item) => "no" in item && "firstName" in item && "status" in item
            )
          ) {
            alert(
              "Invalid CSV format. Please ensure it has correct headers and data."
            );
            return;
          }
        } else {
          alert("Unsupported file type. Please upload a CSV or JSON file.");
          return;
        }

        setEmployees(importedData);
        setCurrentPage(1);
        console.log("Imported data:", importedData);
        alert("Data imported successfully!");
      } catch (error) {
        console.error("Error parsing file:", error);
        alert("Failed to parse file. Please check file format and content.");
      }
    };

    if (file.type === "application/json" || file.type === "text/csv") {
      reader.readAsText(file);
    } else {
      alert("Unsupported file type. Please upload a CSV or JSON file.");
    }
    event.target.value = "";
  };

  const sortedAndFilteredEmployees = useMemo(() => {
    let currentEmployees = [...employees];

    // Filter berdasarkan search term
    if (searchTerm) {
      currentEmployees = currentEmployees.filter(
        (employee) =>
          `${employee.firstName} ${employee.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          String(employee.companyUsername)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          String(employee.gender)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          String(employee.branch)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          String(employee.role)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          String(employee.mobileNumber)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Filter berdasarkan Gender
    if (filterGender) {
      currentEmployees = currentEmployees.filter(
        (employee) =>
          employee.gender.toLowerCase() === filterGender.toLowerCase()
      );
    }

    // Filter berdasarkan Branch
    if (filterBranch) {
      currentEmployees = currentEmployees.filter(
        (employee) =>
          employee.branch.toLowerCase() === filterBranch.toLowerCase()
      );
    }

    // Filter berdasarkan Role
    if (filterRole) {
      currentEmployees = currentEmployees.filter(
        (employee) => employee.role.toLowerCase() === filterRole.toLowerCase()
      );
    }

    // Sortir data
    if (sortColumn && sortDirection) {
      currentEmployees.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }
        if (typeof aValue === "boolean" && typeof bValue === "boolean") {
          if (sortDirection === "asc") {
            return aValue === bValue ? 0 : aValue ? 1 : -1;
          } else {
            return aValue === bValue ? 0 : aValue ? -1 : 1;
          }
        }
        if (aValue instanceof Date && bValue instanceof Date) {
          return sortDirection === "asc"
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime();
        }
        return 0;
      });
    }

    return currentEmployees;
  }, [
    searchTerm,
    sortColumn,
    sortDirection,
    employees,
    filterGender,
    filterBranch,
    filterRole,
  ]); // Tambahkan filter state ke dependencies

  const totalPages = Math.ceil(
    sortedAndFilteredEmployees.length / itemsPerPage
  );
  const currentEmployeesPaginated = sortedAndFilteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderSortIndicator = (column: keyof Employee) => {
    if (sortColumn === column) {
      return sortDirection === "asc" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1 inline"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1 inline"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      );
    }
    return null;
  };

  // Dapatkan nilai unik untuk filter
  const uniqueGenders = useMemo(() => {
    const genders = employees.map((emp) => emp.gender);
    return Array.from(new Set(genders));
  }, [employees]);

  const uniqueBranches = useMemo(() => {
    const branches = employees.map((emp) => emp.branch);
    return Array.from(new Set(branches));
  }, [employees]);

  const uniqueRoles = useMemo(() => {
    const roles = employees.map((emp) => emp.role);
    return Array.from(new Set(roles));
  }, [employees]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Bagian Periode dan Statistik */}
      <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-start space-x-8 shadow-sm">
        {/* Kolom Periode */}
        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-500 mb-1">Periode</span>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[200px] text-lg font-bold">
              <SelectValue placeholder="Pilih Periode" />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period} value={period}>
                  {period}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Separator */}
        <div className="border-l border-gray-300 h-12"></div>

        {/* Kolom Total Employee */}
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 mb-1">Total Employee</span>
          <span className="text-2xl font-bold">{totalEmployee}</span>
        </div>
      </div>
      {/* Akhir Bagian Periode dan Statistik */}

      {/* Bagian Kontrol Tabel (Search, Filter, Export, Import, Add) */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">All Employees Information</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search Employee"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM4 12a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zM4 20a1 1 0 011-1h10a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z"
                  ></path>
                </svg>
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={() => {
                  setFilterGender(null);
                  setFilterBranch(null);
                  setFilterRole(null);
                }}
              >
                Reset to Default
              </DropdownMenuItem>
              <hr className="my-1 border-t border-gray-200" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    By Gender
                  </DropdownMenuItem>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {uniqueGenders.map((gender) => (
                    <DropdownMenuItem
                      key={gender}
                      onClick={() => setFilterGender(gender)}
                    >
                      {gender}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    By Branch
                  </DropdownMenuItem>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {uniqueBranches.map((branch) => (
                    <DropdownMenuItem
                      key={branch}
                      onClick={() => setFilterBranch(branch)}
                    >
                      {branch}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    By Role
                  </DropdownMenuItem>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {uniqueRoles.map((role) => (
                    <DropdownMenuItem
                      key={role}
                      onClick={() => setFilterRole(role)}
                    >
                      {role}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10V6m0 4l-2 2m2-2l2 2m9-4v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h5l2-2h4l2 2h2a2 2 0 012 2z"
                  ></path>
                </svg>
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExportData("csv")}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportData("json")}>
                Export as JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportData}
            className="hidden"
            accept=".csv,.json"
          />
          <Button variant="outline" onClick={triggerImport}>
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
            Import
          </Button>
          <Button onClick={goToAddEmployeePage} className="bg-[#2D8DFE] text-white">
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Add Employee
          </Button>
        </div>
      </div>

      {/* Tabel Karyawan */}
      <Table>
        <TableHeader >
          <TableRow className="bg-[#1E3A5F] hover:bg-[#1E3A5F]">
            <TableHead
              className="cursor-pointer text-white"
              onClick={() => handleSort("no")}
            >
              No. {renderSortIndicator("no")}
            </TableHead>
            <TableHead className="text-white" >Avatar</TableHead>
            <TableHead
              className="cursor-pointer text-white"
              onClick={() => handleSort("firstName")}
            >
              Name {renderSortIndicator("firstName")}
            </TableHead>
            <TableHead
              className="cursor-pointer text-white"
              onClick={() => handleSort("gender")}
            >
              Gender {renderSortIndicator("gender")}
            </TableHead>
            <TableHead
              className="cursor-pointer text-white"
              onClick={() => handleSort("mobileNumber")}
            >
              Mobile Number {renderSortIndicator("mobileNumber")}
            </TableHead>
            <TableHead
              className="cursor-pointer text-white"
              onClick={() => handleSort("branch")}
            >
              Branch {renderSortIndicator("branch")}
            </TableHead>
            <TableHead
              className="cursor-pointer text-white"
              onClick={() => handleSort("role")}
            >
              Role {renderSortIndicator("role")}
            </TableHead>
            <TableHead className="text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentEmployeesPaginated.map((employee) => (
            <TableRow key={employee.no}>
              <TableCell>{employee.no}</TableCell>
              <TableCell>
                <img
                  src={
                    employee.avatar.startsWith("/")
                      ? employee.avatar
                      : `/${employee.avatar}`
                  }
                  alt="Avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </TableCell>
              <TableCell>
                {employee.firstName} {employee.lastName}
              </TableCell>
              <TableCell>{employee.gender}</TableCell>
              <TableCell>{employee.mobileNumber}</TableCell>
              <TableCell>{employee.branch}</TableCell>
              <TableCell>{employee.role}</TableCell>
              {/* <TableCell>
                <Switch
                  checked={employee.status}
                  onCheckedChange={(newStatus) => handleStatusChange(employee.no, newStatus)}
                  className="data-[state=checked]:bg-[#2d8eff]"
                />
              </TableCell> */}
              <TableCell className="flex space-x-2">
                <Button
                  variant="default"
                  size="icon"
                  className="rounded-md bg-[#257047]"
                  onClick={() =>
                    router.push(
                      `/admin/employee/edit-employee/${employee.companyUsername}`
                    )
                  }
                >
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"
                    ></path>
                  </svg>
                </Button>
                <Button
                  variant="default"
                  size="icon"
                  className="rounded-md bg-[#ffab00]"
                  onClick={() => goToEmployeeDetails(employee.no)}
                >
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="default"
                      size="icon"
                      className="rounded-md bg-[#c11106]"
                    >
                      <svg
                        className="h-4 w-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus Karyawan?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Data karyawan <strong>{employee.firstName}</strong> akan
                        dihapus secara permanen dan tidak bisa dikembalikan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          const updated = deleteEmployee(
                            employee.companyUsername
                          );
                          setEmployees(updated);
                        }}
                      >
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Bagian Paginasi */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(
            currentPage * itemsPerPage,
            sortedAndFilteredEmployees.length
          )}{" "}
          out of {sortedAndFilteredEmployees.length} records
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Komponen Sheet untuk Detail Karyawan (Tampilan Lengkap) */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-[400px] sm:w-[540px] overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle>Employee Detail</SheetTitle>
            <SheetDescription>
              Contains detailed information about the employee.
            </SheetDescription>
          </SheetHeader>
          {selectedEmployee ? (
            <div className="p-4 space-y-6">
              {/* Avatar dan Nama Lengkap */}
              <div className="flex flex-col items-center space-y-4 mb-6">
                {selectedEmployee.avatar && (
                  <img
                    src={
                      selectedEmployee.avatar.startsWith("/")
                        ? selectedEmployee.avatar
                        : `/${selectedEmployee.avatar}`
                    }
                    alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}'s Avatar`}
                    className="h-24 w-24 rounded-full object-cover border-4 border-blue-200 shadow-lg"
                  />
                )}
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedEmployee.firstName} {selectedEmployee.lastName}
                </h2>
              </div>

              {/* Informasi Pribadi */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-500">First Name</p>
                    <p className="text-gray-900">
                      {selectedEmployee.firstName}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Last Name</p>
                    <p className="text-gray-900">{selectedEmployee.lastName}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Mobile Number</p>
                    <p className="text-gray-900">
                      {selectedEmployee.mobileNumber}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">NIK</p>
                    <p className="text-gray-900">{selectedEmployee.nik}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Gender</p>
                    <p className="text-gray-900">{selectedEmployee.gender}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">
                      Last Education
                    </p>
                    <p className="text-gray-900">
                      {selectedEmployee.lastEducation}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Place of Birth</p>
                    <p className="text-gray-900">
                      {selectedEmployee.placeBirth}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Date of Birth</p>
                    <p className="text-gray-900">
                      {selectedEmployee.dateBirth
                        ? format(selectedEmployee.dateBirth, "dd MMMM yyyy")
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">
                      Company Username
                    </p>
                    <p className="text-gray-900">
                      {selectedEmployee.companyUsername}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Password</p>
                    <p className="text-gray-900">{selectedEmployee.password}</p>
                  </div>
                </div>
              </div>

              {/* Informasi Pekerjaan */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">
                  Job Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-500">Role</p>
                    <p className="text-gray-900">{selectedEmployee.role}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Branch</p>
                    <p className="text-gray-900">{selectedEmployee.branch}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Contract Type</p>
                    <p className="text-gray-900">
                      {selectedEmployee.contractType}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">SP Type</p>
                    <p className="text-gray-900">{selectedEmployee.spType}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Shift Type</p>
                    <p className="text-gray-900">{selectedEmployee.shiftType}</p>
                  </div>
                </div>
              </div>

              {/* Informasi Bank */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">
                  Bank Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-500">Bank</p>
                    <p className="text-gray-900">{selectedEmployee.bank}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Account Number</p>
                    <p className="text-gray-900">
                      {selectedEmployee.accountNumber}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Account Name</p>
                    <p className="text-gray-900">
                      {selectedEmployee.accountName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-600">
              <p>Tidak ada data karyawan yang dipilih.</p>
            </div>
          )}
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setIsSheetOpen(false)}>Tutup</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
