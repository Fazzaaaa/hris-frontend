"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/context/PageTitleContext";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { FiCheck, FiX } from "react-icons/fi";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

type CheckclockEntry = {
  image: string;
  nama: string;
  jabatan: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
  approval: boolean | null;
  status: string;
};

const checkclockData: CheckclockEntry[] = [
  {
    image: "",
    nama: "Juanita",
    jabatan: "CEO",
    clockIn: "08:00 AM",
    clockOut: "04:00 PM",
    workHours: "8h 0m",
    approval: true,
    status: "",
  },
  {
    image: "",
    nama: "Shane",
    jabatan: "OB",
    clockIn: "08:20 AM",
    clockOut: "04:00 PM",
    workHours: "7h 40m",
    approval: false,
    status: "",
  },
  {
    image: "",
    nama: "Miles",
    jabatan: "Head of HR",
    clockIn: "00:00",
    clockOut: "00:00",
    workHours: "0",
    approval: null,
    status: "",
  },
  {
    image: "",
    nama: "Flores",
    jabatan: "Manager",
    clockIn: "08:05 AM",
    clockOut: "04:05 PM",
    workHours: "8h 0m",
    approval: true,
    status: "",
  },
  {
    image: "",
    nama: "Henry",
    jabatan: "CPO",
    clockIn: "08:18 AM",
    clockOut: "04:10 PM",
    workHours: "7h 52m",
    approval: true,
    status: "",
  },
  {
    image: "",
    nama: "Marvin",
    jabatan: "OB",
    clockIn: "08:00 AM",
    clockOut: "04:00 PM",
    workHours: "8h 0m",
    approval: false,
    status: "",
  },
  {
    image: "",
    nama: "Black",
    jabatan: "HRD",
    clockIn: "08:25 AM",
    clockOut: "04:15 PM",
    workHours: "7h 50m",
    approval: false,
    status: "",
  },
  {
    image: "",
    nama: "Jacob Jones",
    jabatan: "Supervisor",
    clockIn: "00:00",
    clockOut: "00:00",
    workHours: "0",
    approval: null,
    status: "",
  },
  {
    image: "",
    nama: "Ronald Richard",
    jabatan: "OB",
    clockIn: "00:00",
    clockOut: "00:00",
    workHours: "0",
    approval: null,
    status: "",
  },
  {
    image: "",
    nama: "Leslie Alexander",
    jabatan: "OB",
    clockIn: "08:10 AM",
    clockOut: "04:10 PM",
    workHours: "8h 0m",
    approval: true,
    status: "",
  },
];

const Checkclock = () => {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Checkclock");
  }, [setTitle]);
  const router = useRouter();
  // setTitle("Checkclock");

  const [data, setData] = useState(checkclockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [selectedEntry, setSelectedEntry] = useState<CheckclockEntry | null>(
    null
  );
  const [showDetail, setShowDetail] = useState(false);

  const [showConfirm, setShowConfirm] = useState<null | number>(null);
  const [approvalAction, setApprovalAction] = useState<"accept" | "reject">(
    "accept"
  );

  const handleApproval = (index: number, action: "accept" | "reject") => {
    setShowConfirm(index);
    setApprovalAction(action);
  };

  const confirmApproval = () => {
    if (showConfirm !== null) {
      const updated = [...data];
      updated[showConfirm].approval = approvalAction === "accept";
      setData(updated);
      setShowConfirm(null);
    }
  };

  const cancelApproval = () => setShowConfirm(null);
  const determineStatus = (entry: CheckclockEntry) => {
    const isZeroClock =
      entry.clockIn === "00:00" &&
      entry.clockOut === "00:00" &&
      entry.workHours === "0";

    if (isZeroClock) {
      if (entry.approval === true) {
        return { text: "Sick Leave", color: "bg-blue-600 text-white" };
      } else if (entry.approval === false) {
        return { text: "Absent", color: "bg-red-600 text-white" };
      } else {
        return { text: "Waiting Approval", color: "bg-yellow-500 text-white" };
      }
    }

    if (entry.approval === null) {
      return { text: "Waiting Approval", color: "bg-yellow-500 text-white" };
    }

    // Convert clockIn to minutes
    const [clockHour, clockMinuteRaw] = entry.clockIn.split(":");
    const isAM = entry.clockIn.toLowerCase().includes("am");
    let hourNum = parseInt(clockHour, 10);
    const minuteNum = parseInt(clockMinuteRaw.slice(0, 2), 10);

    // Convert 12-hour to 24-hour format
    if (hourNum === 12 && isAM) hourNum = 0;
    if (!isAM && hourNum !== 12) hourNum += 12;

    const totalMinutes = hourNum * 60 + minuteNum;

    // 08:15 AM = 495 minutes
    if (totalMinutes < 495) {
      return { text: "On Time", color: "bg-green-500 text-white" };
    } else {
      return { text: "Late", color: "bg-red-500 text-white" };
    }
  };

  const filteredData = data
    .filter(
      (item) =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter ? determineStatus(item).text === statusFilter : true)
    )
    .sort((a, b) => {
      if (sortOrder === "az") return a.nama.localeCompare(b.nama);
      if (sortOrder === "za") return b.nama.localeCompare(a.nama);
      return 0;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const [selectedEntryIndex, setSelectedEntryIndex] = useState<number | null>(
    null
  );
  // const selectedEntry = selectedEntryIndex !== null ? data[selectedEntryIndex] : null;

  return (
    <div className="bg-white p-6 rounded-lg shadow text-sm">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-4 items-center mb-4">
        <h2 className="text-lg font-semibold">Checkclock Overview</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center border rounded-lg px-2 py-1 bg-white">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Employee"
              className="outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm"
          >
            <option value="">All Status</option>
            <option value="On Time">On Time</option>
            <option value="Late">Late</option>
            <option value="Waiting Approval">Waiting Approval</option>
            <option value="Absent">Absent</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm"
          >
            <option value="">Sort by</option>
            <option value="az">Name A-Z</option>
            <option value="za">Name Z-A</option>
          </select>

          <button
            onClick={() => router.push("/admin/checkclock/addChecklock")}
            className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <FaPlus /> Add Data
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full table-auto text-xs divide-y divide-gray-200">
          <thead className="bg-[#1E3A5F] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Employee Name</th>
              <th className="px-4 py-2 text-center">Jabatan</th>
              <th className="px-4 py-2 text-center">Clock In</th>
              <th className="px-4 py-2 text-center">Clock Out</th>
              <th className="px-4 py-2 text-center">Work Hours</th>
              <th className="px-4 py-2 text-center">Approve</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Details</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No data found.
                </td>
              </tr>
            ) : (
              currentData.map((entry, index) => {
                const statusInfo = determineStatus(entry);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    {/* Kolom Employee Name - rata kiri */}
                    <td className="px-4 py-2 flex items-center gap-2 text-left">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                        style={{ backgroundColor: "#B93B53" }}
                      >
                        {entry.nama.charAt(0)}
                      </div>
                      <span>{entry.nama}</span>
                    </td>

                    {/* Kolom lainnya - rata tengah */}
                    <td className="px-4 py-2 text-center">{entry.jabatan}</td>
                    <td className="px-4 py-2 text-center">{entry.clockIn}</td>
                    <td className="px-4 py-2 text-center">{entry.clockOut}</td>
                    <td className="px-4 py-2 text-center">{entry.workHours}</td>

                    <td className="px-4 py-2 text-center">
                      {entry.approval === null ? (
                        <div className="flex justify-center gap-2">
                          {/* Approve Button */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                onClick={() => {
                                  setShowConfirm(index);
                                  setApprovalAction("accept");
                                }}
                                className="text-green-600 hover:text-green-700"
                                title="Approve"
                              >
                                <FaCheckCircle size={20} />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Approve this check-in?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to approve{" "}
                                  <strong>{entry.nama}</strong>'s attendance?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={confirmApproval}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  Yes, Approve
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          {/* Reject Button */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                onClick={() => {
                                  setShowConfirm(index);
                                  setApprovalAction("reject");
                                }}
                                className="text-red-600 hover:text-red-700"
                                title="Reject"
                              >
                                <FaTimesCircle size={20} />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Reject this check-in?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to reject{" "}
                                  <strong>{entry.nama}</strong>'s attendance?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={confirmApproval}
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  Yes, Reject
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic text-xs">
                          Already processed
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-2 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                      >
                        {statusInfo.text}
                      </span>
                    </td>

                    <td className="px-4 py-2 text-center">
                      <button
                        className="px-2 py-1 border text-xs rounded-md hover:bg-gray-100"
                        onClick={() => {
                          setSelectedEntry(entry);
                          setShowDetail(true);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-between items-center mt-4 text-sm gap-4">
        <div className="flex items-center gap-2">
          <span>Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded-md px-2 py-1"
          >
            {[10, 20, 30].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <span className="text-gray-600">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredData.length)} of{" "}
          {filteredData.length} entries
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            ‹
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1 rounded-md border ${
                currentPage === pageNum
                  ? "bg-gray-300 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {pageNum}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, pageCount))
            }
            disabled={currentPage === pageCount}
            className="px-3 py-1 rounded-md border bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            ›
          </button>
        </div>
      </div>
      <Sheet open={showDetail} onOpenChange={setShowDetail}>
        <SheetContent side="right" className="w-[400px] bg-white">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold">
              Attendance Detail
            </SheetTitle>
          </SheetHeader>

          {selectedEntry && (
            <div className="mt-6 space-y-4 text-sm">
              {/* Box 1: Profile */}
              <div className="flex items-start justify-between p-4 border rounded-lg shadow-sm bg-gray-50">
                <div className="flex gap-4 items-start">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                      style={{ backgroundColor: "#B93B53" }}
                    >
                      {selectedEntry.nama?.charAt(0)}
                    </div>
                    <div>
                      <div className="text-base font-semibold">
                        {selectedEntry.nama}
                      </div>
                      <div className="text-xs text-gray-500">
                        {selectedEntry.jabatan}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-white ${
                      determineStatus(selectedEntry).color || "bg-gray-400"
                    }`}
                  >
                    {determineStatus(selectedEntry).text}
                  </span>
                </div>
              </div>

              {/* Box 2: Attendance Info */}
              <div className="p-4 border rounded-lg shadow-sm bg-gray-50 space-y-3">
                <div className="text-base font-semibold">
                  Attendance Information
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 text-xs">Check In</div>
                    <div>{selectedEntry.clockIn || "-"}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Check Out</div>
                    <div>{selectedEntry.clockOut || "-"}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Work Hours</div>
                    <div>{selectedEntry.workHours || "0h"}</div>
                  </div>
                </div>
              </div>

              {/* Box 3: Location Info */}
              <div className="p-4 border rounded-lg shadow-sm bg-gray-50 space-y-3">
                <div className="text-base font-semibold">
                  Location Information
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 text-xs">Location</div>
                    <div>Kantor Pusat</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Detail Address</div>
                    <div>Jl. Veteran No. 1, Kota Malang</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 text-xs">Lat</div>
                    <div>{(Math.random() * -90 + 90).toFixed(6)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Long</div>
                    <div>{(Math.random() * 180 - 90).toFixed(6)}</div>
                  </div>
                </div>
              </div>

              {/* Approval */}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Checkclock;
