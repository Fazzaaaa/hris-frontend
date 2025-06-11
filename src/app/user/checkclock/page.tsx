// app/employee/checkclock/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/context/PageTitleContext";
import { FaPlus } from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";

interface CheckclockRecord {
  id: number;
  date: string; // Format: YYYY-MM-DD
  clockIn: string;
  clockOut: string;
  workHours: string;
  status: "On Time" | "Late" | "Annual Leave" | "Absent" | "Sick Leave";
}

// Data simulasi (ditambahkan lebih banyak untuk pengujian filter bulan/tahun)
const mockRecords: CheckclockRecord[] = [
  {
    id: 1,
    date: "2025-03-01",
    clockIn: "08:00",
    clockOut: "16:30",
    workHours: "08h 30m",
    status: "On Time",
  },
  {
    id: 2,
    date: "2025-03-02",
    clockIn: "08:00",
    clockOut: "17:15",
    workHours: "09h 15m",
    status: "On Time",
  },
  {
    id: 3,
    date: "2025-03-03",
    clockIn: "09:00",
    clockOut: "16:45",
    workHours: "07h 45m",
    status: "On Time",
  },
  {
    id: 4,
    date: "2025-03-04",
    clockIn: "09:15",
    clockOut: "15:30",
    workHours: "06h 15m",
    status: "Late",
  },
  {
    id: 5,
    date: "2025-03-05",
    clockIn: "—",
    clockOut: "—",
    workHours: "0",
    status: "Annual Leave",
  },
  {
    id: 6,
    date: "2025-03-06",
    clockIn: "—",
    clockOut: "—",
    workHours: "0",
    status: "Absent",
  },
  {
    id: 7,
    date: "2025-03-07",
    clockIn: "08:15",
    clockOut: "17:00",
    workHours: "08h 45m",
    status: "On Time",
  },
  {
    id: 8,
    date: "2025-03-08",
    clockIn: "—",
    clockOut: "—",
    workHours: "0",
    status: "Sick Leave",
  },
  {
    id: 9,
    date: "2025-03-09",
    clockIn: "08:00",
    clockOut: "16:00",
    workHours: "08h 00m",
    status: "On Time",
  },
  {
    id: 10,
    date: "2025-03-10",
    clockIn: "08:30",
    clockOut: "16:00",
    workHours: "07h 30m",
    status: "Late",
  },
  {
    id: 11,
    date: "2025-03-11",
    clockIn: "08:00",
    clockOut: "16:00",
    workHours: "08h 00m",
    status: "On Time",
  },
  {
    id: 12,
    date: "2025-03-12",
    clockIn: "08:00",
    clockOut: "16:30",
    workHours: "08h 30m",
    status: "On Time",
  },
  // Tambahan data untuk bulan lain
  {
    id: 13,
    date: "2025-04-01",
    clockIn: "08:00",
    clockOut: "16:30",
    workHours: "08h 30m",
    status: "On Time",
  },
  {
    id: 14,
    date: "2025-04-02",
    clockIn: "09:00",
    clockOut: "17:00",
    workHours: "08h 00m",
    status: "Late",
  },
  {
    id: 15,
    date: "2025-05-01",
    clockIn: "—",
    clockOut: "—",
    workHours: "0",
    status: "Annual Leave",
  },
  {
    id: 16,
    date: "2024-12-25",
    clockIn: "08:00",
    clockOut: "17:00",
    workHours: "09h 00m",
    status: "On Time",
  },
  {
    id: 17,
    date: "2024-11-10",
    clockIn: "09:30",
    clockOut: "17:30",
    workHours: "08h 00m",
    status: "Late",
  },
];

export default function CheckclockPage() {
  const { setTitle } = usePageTitle();
  setTitle("Checkclock"); // Menggunakan context untuk mengatur judul halaman
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [records] = useState<CheckclockRecord[]>(mockRecords); // Menggunakan mockRecords global

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --- State untuk Filter ---
  const [filterStatus, setFilterStatus] = useState<string>(""); // Default: ""
  const [filterMonth, setFilterMonth] = useState<string>(""); // Default: ""
  const [filterYear, setFilterYear] = useState<string>(""); // Default: ""

  // Fungsi untuk mendapatkan variant badge Shadcn UI
  const getStatusBadgeClass = (status: CheckclockRecord["status"]) => {
    switch (status) {
      case "On Time":
        return "bg-green-500 text-white";
      case "Late":
        return "bg-red-500 text-white";
      case "Annual Leave":
      case "Absent":
      case "Sick Leave":
        return "bg-blue-500 text-white"; // Gunakan `bg-blue-500` dulu
      default:
        return "border border-gray-300 text-gray-700";
    }
  };

  // Logika Filter Data
  const filteredData = useMemo(() => {
    return records.filter((record) => {
      // 1. Filter berdasarkan Search Term (Date)
      const matchesSearch = record.date
        .toLowerCase()
        .includes(search.toLowerCase());

      // 2. Filter berdasarkan Status
      const matchesStatus = !filterStatus || record.status === filterStatus;

      // 3. Filter berdasarkan Bulan & Tahun
      const recordDate = new Date(record.date); // Membuat objek Date dari string 'YYYY-MM-DD'
      const recordMonth = recordDate.getMonth() + 1; // getMonth() is 0-indexed
      const recordYear = recordDate.getFullYear();

      const matchesMonth =
        !filterMonth || recordMonth === parseInt(filterMonth);
      const matchesYear = !filterYear || recordYear === parseInt(filterYear);

      return matchesSearch && matchesStatus && matchesMonth && matchesYear;
    });
  }, [search, records, filterStatus, filterMonth, filterYear]); // Tambahkan semua dependencies filter

  // Logika Pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentTableData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage, filteredData]);

  // Reset halaman ke 1 setiap kali filter berubah
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, filterMonth, filterYear, search]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handleAddData = () => {
    router.push("/user/checkclock/addCheckClock");
  };

  const handleViewDetails = (id: number) => {
    router.push(`/employee/checkclock/${id}`);
  };

  // Data untuk dropdown bulan dan tahun
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // Mendapatkan daftar tahun unik dari data records
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    records.forEach((record) => years.add(new Date(record.date).getFullYear()));
    const sortedYears = Array.from(years).sort((a, b) => b - a); // Urutkan dari terbaru ke terlama
    return sortedYears.map((year) => ({
      value: String(year),
      label: String(year),
    }));
  }, [records]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Header Section: Title, Search, Filter, Export, Add Data */}
      {/* Header + Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 flex-shrink-0">
          Checkclock Overview
        </h1>

        {/* Filter Section */}
        <div className="flex flex-wrap justify-end gap-2 items-center">
          {/* Status Filter */}
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="On Time">On Time</option>
            <option value="Late">Late</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Absent">Absent</option>
            <option value="Sick Leave">Sick Leave</option>
          </select>

          {/* Month Filter */}
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>

          {/* Year Filter */}
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <option value="">All Years</option>
            {availableYears.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => router.push("/user/checkclock/addCheckClock")}
            className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <FaPlus /> Add Data
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full table-auto text-sm divide-y divide-gray-200">
          <thead className="bg-[#1E3A5F] text-white">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Date</th>
              <th className="px-6 py-3 text-center font-medium">Clock In</th>
              <th className="px-6 py-3 text-center font-medium">Clock Out</th>
              <th className="px-6 py-3 text-center font-medium">Work Hours</th>
              <th className="px-6 py-3 text-center font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentTableData.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Tidak ada data checkclock ditemukan.
                </td>
              </tr>
            ) : (
              currentTableData.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                    {record.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900">
                    {record.clockIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900">
                    {record.clockOut}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900">
                    {record.workHours}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Badge
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-6 space-y-4 md:space-y-0 text-sm text-gray-700">
        {/* Left: Items per page */}
        <div className="flex items-center space-x-2">
          <span>Showing</span>
          <Select
            onValueChange={handleItemsPerPageChange}
            value={String(itemsPerPage)}
          >
            <SelectTrigger className="w-[80px] h-9">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span>
            to {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
            {totalItems} records
          </span>
        </div>

        {/* Right: Page Navigation */}
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-9 w-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="icon"
              onClick={() => handlePageChange(i + 1)}
              className="h-9 w-9"
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="h-9 w-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
