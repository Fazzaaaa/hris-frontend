'use client';

import { useState } from 'react';
import { FaHourglassHalf, FaRegCalendarCheck, FaRegCalendarMinus, FaCalendarTimes } from 'react-icons/fa';
import { useRouter } from "next/navigation";

// Import Recharts components secara langsung
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';


// Data untuk kartu header (Waktu Kerja, Tepat Waktu, Terlambat, Absen)
const userDataCards = [
  { id: 'workHours', title: 'Jam Kerja Saya', value: '160h 45m', icon: <FaHourglassHalf className="text-blue-500" /> },
  { id: 'onTime', title: 'Tepat Waktu', value: '25', icon: <FaRegCalendarCheck className="text-green-500" /> },
  { id: 'late', title: 'Terlambat', value: '3', icon: <FaRegCalendarMinus className="text-yellow-500" /> },
  { id: 'absent', title: 'Absen', value: '1', icon: <FaCalendarTimes className="text-red-500" /> },
];

// Data Ringkasan Presensi (mirip chart admin, tapi untuk user)
const userAttendanceSummary = [
  { name: 'Present', value: 25 },
  { name: 'Permit', value: 2 },
  { name: 'Leave', value: 1 },
  { name: 'Sick', value: 0 },
];
const ATTENDANCE_COLORS = ['#34D399', '#FBBF24', '#EF4444', '#60A5FA']; // Green, Amber, Red, Blue

// Data Ringkasan Cuti (Annual Leave)
const userLeaveSummary = {
  totalQuota: 12,
  taken: 4,
  remaining: 8,
};

// Data Jam Kerja Harian (mirip bar chart admin)
const userWorkHoursData = [
  { date: 'Sen, 20 Mei', 'Jam Kerja': 8 },
  { date: 'Sel, 21 Mei', 'Jam Kerja': 7.5 },
  { date: 'Rab, 22 Mei', 'Jam Kerja': 8 },
  { date: 'Kam, 23 Mei', 'Jam Kerja': 0 }, // Cuti/libur
  { date: 'Jum, 24 Mei', 'Jam Kerja': 8 },
  { date: 'Sab, 25 Mei', 'Jam Kerja': 4 },
  { date: 'Min, 26 Mei', 'Jam Kerja': 0 },
];

// Opsi bulan untuk dropdown (generasi sama dengan admin)
const generateMonthOptions = () => {
  const options = [];
  const current = new Date();
  for (let i = 0; i < 6; i++) {
    const date = new Date(current.getFullYear(), current.getMonth() - i, 1);
    options.push(date.toLocaleString('id', { month: 'long', year: 'numeric' }));
  }
  return options;
};
const monthOptions = generateMonthOptions();

// Opsi rentang waktu untuk Cuti
const leaveTimeRangeOptions = ['Bulan Ini', '3 Bulan Terakhir', '6 Bulan Terakhir', 'Tahun Ini'];


// --- Komponen Pembantu ---

// Komponen Kartu (mirip Card dari Shadcn UI)
const Card = ({ title, value, icon }: { title: string; value: string; icon?: React.ReactNode }) => {
  return (
    <div className="relative rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col items-start gap-2">
      {icon && (
        <div className="absolute top-4 left-4 text-3xl opacity-80">
          {icon}
        </div>
      )}
      <p className="text-sm font-medium text-muted-foreground pl-10">{title}</p>
      <h3 className="text-2xl font-bold text-foreground pl-10">{value}</h3>
      <p className="text-xs text-muted-foreground pt-2">
        Update: {new Date().toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
      </p>
    </div>
  );
};

// Komponen Dropdown (mirip Select dari Shadcn UI, tanpa @radix-ui/react-icons)
const CustomDropdown = ({ options, selected, setSelected }: { options: string[], selected: string, setSelected: (value: string) => void }) => {
  return (
    <div className="relative">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="appearance-none bg-background border border-input h-9 px-3 py-1 text-sm rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-ring focus:border-primary pr-8"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {/* Menggunakan ikon panah SVG sederhana */}
      <svg
        className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

// --- Komponen Utama Dashboard User ---
export default function UserDashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);
  const [selectedLeavePeriod, setSelectedLeavePeriod] = useState(leaveTimeRangeOptions[0]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Anda</h1>

      {/* Header Cards: Work Hours, On Time, Late, Absent */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {userDataCards.map((card) => (
          <Card key={card.id} title={card.title} value={card.value} icon={card.icon} />
        ))}
      </div>

      {/* Attendance Summary & Leave Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Summary (Pie Chart) */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Ringkasan Kehadiran</h2>
            <CustomDropdown options={monthOptions} selected={selectedMonth} setSelected={setSelectedMonth} />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 h-64">
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie
                  data={userAttendanceSummary}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }: {name: string, percent: number}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {userAttendanceSummary.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={ATTENDANCE_COLORS[index % ATTENDANCE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number, name: string) => [`${value} Hari`, name]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col space-y-2">
              {userAttendanceSummary.map((entry, index) => (
                <div key={entry.name} className="flex items-center text-sm text-gray-700">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: ATTENDANCE_COLORS[index % ATTENDANCE_COLORS.length] }}></span>
                  {entry.name}: {entry.value} Hari
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leave Summary */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Ringkasan Cuti</h2>
            <CustomDropdown options={leaveTimeRangeOptions} selected={selectedLeavePeriod} setSelected={setSelectedLeavePeriod} />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
              <span className="font-semibold text-gray-700">Total Kuota Cuti Tahunan</span>
              <span className="text-xl font-bold text-gray-900">{userLeaveSummary.totalQuota} Hari</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-blue-700">Sudah Diambil</p>
                <p className="text-2xl font-bold text-blue-800 mt-1">{userLeaveSummary.taken} Hari</p>
                {/* <a href="#" className="text-xs text-blue-600 hover:underline"></a> */}
              </div>
              <div className="bg-green-50 p-4 rounded-md">
                <p className="text-sm text-green-700">Sisa Kuota</p>
                <p className="text-2xl font-bold text-green-800 mt-1">{userLeaveSummary.remaining} Hari</p>
                {/* <a href="#" className="text-xs text-green-600 hover:underline">Ajukan Cuti &rarr;</a> */}
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors" onClick={() => useRouter().push('/user/checkclock')}>
              Ajukan Cuti Baru
            </button>
          </div>
        </div>
      </div>

      {/* Your Work Hours (Bar Chart) */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Jam Kerja Anda</h2>
          <CustomDropdown options={['Minggu Ini', 'Bulan Ini']} selected={'Minggu Ini'} setSelected={() => {}} />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userWorkHoursData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} className="text-xs" />
            <YAxis unit=" jam" axisLine={false} tickLine={false} className="text-xs" />
            <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} formatter={(value: number) => [`${value} jam`, 'Jam Kerja']} />
            <Bar dataKey="Jam Kerja" fill="#1C3D5A" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}