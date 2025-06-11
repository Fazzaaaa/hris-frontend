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
  FiSend,
  FiInbox,
} from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import * as XLSX from "xlsx";

interface LetterType {
  id: number;
  letterName: string;
  date: string;
  status: "Sent" | "unviewed" | "viewed";
  view: string;
  direction: "sent" | "received"; // Menentukan apakah surat dikirim atau Received
}

export default function LetterManagementPage() {
  const { setTitle } = usePageTitle();
  const router = useRouter();

  const [letters, setLetters] = useState<LetterType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedLetterName, setSelectedLetterName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDirection, setSelectedDirection] = useState(""); // Filter untuk sent/received

  const [selectedYear, setSelectedYear] = useState<string>("All");

  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [newLetter, setNewLetter] = useState({
    letterName: "",
    file: null as File | null,
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleSendLetter = () => {
    const errors: { [key: string]: string } = {};
    if (!newLetter.letterName) errors.letterName = "Nama Surat wajib diisi.";
    if (!newLetter.file) errors.file = "File PDF wajib diunggah.";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    const newId = Math.max(...letters.map((l) => l.id), 0) + 1;
    const newEntry: LetterType = {
      id: newId,
      letterName: newLetter.letterName,
      date: new Date().toISOString().split("T")[0],
      status: "Sent",
      view: URL.createObjectURL(newLetter.file!),
      direction: "sent",
    };

    setLetters((prev) => [newEntry, ...prev]);
    setShowSendModal(false);
    setNewLetter({ letterName: "", file: null });
    setFormErrors({});
  };

  const handleReceiveLetter = () => {
    const errors: { [key: string]: string } = {};
    if (!newLetter.letterName) errors.letterName = "Nama Surat wajib diisi.";
    if (!newLetter.file) errors.file = "File PDF wajib diunggah.";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    const newId = Math.max(...letters.map((l) => l.id), 0) + 1;
    const newEntry: LetterType = {
      id: newId,
      letterName: newLetter.letterName,
      date: new Date().toISOString().split("T")[0],
      status: "unviewed", // Surat yang Received default unviewed
      view: URL.createObjectURL(newLetter.file!),
      direction: "received",
    };

    setLetters((prev) => [newEntry, ...prev]);
    setShowReceiveModal(false);
    setNewLetter({ letterName: "", file: null });
    setFormErrors({});
  };

  const getYears = (letters: LetterType[]): string[] => {
    const years = letters.map((l) => new Date(l.date).getFullYear().toString());
    return Array.from(new Set(years)).sort((a, b) => b.localeCompare(a));
  };

  const filteredByYearLetters =
    selectedYear === "All"
      ? letters
      : letters.filter(
          (letter) =>
            new Date(letter.date).getFullYear().toString() === selectedYear
        );

  useEffect(() => {
    setTitle("Letter Management");
    setLetters([
      {
        id: 1,
        letterName: "Evaluasi Kinerja",
        date: "2022-08-15",
        status: "unviewed",
        view: "/documents/Surat_1.pdf",
        direction: "received",
      },
      {
        id: 2,
        letterName: "Kontrak Kerja",
        date: "2025-01-20",
        status: "Sent",
        view: "/documents/Surat_2.pdf",
        direction: "sent",
      },
      {
        id: 3,
        letterName: "Dokumen Evaluasi",
        date: "2023-11-10",
        status: "Sent",
        view: "/documents/Surat_3.pdf",
        direction: "sent",
      },
      {
        id: 4,
        letterName: "Sertifikat Kepelatihan",
        date: "2021-06-05",
        status: "unviewed",
        view: "/documents/Surat_4.pdf",
        direction: "received",
      },
      {
        id: 5,
        letterName: "Evaluasi Kinerja",
        date: "2020-12-01",
        status: "unviewed",
        view: "/documents/Surat_5.pdf",
        direction: "received",
      },
      {
        id: 6,
        letterName: "Dokumen Evaluasi",
        date: "2024-03-18",
        status: "Sent",
        view: "/documents/Surat_6.pdf",
        direction: "sent",
      },
      {
        id: 7,
        letterName: "Sertifikat Kepelatihan",
        date: "2022-09-25",
        status: "unviewed",
        view: "/documents/Surat_7.pdf",
        direction: "received",
      },
      {
        id: 8,
        letterName: "Kontrak Kerja",
        date: "2023-05-30",
        status: "Sent",
        view: "/documents/Surat_8.pdf",
        direction: "sent",
      },
      {
        id: 9,
        letterName: "Evaluasi Kinerja",
        date: "2021-04-11",
        status: "unviewed",
        view: "/documents/Surat_9.pdf",
        direction: "received",
      },
      {
        id: 10,
        letterName: "Dokumen Evaluasi",
        date: "2020-07-07",
        status: "Sent",
        view: "/documents/Surat_10.pdf",
        direction: "sent",
      },
    ]);
  }, [setTitle]);

  const handleViewLetter = (letter: LetterType) => {
    // Jika surat Received dan statusnya unviewed, ubah menjadi viewed
    if (letter.direction === "received" && letter.status === "unviewed") {
      setLetters((prevLetters) =>
        prevLetters.map((l) =>
          l.id === letter.id ? { ...l, status: "viewed" } : l
        )
      );
    }

    // Trigger download file secara manual
    const link = document.createElement("a");
    link.href = letter.view;
    link.download = letter.view.split("/").pop() || "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  let filteredLetters = filteredByYearLetters.filter((letter) => {
    const matchSearch = letter.letterName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchLetter =
      !selectedLetterName || letter.letterName === selectedLetterName;

    const matchStatus = !selectedStatus || letter.status === selectedStatus;

    const matchDirection =
      !selectedDirection || letter.direction === selectedDirection;

    return matchSearch && matchLetter && matchStatus && matchDirection;
  });

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

  const letterNameOptions = unique(letters, "letterName");

  const yearsOptions = ["All", ...getYears(letters)];

  // Hitung statistik berdasarkan year yang dipilih
  const sentMail = filteredByYearLetters.filter(
    (letter) => letter.direction === "sent"
  ).length;

  const receivedMail = filteredByYearLetters.filter(
    (letter) => letter.direction === "received"
  ).length;

  const unviewedMail = filteredByYearLetters.filter(
    (letter) => letter.direction === "received" && letter.status === "unviewed"
  ).length;

  const getStatusBadge = (status: string, direction: string) => {
    if (direction === "sent") {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
          Sent
        </span>
      );
    } else {
      if (status === "unviewed") {
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            Unviewed
          </span>
        );
      } else {
        return (
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            Viewed
          </span>
        );
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <h3 className="text-sm text-gray-500">Period</h3>
            <p className="text-xl font-bold">
              {selectedYear === "All" ? "All Years" : selectedYear}
            </p>
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
          <h3 className="text-sm text-gray-500">Sent Mail</h3>
          <p className="text-xl font-bold text-black">{sentMail}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Received Mail</h3>
          <p className="text-xl font-bold text-black">{receivedMail}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Unviewed Mail</h3>
          <p className="text-xl font-bold text-black">{unviewedMail}</p>
        </div>
      </div>

      {/* Table + Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-lg font-semibold">List Of Letters</h2>
          <div className="flex flex-wrap gap-2 items-center">
            {/* Search */}

            {/* Letter Name Filter */}
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={selectedLetterName}
              onChange={(e) => setSelectedLetterName(e.target.value)}
            >
              <option value="">All Letter Names</option>
              {letterNameOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>

            {/* Direction Filter */}
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={selectedDirection}
              onChange={(e) => setSelectedDirection(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="sent">Sent</option>
              <option value="received">Received</option>
            </select>

            {/* Status Filter */}
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Sent">Sent</option>
              <option value="unviewed">Unviewed</option>
              <option value="viewed">Viewed</option>
            </select>

            <button
              onClick={() => setShowSendModal(true)}
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
                <th className="px-4 py-2 text-sm font-semibold text-white text-center">
                  No.
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-white text-left">
                  Nama Surat
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-white text-left">
                  Tanggal
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-white text-center">
                  Type
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-white text-center">
                  Status
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-white text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentLetters.map((letter, index) => (
                <tr key={letter.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-center">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 py-2 text-left">{letter.letterName}</td>
                  <td className="px-4 py-2 text-left">{letter.date}</td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        letter.direction === "sent"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {letter.direction === "sent" ? "Sent" : "Received"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    {getStatusBadge(letter.status, letter.direction)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleViewLetter(letter)}
                      className="text-white bg-blue-700 px-2 py-2 rounded-md hover:opacity-70 text-xl inline-flex items-center justify-center"
                      title="View Letter"
                    >
                      <FiEye />
                    </button>
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
                <option key={count} value={count}>
                  {count}
                </option>
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
                className={`px-3 py-1 rounded-md border ${
                  currentPage === i + 1
                    ? "bg-gray-300"
                    : "bg-white hover:bg-gray-100"
                }`}
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
        </div>
      </div>

      {/* Send Letter Modal */}
      {showSendModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(93, 93, 93, 0.72)" }}
        >
          {" "}
          <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4 shadow-lg pointer-events-auto">
            <h2 className="text-lg font-semibold text-gray-800">
              Add New Letter
            </h2>

            {/* Nama Surat */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Nama Surat
              </label>
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
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.letterName}
                </p>
              )}
            </div>

            {/* Upload File */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Upload PDF
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) =>
                  setNewLetter({
                    ...newLetter,
                    file: e.target.files?.[0] ?? null,
                  })
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
                onClick={() => {
                  setShowSendModal(false);
                  setNewLetter({ letterName: "", file: null });
                  setFormErrors({});
                }}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSendLetter}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
