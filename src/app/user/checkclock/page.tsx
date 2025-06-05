// app/employee/checkclock/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePageTitle } from '@/context/PageTitleContext';
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"; // Import Sheet components
import {
  Search,
  Filter,
  Plus,
  Download,
  ChevronLeft,
  ChevronRight,
  Clock,
  CalendarDays, // New icon for date filter
} from "lucide-react";

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
  { id: 1, date: '2025-03-01', clockIn: '08:00', clockOut: '16:30', workHours: '08h 30m', status: 'On Time' },
  { id: 2, date: '2025-03-02', clockIn: '08:00', clockOut: '17:15', workHours: '09h 15m', status: 'On Time' },
  { id: 3, date: '2025-03-03', clockIn: '09:00', clockOut: '16:45', workHours: '07h 45m', status: 'On Time' },
  { id: 4, date: '2025-03-04', clockIn: '09:15', clockOut: '15:30', workHours: '06h 15m', status: 'Late' },
  { id: 5, date: '2025-03-05', clockIn: '—', clockOut: '—', workHours: '0', status: 'Annual Leave' },
  { id: 6, date: '2025-03-06', clockIn: '—', clockOut: '—', workHours: '0', status: 'Absent' },
  { id: 7, date: '2025-03-07', clockIn: '08:15', clockOut: '17:00', workHours: '08h 45m', status: 'On Time' },
  { id: 8, date: '2025-03-08', clockIn: '—', clockOut: '—', workHours: '0', status: 'Sick Leave' },
  { id: 9, date: '2025-03-09', clockIn: '08:00', clockOut: '16:00', workHours: '08h 00m', status: 'On Time' },
  { id: 10, date: '2025-03-10', clockIn: '08:30', clockOut: '16:00', workHours: '07h 30m', status: 'Late' },
  { id: 11, date: '2025-03-11', clockIn: '08:00', clockOut: '16:00', workHours: '08h 00m', status: 'On Time' },
  { id: 12, date: '2025-03-12', clockIn: '08:00', clockOut: '16:30', workHours: '08h 30m', status: 'On Time' },
  // Tambahan data untuk bulan lain
  { id: 13, date: '2025-04-01', clockIn: '08:00', clockOut: '16:30', workHours: '08h 30m', status: 'On Time' },
  { id: 14, date: '2025-04-02', clockIn: '09:00', clockOut: '17:00', workHours: '08h 00m', status: 'Late' },
  { id: 15, date: '2025-05-01', clockIn: '—', clockOut: '—', workHours: '0', status: 'Annual Leave' },
  { id: 16, date: '2024-12-25', clockIn: '08:00', clockOut: '17:00', workHours: '09h 00m', status: 'On Time' },
  { id: 17, date: '2024-11-10', clockIn: '09:30', clockOut: '17:30', workHours: '08h 00m', status: 'Late' },
];


export default function CheckclockPage() {
    const { setTitle } = usePageTitle();
    setTitle('Checkclock'); // Menggunakan context untuk mengatur judul halaman
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [records] = useState<CheckclockRecord[]>(mockRecords); // Menggunakan mockRecords global

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --- State untuk Filter ---
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("All"); // Default: "All"
  const [filterMonth, setFilterMonth] = useState<string>("All"); // Default: "All" (number as string '1'-'12')
  const [filterYear, setFilterYear] = useState<string>("All"); // Default: "All"

  // Fungsi untuk mendapatkan variant badge Shadcn UI
  const getStatusBadgeVariant = (status: CheckclockRecord["status"]) => {
    switch (status) {
      case "On Time":
        return "default";
      case "Late":
        return "destructive";
      case "Annual Leave":
      case "Absent":
      case "Sick Leave":
        return "secondary";
      default:
        return "outline";
    }
  };

  // Logika Filter Data
  const filteredData = useMemo(() => {
    return records.filter((record) => {
      // 1. Filter berdasarkan Search Term (Date)
      const matchesSearch = record.date.toLowerCase().includes(search.toLowerCase());

      // 2. Filter berdasarkan Status
      const matchesStatus = filterStatus === "All" || record.status === filterStatus;

      // 3. Filter berdasarkan Bulan & Tahun
      const recordDate = new Date(record.date); // Membuat objek Date dari string 'YYYY-MM-DD'
      const recordMonth = recordDate.getMonth() + 1; // getMonth() is 0-indexed
      const recordYear = recordDate.getFullYear();

      const matchesMonth = filterMonth === "All" || recordMonth === parseInt(filterMonth);
      const matchesYear = filterYear === "All" || recordYear === parseInt(filterYear);

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

  const handleFilterClick = () => {
    setShowFilterSheet(true); // Buka Sheet filter
  };

  const handleResetFilters = () => {
    setFilterStatus("All");
    setFilterMonth("All");
    setFilterYear("All");
    setShowFilterSheet(false); // Tutup Sheet setelah reset
  };

  const handleApplyFilters = () => {
    setShowFilterSheet(false); // Tutup Sheet setelah apply
  };

  // Data untuk dropdown bulan dan tahun
  const months = [
    { value: "All", label: "All Months" },
    { value: "1", label: "January" }, { value: "2", label: "February" }, { value: "3", label: "March" },
    { value: "4", label: "April" }, { value: "5", label: "May" }, { value: "6", label: "June" },
    { value: "7", label: "July" }, { value: "8", label: "August" }, { value: "9", label: "September" },
    { value: "10", label: "October" }, { value: "11", label: "November" }, { value: "12", label: "December" },
  ];

  // Mendapatkan daftar tahun unik dari data records
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    records.forEach(record => years.add(new Date(record.date).getFullYear()));
    const sortedYears = Array.from(years).sort((a, b) => b - a); // Urutkan dari terbaru ke terlama
    return [{ value: "All", label: "All Years" }, ...sortedYears.map(year => ({ value: String(year), label: String(year) }))];
  }, [records]);


  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Header Section: Title, Search, Filter, Export, Add Data */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <h1 className="text-2xl font-bold text-gray-800 flex-shrink-0 flex items-center">
            Checkclock Overview
        </h1>
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by Date (YYYY-MM-DD)"
            className="pl-9 pr-4 py-2 border rounded-md focus:ring-1 focus:ring-[#257047]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex space-x-2 w-full md:w-auto justify-end">
          <Button variant="outline" onClick={handleFilterClick} className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          {/* <Button variant="outline" onClick={handleExportClick} className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button> */}
          <Button className="bg-[#257047] hover:bg-[#1f5a3a] flex items-center" onClick={handleAddData}>
            <Plus className="h-4 w-4 mr-2" />
                Add Data
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock In</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock Out</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Hours</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {currentTableData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  Tidak ada data checkclock ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              currentTableData.map((record) => (
                <TableRow key={record.id} className="hover:bg-gray-50">
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.date}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.clockIn}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.clockOut}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.workHours}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge
                      variant={getStatusBadgeVariant(record.status)}
                      className="px-3 py-1 text-xs font-semibold rounded-full"
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-6 space-y-4 md:space-y-0 text-sm text-gray-700">
        {/* Left: Items per page */}
        <div className="flex items-center space-x-2">
          <span>Showing</span>
          <Select onValueChange={handleItemsPerPageChange} value={String(itemsPerPage)}>
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
          <span>to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} records</span>
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

      {/* Filter Sheet */}
        <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
            <SheetContent side="right" className="w-full sm:max-w-md bg-white flex flex-col">
                <SheetHeader className="pb-4 border-b border-gray-200">
                    <SheetTitle className="text-2xl font-bold text-gray-800 flex items-center">
                        <Filter className="h-6 w-6 mr-3 text-[#257047]" /> Apply Filters
                    </SheetTitle>
                    <SheetDescription className="text-sm text-gray-600 mt-1">
                        Refine your checkclock records by selecting criteria below.
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-grow overflow-y-auto py-6 space-y-6 p-5"> {/* Added flex-grow and overflow */}
                    {/* Status Filter */}
                    <div className="space-y-2">
                        <label htmlFor="filter-status" className="text-sm font-medium text-gray-700">
                            Checkclock Status
                        </label>
                        <Select onValueChange={setFilterStatus} value={filterStatus}>
                            <SelectTrigger id="filter-status" className="w-full h-10 border-gray-300 focus:border-[#257047] focus:ring-[#257047]">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Status</SelectItem>
                                <SelectItem value="On Time">On Time</SelectItem>
                                <SelectItem value="Late">Late</SelectItem>
                                <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                                <SelectItem value="Absent">Absent</SelectItem>
                                <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Month Filter */}
                    <div className="space-y-2">
                        <label htmlFor="filter-month" className="text-sm font-medium text-gray-700">
                            Month
                        </label>
                        <Select onValueChange={setFilterMonth} value={filterMonth}>
                            <SelectTrigger id="filter-month" className="w-full h-10 border-gray-300 focus:border-[#257047] focus:ring-[#257047]">
                                <SelectValue placeholder="Select month" />
                            </SelectTrigger>
                            <SelectContent>
                                {months.map((month) => (
                                    <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Year Filter */}
                    <div className="space-y-2">
                        <label htmlFor="filter-year" className="text-sm font-medium text-gray-700">
                            Year
                        </label>
                        <Select onValueChange={setFilterYear} value={filterYear}>
                            <SelectTrigger id="filter-year" className="w-full h-10 border-gray-300 focus:border-[#257047] focus:ring-[#257047]">
                                <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableYears.map((year) => (
                                    <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <SheetFooter className="pt-6 border-t border-gray-200 flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                    <Button variant="outline" onClick={handleResetFilters} className="w-full sm:w-auto px-6 py-2 text-gray-700 border-gray-300 hover:bg-gray-100">
                        Reset Filters
                    </Button>
                    <SheetClose asChild>
                        <Button type="submit" onClick={handleApplyFilters} className="bg-[#257047] hover:bg-[#1f5a3a] w-full sm:w-auto px-6 py-2">
                            Apply Filters
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    </div>
  );
}