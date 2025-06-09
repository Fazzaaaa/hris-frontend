"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/context/PageTitleContext";
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiCheckCircle,
  FiXCircle,
  FiEye,
} from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import * as XLSX from "xlsx";


interface LetterType {
  id: number;
  employeeName: string;
  letterName: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected";
  content: string;
}

export default function LetterManagementPage() {
  const { setTitle } = usePageTitle();
  const router = useRouter();

  const [letters, setLetters] = useState<LetterType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedLetterName, setSelectedLetterName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [selectedYear, setSelectedYear] = useState<string>("All");

  const handleExport = () => {
    const exportData = filteredLetters.map((letter) => ({
      "No.": letter.id,
      "Nama Pegawai": letter.employeeName,
      "Nama Surat": letter.letterName,
      "Tanggal": letter.date,
      "Status": letter.status,
      "Content Path": letter.content,
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Letters");

    XLSX.writeFile(workbook, "letter_data.csv", { bookType: "csv" });
  };

  const handleAddLetter = () => {
  const errors: { [key: string]: string } = {};
  if (!newLetter.employeeName) errors.employeeName = "Nama Pegawai wajib diisi.";
  if (!newLetter.letterName) errors.letterName = "Nama Surat wajib diisi.";
  if (!newLetter.file) errors.file = "File PDF wajib diunggah.";

  setFormErrors(errors);

  if (Object.keys(errors).length > 0) return;

  const newId = letters.length + 1;
  const newEntry: LetterType = {
    id: newId,
    employeeName: newLetter.employeeName,
    letterName: newLetter.letterName,
    date: new Date().toISOString().split("T")[0],
    status: "Pending",
    content: URL.createObjectURL(newLetter.file!),
  };

  setLetters((prev) => [newEntry, ...prev]);
  setShowAddModal(false);
  setNewLetter({ employeeName: "", letterName: "", file: null });
  setFormErrors({});
};



  const getYears = (letters: LetterType[]): string[] => {
    const years = letters.map((l) => new Date(l.date).getFullYear().toString());
    return Array.from(new Set(years)).sort((a, b) => b.localeCompare(a));
  };

  const filteredByYearLetters = selectedYear === "All"
  ? letters
  : letters.filter(letter => new Date(letter.date).getFullYear().toString() === selectedYear);

  useEffect(() => {
    setTitle("Letter Management");
    setLetters([
      { id: 1, employeeName: "John Doe", letterName: "Kontrak Kerja", date: "2025-05-20", status: "Pending", content: "/documents/Surat_1.pdf" },
      { id: 2, employeeName: "Jane Smith", letterName: "Kontrak Kerja", date: "2025-05-22", status: "Pending", content: "/documents/Surat_2.pdf" },
      { id: 3, employeeName: "Peter Jones", letterName: "Sertifikat Pelatihan", date: "2025-05-25", status: "Pending", content: "/documents/Surat_3.pdf" },
      { id: 4, employeeName: "Alice Brown", letterName: "Sertifikat Pelatihan", date: "2025-05-28", status: "Pending", content: "/documents/Surat_4.pdf" },
      { id: 5, employeeName: "Robert White", letterName: "Kontrak Kerja", date: "2025-06-01", status: "Pending", content: "/documents/Surat_5.pdf" },
      { id: 6, employeeName: "Emily Green", letterName: "Kontrak Kerja", date: "2025-06-03", status: "Pending", content: "/documents/Surat_6.pdf" },
      { id: 7, employeeName: "Michael Blue", letterName: "Dokumentasi Evaluasi", date: "2025-06-05", status: "Pending", content: "/documents/Surat_7.pdf" },
      { id: 8, employeeName: "Sarah Black", letterName: "Evaluasi Kinerja", date: "2024-06-06", status: "Pending", content: "/documents/Surat_8.pdf" },
      { id: 9, employeeName: "David Gray", letterName: "Dokumen Evaluasi", date: "2024-06-07", status: "Pending", content: "/documents/Surat_9.pdf" },
      { id: 10, employeeName: "Laura Red", letterName: "Dokumen Evaluasi", date: "2024-06-08", status: "Pending", content: "/documents/Surat_10.pdf" },
    ]);
  }, [setTitle]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newLetter, setNewLetter] = useState({
    employeeName: "",
    letterName: "",
    file: null as File | null,
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});


  const handleStatusChange = (id: number, newStatus: LetterType["status"]) => {
    setConfirmModal({ visible: true, letterId: id, newStatus });
  };


  const [confirmModal, setConfirmModal] = useState<{
    visible: boolean;
    letterId: number | null;
    newStatus: LetterType["status"] | null;
  }>({ visible: false, letterId: null, newStatus: null });

  const confirmStatusChange = () => {
    if (confirmModal.letterId && confirmModal.newStatus) {
      setLetters((prev) =>
        prev.map((letter) =>
          letter.id === confirmModal.letterId ? { ...letter, status: confirmModal.newStatus! } : letter
        )
      );
    }
    setConfirmModal({ visible: false, letterId: null, newStatus: null });
  };


  let filteredLetters = filteredByYearLetters.filter((letter) => {
  const matchSearch =
    letter.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.letterName.toLowerCase().includes(searchTerm.toLowerCase());

  const matchLetter =
    !selectedLetterName || letter.letterName === selectedLetterName;

  const matchStatus = !selectedStatus || letter.status === selectedStatus;

  return matchSearch && matchLetter && matchStatus;
});


// Sorting logic
if (selectedEmployee === "az") {
  filteredLetters = filteredLetters.sort((a, b) =>
    a.employeeName.localeCompare(b.employeeName)
  );
} else if (selectedEmployee === "za") {
  filteredLetters = filteredLetters.sort((a, b) =>
    b.employeeName.localeCompare(a.employeeName)
  );
} else if (selectedEmployee === "newest") {
  filteredLetters = filteredLetters.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
} else if (selectedEmployee === "oldest") {
  filteredLetters = filteredLetters.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
} else if (selectedEmployee) {
  // fallback if value is specific name
  filteredLetters = filteredLetters.filter(
    (letter) => letter.employeeName === selectedEmployee
  );
}


  const totalItems = filteredLetters.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentLetters = filteredLetters.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const unique = <T, K extends keyof T>(arr: T[], key: K): string[] =>
    Array.from(new Set(arr.map((item) => item[key] as string)));

  const employeeOptions = unique(letters, "employeeName");
  const letterNameOptions = unique(letters, "letterName");

  const yearsOptions = ["All", ...getYears(letters)];
  const incomingMail = filteredByYearLetters.filter(letter => letter.status === "Pending").length;
  const companyArchives = filteredByYearLetters.filter(letter => letter.status !== "Pending").length;
  
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <h3 className="text-sm text-gray-500">Period</h3>
            <p className="text-xl font-bold">{selectedYear === "All" ? "All Years" : selectedYear}</p>
          </div>
          <select
            className="text-sm border border-gray-300 rounded px-2 py-1"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {yearsOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Incoming Mail</h3>
          <p className="text-xl font-bold">{incomingMail}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Sent Mail</h3>
          <p className="text-xl font-bold">0</p> {/* Placeholder, bisa diganti logika lain */}
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Company Archives</h3>
          <p className="text-xl font-bold">{companyArchives}</p>
        </div>
      </div>


      {/* Table + Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-lg font-semibold">List Of Letter</h2>
          <div className="flex flex-wrap gap-2 items-center">
            {/* Search */}
            <div className="flex items-center border rounded-lg px-2 py-1 bg-white">
              <FiSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search Letters"
                className="outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Employee Filter */}
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="">All Employees</option>
              <option value="az">Sort by Name A-Z</option>
              <option value="za">Sort by Name Z-A</option>
              <option value="newest">Sort by Newest Date</option>
              <option value="oldest">Sort by Oldest Date</option>
            </select>


            {/* Letter Name Filter */}
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={selectedLetterName}
              onChange={(e) => setSelectedLetterName(e.target.value)}
            >
              <option value="">All Letter Names</option>
              {letterNameOptions.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button
              onClick={handleExport}
              className="flex items-center gap-1 px-3 py-1 border rounded-md hover:bg-[#D9D9D9] text-sm"
            >
              <FiDownload /> Export
            </button>


            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1 px-3 py-1 bg-[#BA3C54] text-white rounded-md text-sm hover:opacity-90"
            >
              <FaPlus /> Add Data
            </button>
          </div>
        </div>
              
        {/* Table */}
        <div className="relative pt-6 overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-500">
            <thead className="bg-[#1E3A5F]">
              <tr>
                {["No.", "Nama Pegawai", "Nama Surat", "Tanggal", "Status", "Content"].map((heading, idx) => (
                  <th
                    key={idx}
                    className={`px-4 py-2 text-sm font-semibold text-white ${heading === "No." || heading === "Content" ? "text-center" : "text-left"}`}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentLetters.map((letter, index) => (
                <tr key={letter.id} className="text-center border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{startIndex + index + 1}</td>
                  <td className="px-4 py-2 text-left">{letter.employeeName}</td>
                  <td className="px-4 py-2 text-left">{letter.letterName}</td>
                  <td className="px-4 py-2 text-left">{letter.date}</td>
                  <td className="px-4 py-2 text-left">
                    {letter.status === "Pending" ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStatusChange(letter.id, "Approved")}
                          className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 flex items-center gap-1 text-sm"
                        >
                          <FiCheckCircle />
                        </button>
                        <button
                          onClick={() => handleStatusChange(letter.id, "Rejected")}
                          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 flex items-center gap-1 text-sm"
                        >
                          <FiXCircle />
                        </button>
                      </div>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${letter.status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {letter.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <a
                      href={letter.content}
                      download
                      className="text-white bg-blue-700 px-2 py-2 rounded-md hover:opacity-70 text-xl inline-flex items-center justify-center"
                    >
                      <FiEye />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-2 py-1"
            >
              {[10, 20, 30].map((count) => (
                <option key={count} value={count}>{count}</option>
              ))}
            </select>
          </div>
          <div>
            Showing {startIndex + 1} to {endIndex} of {totalItems} records
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded-md border ${currentPage === i + 1 ? "bg-gray-300" : "bg-white hover:bg-gray-100"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              ›
            </button>
          </div>
          {confirmModal.visible && (
              <div
                className="fixed inset-0 flex items-center justify-center z-50"
                style={{ backgroundColor: "rgba(93, 93, 93, 0.72)" }}
              >
              <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Confirm Status Change
                </h2>
                <p className="mb-6 text-gray-600">
                  Are you sure you want to mark this letter as{" "}
                  <span className="font-bold text-blue-600">{confirmModal.newStatus}</span>?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setConfirmModal({ visible: false, letterId: null, newStatus: null })}
                    className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmStatusChange}
                    className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm"
                  >
                    Yes, Confirm
                  </button>
                </div>
              </div>
            </div>
          )}  
        </div>
        {showAddModal && (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(93, 93, 93, 0.72)" }}
    >
    <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Add New Letter</h2>

      {/* Nama Pegawai */}
      <div>
        <label className="block text-sm font-medium mb-1">Nama Pegawai</label>
        <select
          value={newLetter.employeeName}
          onChange={(e) =>
            setNewLetter({ ...newLetter, employeeName: e.target.value })
          }
          className="w-full border rounded-md px-3 py-2 text-sm"
        >
          <option value="">Pilih Pegawai</option>
          {employeeOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {formErrors.employeeName && (
          <p className="text-red-500 text-sm mt-1">{formErrors.employeeName}</p>
        )}
      </div>

      {/* Nama Surat */}
      <div>
        <label className="block text-sm font-medium mb-1">Nama Surat</label>
        <select
          value={newLetter.letterName}
          onChange={(e) =>
            setNewLetter({ ...newLetter, letterName: e.target.value })
          }
          className="w-full border rounded-md px-3 py-2 text-sm"
        >
          <option value="">Pilih Jenis Surat</option>
          {letterNameOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {formErrors.letterName && (
          <p className="text-red-500 text-sm mt-1">{formErrors.letterName}</p>
        )}
      </div>

      {/* Upload File */}
      <div>
        <label className="block text-sm font-medium mb-1">Upload PDF</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) =>
            setNewLetter({ ...newLetter, file: e.target.files?.[0] ?? null })
          }
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
        {formErrors.file && (
          <p className="text-red-500 text-sm mt-1">{formErrors.file}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={() => setShowAddModal(false)}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleAddLetter}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}
