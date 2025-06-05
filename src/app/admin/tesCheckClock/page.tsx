// components/dashboard/CheckclockOverviewTable.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, Filter, Plus, Check, X, ChevronLeft, ChevronRight } from "lucide-react"; // Icons

// --- Tipe Data untuk Karyawan Checkclock ---
interface CheckclockRecord {
  id: string;
  employeeName: string;
  jabatan: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
  approve: boolean | null; 
  status: "Waiting Approval" | "On Time" | "Late" | "Annual Leave" | "Absent" | "Sick Leave" | "Rejected";
  avatarUrl?: string; // Opsional, jika ada gambar profil
}

// --- Data Simulasi (Ganti dengan data dari API Anda) ---
const mockCheckclockData: CheckclockRecord[] = [
  { id: "1", employeeName: "Juanita", jabatan: "CEO", clockIn: "08.00", clockOut: "16.30", workHours: "10h 5m", approve: null, status: "Waiting Approval", avatarUrl: "" },
  { id: "2", employeeName: "Shane", jabatan: "OB", clockIn: "08.00", clockOut: "17.15", workHours: "9h 5m", approve: true, status: "On Time", avatarUrl: "" },
];

export default function CheckclockOverviewTable() {
  const router = useRouter();
  const [employees, setEmployees] = useState<CheckclockRecord[]>(mockCheckclockData); // Menggunakan employees untuk data tabel
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --- State untuk AlertDialog Konfirmasi Approve/Reject ---
  const [isApproveRejectDialogOpen, setIsApproveRejectDialogOpen] = useState(false);
  const [recordToApproveReject, setRecordToApproveReject] = useState<CheckclockRecord | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);


  // Fungsi untuk mendapatkan variant badge Shadcn UI
  const getStatusBadgeVariant = (status: CheckclockRecord["status"]) => {
  switch (status) {
    case "On Time":
      return "default";
    case "Late":
      return "destructive";
    case "Rejected": // Tambahkan case untuk "Rejected"
      return "destructive"; // Misalnya, tampilkan merah seperti "Late"
    case "Annual Leave":
    case "Sick Leave":
    case "Absent":
      return "secondary";
    case "Waiting Approval": // Pastikan ini juga ditangani jika Anda tidak menggunakan `default` untuk itu
      return "outline";
    default:
      return "outline"; // Fallback jika tidak ada yang cocok
  }
};

  // Fungsi untuk mendapatkan warna latar belakang badge Warning (karena tidak ada di shadcn default)
  const getWarningBadgeClass = (status: CheckclockRecord["status"]) => {
    if (status === "Waiting Approval") {
      return "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100/80";
    }
    return "";
  };


  // Filter data berdasarkan searchTerm
  const filteredData = useMemo(() => {
    return employees.filter(record => // Filter dari state 'employees'
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.jabatan.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, employees]); // Dependensi ditambahkan 'employees'

  // Logika Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentTableData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage, filteredData]);

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
    console.log("Tambah Data clicked!");
    // router.push("/admin/checkclock/add");
  };

  const handleViewDetails = (id: string) => {
    console.log(`View Details for ID: ${id}`);
    // router.push(`/admin/checkclock/${id}/details`);
  };

  const handleFilterClick = () => {
    console.log("Filter button clicked!");
  };

  // --- Fungsi untuk membuka AlertDialog Approve/Reject ---
  const handleApproveRejectClick = (record: CheckclockRecord, type: 'approve' | 'reject') => {
    setRecordToApproveReject(record);
    setActionType(type);
    setIsApproveRejectDialogOpen(true);
  };

  // --- Fungsi untuk konfirmasi aksi Approve/Reject ---
  const handleConfirmApproveReject = async () => {
    if (recordToApproveReject && actionType) {
      console.log(`${actionType === 'approve' ? 'Menyetujui' : 'Menolak'} absensi untuk ${recordToApproveReject.employeeName}`);

      // --- LOGIKA PENGIRIMAN DATA KE API ---
      try {
        // Ganti ini dengan panggilan API PUT/PATCH Anda yang sebenarnya
        // Contoh:
        // const response = await fetch(`/api/checkclock/${recordToApproveReject.id}/approve`, {
        //   method: 'PUT',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ approved: actionType === 'approve' }),
        // });
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const result = await response.json();
        // console.log("Pembaruan berhasil:", result);

        // Simulasi sukses dan update state lokal
        await new Promise(resolve => setTimeout(resolve, 800));
        alert(`Absensi untuk ${recordToApproveReject.employeeName} berhasil di${actionType === 'approve' ? 'setujui' : 'tolak'}.`);

        setEmployees(prevEmployees =>
          prevEmployees.map(emp =>
            emp.id === recordToApproveReject.id
              ? {
                  ...emp,
                  approve: actionType === 'approve',
                  status: actionType === 'approve' ? emp.status : "Rejected", // Sesuaikan status setelah rejected
                }
              : emp
          )
        );

      } catch (error) {
        console.error(`Gagal ${actionType} absensi:`, error);
        alert(`Gagal ${actionType} absensi: ${(error as Error).message}`);
      } finally {
        setRecordToApproveReject(null);
        setActionType(null);
        setIsApproveRejectDialogOpen(false);
      }
      // --- AKHIR: LOGIKA PENGIRIMAN DATA KE API ---
    }
  };


  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Header Section: Search, Filter, Add Data */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search Employee"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-2 w-full md:w-auto justify-end">
          <Button variant="outline" onClick={handleFilterClick}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-[#257047] hover:bg-[#1f5a3a]" onClick={handleAddData}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Data
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee Name</TableHead>
            <TableHead>Jabatan</TableHead>
            <TableHead>Clock In</TableHead>
            <TableHead>Clock Out</TableHead>
            <TableHead>Work Hours</TableHead>
            <TableHead>Approve</TableHead> {/* Kolom Approve */}
            <TableHead>Status</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTableData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                Tidak ada data yang ditemukan.
              </TableCell>
            </TableRow>):(currentTableData.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {record.avatarUrl ? (
                      <img src={record.avatarUrl} alt={record.employeeName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm font-semibold text-gray-600">
                        {record.employeeName.charAt(0)}
                      </span>
                    )}
                  </div>
                  <span>{record.employeeName}</span>
                </TableCell>
                <TableCell>{record.jabatan}</TableCell>
                <TableCell>{record.clockIn}</TableCell>
                <TableCell>{record.clockOut}</TableCell>
                <TableCell>{record.workHours}</TableCell>

                {/* Kolom Approve yang bisa diklik */}
                <TableCell>
                  {record.approve === null ? ( // Jika belum diputuskan
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost" // Atau "outline", pilih yang cocok
                        size="icon"
                        className="text-green-500 hover:text-green-600"
                        onClick={() => handleApproveRejectClick(record, 'approve')}
                      >
                        <Check className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost" // Atau "outline", pilih yang cocok
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleApproveRejectClick(record, 'reject')}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  ) : record.approve ? ( // Jika sudah diapprove
                    <Check className="h-5 w-5 text-green-500" />
                  ) : ( // Jika sudah direject
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={getStatusBadgeVariant(record.status)}
                    className={`${getWarningBadgeClass(record.status)}`}
                  >
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(record.id)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-6 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <span>Showing</span>
          <Select onValueChange={handleItemsPerPageChange} value={String(itemsPerPage)}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span>to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} records</span>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="icon"
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* AlertDialog untuk Konfirmasi Approve/Reject */}
      <AlertDialog open={isApproveRejectDialogOpen} onOpenChange={setIsApproveRejectDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi {actionType === 'approve' ? 'Persetujuan Absensi' : 'Penolakan Absensi'}</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin {actionType === 'approve' ? 'menyetujui' : 'menolak'} absensi karyawan{" "}
              {recordToApproveReject && (
                <span className="font-semibold">{recordToApproveReject.employeeName}</span>
              )}
              ? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsApproveRejectDialogOpen(false)}>Batalkan</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmApproveReject}
              className={actionType === 'reject' ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
            >
              {actionType === 'reject' ? 'Tolak' : 'Setujui'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}