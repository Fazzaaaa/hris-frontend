"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const checkclockData = [
  { image: "", nama: "Sony Febri Hari Wibowo", jabatan: "tes", clockIn: "09:28 AM", clockOut: "04:00 PM", workHours: "10h 5m", approval: "accept", status: "On Time" },
  { image: "", nama: "Sony Febri Hari Wibowo", jabatan: "tes", clockIn: "09:28 AM", clockOut: "04:00 PM", workHours: "10h 5m", approval: "accept", status: "On Time" },
  { image: "", nama: "Sony Febri Hari Wibowo", jabatan: "tes", clockIn: "09:30 AM", clockOut: "04:30 PM", workHours: "9h 50m", approval: "accept", status: "Late" },
  { image: "", nama: "Sony Febri Hari Wibowo", jabatan: "tes", clockIn: "09:30 AM", clockOut: "04:30 PM", workHours: "9h 50m", approval: "accept", status: "Late" },
  { image: "", nama: "Sony Febri Hari Wibowo", jabatan: "tes", clockIn: "09:00 AM", clockOut: "04:15 PM", workHours: "10h 30m", approval: "accept", status: "On Time" },
  { image: "", nama: "Sony Febri Hari Wibowo", jabatan: "tes", clockIn: "09:00 AM", clockOut: "04:15 PM", workHours: "10h 30m", approval: "accept", status: "On Time" },
  { image: "", nama: "Sony Febri Hari Wibowo", jabatan: "tes", clockIn: "09:15 AM", clockOut: "03:15 PM", workHours: "6h 15m", approval: "accept", status: "Late" },
  { image: "", nama: "Sony Febri Hari Wibowo", jabatan: "tes", clockIn: "0", clockOut: "0", workHours: "0", approval: "accept", status: "Sick Leave" },
  { image: "", nama: "Sony Febri Hari Wibowo", jabatan: "tes", clockIn: "09:00 AM", clockOut: "03:30 PM", workHours: "9h 45m", approval: "accept", status: "On Time" },
  { image: "", nama: "Sony Febri Hari Wibowo", jabatan: "tes", clockIn: "09:30 AM", clockOut: "03:00 PM", workHours: "9h 45m", approval: "accept", status: "On Time" },
  { image: "", nama: "Sony Febri Hari Wibowo", jabatan: "tes", clockIn: "09:30 AM", clockOut: "03:00 PM", workHours: "9h 45m", approval: "accept", status: "On Time" },
  { image: "", nama: "Sony Febri Hari Wibowo", jabatan: "tes", clockIn: "09:30 AM", clockOut: "03:00 PM", workHours: "9h 45m", approval: "accept", status: "On Time" },
  { image: "", nama: "Sony Febri Hari Wibowo", jabatan: "tes", clockIn: "09:30 AM", clockOut: "03:00 PM", workHours: "9h 45m", approval: "accept", status: "On Time" },
  { image: "", nama: "Sony Febri Hari Wibowo", jabatan: "tes", clockIn: "0", clockOut: "0", workHours: "0", approval: "accept", status: "Annual Leave" },
  { image: "", nama: "Sony Febri Hari Wibowo", jabatan: "tes", clockIn: "09:45 AM", clockOut: "04:15 PM", workHours: "10h", approval: "accept", status: "Late" },
  { image: "", nama: "Sony Febri Hari Wibowo", jabatan: "tes", clockIn: "09:30 AM", clockOut: "04:00 PM", workHours: "8h 30m", approval: "accept", status: "On Time" },
];

const Checkclock = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = checkclockData.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(checkclockData.length / itemsPerPage);

  const nextPage = () => currentPage < pageCount && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const goToAddPage = () => {
    router.push("http://localhost:3000/pages/admin/checkclock/addCheckclock");
  };

  return (
    <div className="w-screen min-h-screen p-5 bg-white text-black">
      <div className="flex items-center gap-3 mb-4 ml-10 mr-10 flex-wrap">
        <h1 className="text-2xl font-bold">Checkclock Overview</h1>
        <input
          type="text"
          placeholder="Search Employee"
          className="p-2 border rounded-md flex-1 min-w-[200px]"
        />
        <button className="p-2 bg-white-200 border border-black text-black rounded-md whitespace-nowrap">
          Filter
        </button>
        <button onClick={goToAddPage} className="p-2 bg-gray-500 text-white rounded-md whitespace-nowrap">
          + Tambah Data
        </button>
      </div>

      <div className="m-10 overflow-x-auto">
        <table className="min-w-full bg-white table-auto">
          <thead>
            <tr className="bg-white-100 text-left">
              <th className="py-2 px-4 border-b w-1/5">Employee Name</th>
              <th className="py-2 px-4 border-b w-1/6">Jabatan</th>
              <th className="py-2 px-4 border-b w-1/6">Clock In</th>
              <th className="py-2 px-4 border-b w-1/6">Clock Out</th>
              <th className="py-2 px-4 border-b w-1/6">Work Hours</th>
              <th className="py-2 px-4 border-b w-1/6">Approve</th>
              <th className="py-2 px-4 border-b w-1/6">Status</th>
              <th className="py-2 px-4 border-b w-1/6">Detail</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center space-x-3">
                    <img
                      src={entry.image || "https://via.placeholder.com/40"}
                      alt={entry.nama}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="whitespace-nowrap">{entry.nama}</span>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">{entry.jabatan}</td>
                <td className="py-2 px-4 border-b">{entry.clockIn}</td>
                <td className="py-2 px-4 border-b">{entry.clockOut}</td>
                <td className="py-2 px-4 border-b">{entry.workHours}</td>
                <td className="py-2 px-4 border-b">{entry.approval}</td>
                <td className="py-2 px-4 border-b">
                  <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded whitespace-nowrap">
                    {entry.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="p-2 bg-white text-black rounded-md border border-gray-300">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mr-10 ml-10 mt-10 flex-wrap gap-2">
        <div>
          <span>Showing </span>
          <select onChange={handleItemsPerPageChange} value={itemsPerPage} className="ml-1 p-1 border rounded-md">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
        <span className="text-gray-500">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, checkclockData.length)} out of {checkclockData.length} records
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1 rounded-md ${
                currentPage === pageNum
                  ? "bg-gray-300 text-white font-bold"
                  : "bg-white text-gray-500"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Checkclock;
