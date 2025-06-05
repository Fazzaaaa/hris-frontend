"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from '@/context/PageTitleContext';

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
  const { setTitle } = usePageTitle();
  setTitle("Checkclock");

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
    router.push("http://localhost:3000/admin/checkclock/addChecklock");
  };

  return (
    <div className="w-full min-h-screen p-3 bg-white text-black text-sm rounded-lg">
      <div className="flex items-center gap-2 mb-3 mx-5 flex-wrap">
        <h1 className="text-xl font-semibold">Checkclock Overview</h1>
        <input
          type="text"
          placeholder="Search Employee"
          className="p-1 border rounded-md flex-1 min-w-[150px]"
        />
        <button className="p-1 border border-black text-black rounded-md whitespace-nowrap">
          Filter
        </button>
        <button onClick={goToAddPage} className="p-1 bg-gray-500 text-white rounded-md whitespace-nowrap">
          + Tambah Data
        </button>
      </div>

      <div className="mx-5 overflow-x-auto">
        <table className="min-w-full bg-white table-auto text-xs">
          <thead>
            <tr className="bg-white-100 text-left">
              <th className="py-1 px-2 border-b">Employee</th>
              <th className="py-1 px-2 border-b">Jabatan</th>
              <th className="py-1 px-2 border-b">In</th>
              <th className="py-1 px-2 border-b">Out</th>
              <th className="py-1 px-2 border-b">Hours</th>
              <th className="py-1 px-2 border-b">Approve</th>
              <th className="py-1 px-2 border-b">Status</th>
              <th className="py-1 px-2 border-b">Detail</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-1 px-2 border-b">
                  <div className="flex items-center space-x-2">
                    <img
                      src={entry.image || "https://via.placeholder.com/32"}
                      alt={entry.nama}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="whitespace-nowrap">{entry.nama}</span>
                  </div>
                </td>
                <td className="py-1 px-2 border-b">{entry.jabatan}</td>
                <td className="py-1 px-2 border-b">{entry.clockIn}</td>
                <td className="py-1 px-2 border-b">{entry.clockOut}</td>
                <td className="py-1 px-2 border-b">{entry.workHours}</td>
                <td className="py-1 px-2 border-b">{entry.approval}</td>
                <td className="py-1 px-2 border-b">
                  <span className="inline-block bg-gray-200 text-gray-700 px-2 py-0.5 rounded whitespace-nowrap">
                    {entry.status}
                  </span>
                </td>
                <td className="py-1 px-2 border-b">
                  <button className="px-2 py-0.5 bg-white text-black rounded-md border border-gray-300 text-xs">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mx-5 mt-5 flex-wrap gap-2 text-sm">
        <div>
          <span>Show </span>
          <select onChange={handleItemsPerPageChange} value={itemsPerPage} className="ml-1 p-1 border rounded-md">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
        <span className="text-gray-500">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, checkclockData.length)} of {checkclockData.length}
        </span>
        <div className="flex items-center gap-1 flex-wrap">
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-2 py-1 rounded-md text-xs ${
                currentPage === pageNum
                  ? "bg-gray-300 text-white font-bold"
                  : "bg-white text-gray-500 border border-gray-200"
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
