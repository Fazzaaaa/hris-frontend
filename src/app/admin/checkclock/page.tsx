"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/context/PageTitleContext";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
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
    nama: "Sony Febri Hari Wibowo",
    jabatan: "tes",
    clockIn: "09:28 AM",
    clockOut: "04:00 PM",
    workHours: "10h 5m",
    approval: null,
    status: "",
  },
  {
    image: "",
    nama: "Anisa Rahma",
    jabatan: "Developer",
    clockIn: "08:00 AM",
    clockOut: "04:00 PM",
    workHours: "8h 0m",
    approval: null,
    status: "",
  },
  {
    image: "",
    nama: "Budi Santoso",
    jabatan: "QA Engineer",
    clockIn: "00:00",
    clockOut: "00:00",
    workHours: "0",
    approval: null,
    status: "",
  },
];

const Checkclock = () => {
  const { setTitle } = usePageTitle();
  const router = useRouter();
  setTitle("Checkclock");

  const [data, setData] = useState(checkclockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  const determineStatus = (entry: (typeof checkclockData)[0]) => {
    if (
      entry.clockIn === "00:00" &&
      entry.clockOut === "00:00" &&
      entry.workHours === "0"
    ) {
      return { text: "Absent", color: "bg-blue-500 text-white" };
    }

    // 👇 Tambahkan kondisi default "Waiting Approval"
    if (entry.approval === null) {
      return { text: "Waiting Approval", color: "bg-yellow-500 text-white" };
    }

    if (entry.approval === true) {
      return { text: "Approved", color: "bg-green-600 text-white" };
    }

    if (entry.approval === false) {
      return { text: "Rejected", color: "bg-red-600 text-white" };
    }

    const clockInHour = parseInt(entry.clockIn.split(":")[0], 10);
    const clockInMin = parseInt(entry.clockIn.split(":")[1], 10);
    const isAM = entry.clockIn.toLowerCase().includes("am");

    let totalMinutes = (clockInHour % 12) * 60 + clockInMin;
    if (!isAM) totalMinutes += 12 * 60;

    if (totalMinutes <= 480) {
      return { text: "On Time", color: "bg-green-500 text-white" };
    }

    return { text: "Late", color: "bg-red-500 text-white" };
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
              <th className="px-4 py-2 text-left">Jabatan</th>
              <th className="px-4 py-2 text-left">Clock In</th>
              <th className="px-4 py-2 text-left">Clock Out</th>
              <th className="px-4 py-2 text-left">Work Hours</th>
              <th className="px-4 py-2 text-left">Approve</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Details</th>
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
                    <td className="px-4 py-2 flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                        style={{ backgroundColor: "#B93B53" }}
                      >
                        {entry.nama.charAt(0)}
                      </div>
                      <span>{entry.nama}</span>
                    </td>
                    <td className="px-4 py-2">{entry.jabatan}</td>
                    <td className="px-4 py-2">{entry.clockIn}</td>
                    <td className="px-4 py-2">{entry.clockOut}</td>
                    <td className="px-4 py-2">{entry.workHours}</td>
                    <td className="px-4 py-2 space-y-1 flex flex-col">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            onClick={() => {
                              setShowConfirm(index);
                              setApprovalAction("accept");
                            }}
                            className="px-2 py-1 w-full text-green-600 border rounded hover:bg-green-50"
                          >
                            Approve
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
                            <AlertDialogAction onClick={confirmApproval}>
                              Yes, Approve
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            onClick={() => {
                              setShowConfirm(index);
                              setApprovalAction("reject");
                            }}
                            className="px-2 py-1 w-full text-red-600 border rounded hover:bg-red-50"
                          >
                            Reject
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
                            <AlertDialogAction onClick={confirmApproval}>
                              Yes, Reject
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>

                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                      >
                        {statusInfo.text}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button className="px-2 py-1 border text-xs rounded-md hover:bg-gray-100">
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

      {/* Confirmation Modal */}
      {showConfirm !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-md text-sm w-80">
            <h3 className="font-semibold mb-2">Confirm {approvalAction}?</h3>
            <p className="mb-4">
              Are you sure you want to <strong>{approvalAction}</strong> this
              entry?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelApproval}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmApproval}
                className={`px-3 py-1 rounded text-white ${
                  approvalAction === "accept" ? "bg-green-600" : "bg-red-600"
                }`}
              >
                Yes, {approvalAction}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkclock;
