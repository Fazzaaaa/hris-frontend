'use client';
import { useState } from 'react';
import { FaUserClock, FaUserCheck, FaUserPlus, FaUserTimes } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Generate 6 bulan terakhir dari sekarang
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

const dataBar = [
  { name: 'Now', value: 15 },
  { name: 'Active', value: 22 },
  { name: 'Resign', value: 12 },
];


// Warna untuk Pie Chart
const COLORS = ['#2E7D32', '#FF9800', '#EF4444'];
const dataPie = [
  { name: 'On time', value: 289 },
  { name: 'Late', value: 89 },
  { name: 'Absent', value: 23 },
];

const statusData = [
  { label: 'Tetap permanen', value: 23 },
  { label: 'Tetap percobaan', value: 46 },
  { label: 'PKWT (Kontrak)', value: 64 },
  { label: 'Magang', value: 75 },
];

const attendanceList = [
  { no: 1, name: 'Kaka', status: 'On time', time: '07:59' },
  { no: 2, name: 'Faza', status: 'Late', time: '08:03' },
  { no: 3, name: 'Rio', status: 'On time', time: '07:04' },
  { no: 4, name: 'Sony', status: 'Late', time: '08:00' },
];


function AdminDashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);

  return (
    <div className="p-6 space-y-6">
      {/* Header Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Total Employee" value="208" icon={<FaUserClock />} />
        <Card title="New Employees" value="20" icon={<FaUserPlus />} />
        <Card title="Active Employees" value="15" icon={<FaUserCheck />} />
        <Card title="Resigned Employees" value="10" icon={<FaUserTimes />} />
      </div>

      {/* Grafik Statistik */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="flex justify-between items-center mb-10">
            <div>
              <p className="font-bold text-m text-gray-500">Employee Statistics</p>
              <h2 className="font-bold text-lg text-gray-800"> Current Number of Employees</h2>
            </div>
            <Dropdown selected={selectedMonth} setSelected={setSelectedMonth} />
          </div>
          <BarChart width={600} height={300} data={dataBar}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {dataBar.map((entry, index) => {
                    let fillColor = '#1C3D5A'; // default fallback
                    if (entry.name === 'Now') fillColor = '#FFAB00';
                    else if (entry.name === 'Active') fillColor = '#c11106';
                    else if (entry.name === 'Resign') fillColor = '#257047';
                    return <Cell key={`cell-${index}`} fill={fillColor} />;
                    })}
                </Bar>
        </BarChart>
        </div>

        {/* Employee Status */}
        <div className="bg-white rounded-lg p-6 shadow">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <div>
                <p className="font-bold text-m text-gray-400">Employee Statistics</p>
                <h2 className="font-bold text-lg text-gray-800">Employees Status</h2>
                </div>
                <Dropdown selected={selectedMonth} setSelected={setSelectedMonth} />
            </div>

            {/* Wrapper dengan grid lines */}
            <div className="relative">
                {/* Dashed vertical lines */}
                <div className="absolute inset-0 flex justify-between z-0 pointer-events-none">
                        {[0, 1, 2, 3, 4].map((_, index) =>
                            index === 0 || index === 4 ? (
                            <div key={index} className="w-[1px]" />
                            ) : (
                            <div
                                key={index}
                                className="border-l border-dashed border-gray-300"
                                style={{ height: "100%" }}
                            />
                            )
                        )}
                </div>


                {/* Status Bars */}
                <div className="space-y-5 z-10 relative">
                    {statusData.map((item) => (
                        <div key={item.label}>
                        <div className="flex justify-between text-sm font-medium mb-1 text-gray-800">
                            <span>{item.label}</span>
                            <span>{item.value}</span>
                        </div>
                        <div className="relative w-full h-3 rounded bg-[#F5F6FA]">
                            <div
                            className="absolute top-0 left-0 h-3 bg-gray-300 rounded"
                            style={{ width: `${(item.value / 150) * 100}%` }}
                            />
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* Pie & Tabel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        
        <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-start mb-10 ml-10 mt-5">
                {/* Pie Chart di kiri */}
                <div className="flex-shrink-0">
                    <PieChart width={300} height={300}>
                        <Pie
                        data={dataPie}
                        cx="50%"
                        cy="50%"
                        outerRadius={125}
                        label
                        dataKey="value"
                        >
                        {dataPie.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>
                    </PieChart>
                </div>
                {/* Keterangan di kanan dengan margin kiri lebih besar */}
                <div className="flex flex-col justify-between ml-25 mt-15">
                    <div>
                        <p className="font-bold text-m text-gray-500">Statistics</p>
                        <h2 className="font-bold text-lg text-gray-800">Attendance</h2>
                    </div>
                    <span className="font-bold text-sm text-gray-300">Today</span>

                    <div className="mt-4 space-y-2 text-sm text-black">
                        {dataPie.map((entry, index) => {
                            // Tentukan warna sesuai nama atau index, contoh pakai COLORS
                            const colorMap = {
                            'On time': '#2E7D32',
                            'Late': '#FF9800',
                            'Absent': '#EF4444',
                            };
                            const color = colorMap[entry.name as keyof typeof colorMap] || '#000';

                            return (
                            <p key={index}>
                                <span
                                className="inline-block w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: color }}
                                ></span>
                                {entry.name}: {entry.value}
                            </p>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>


        {/* Attendance Table */}
        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-bold text-lg text-gray-500">Attendance</h2>
            <Dropdown selected={selectedMonth} setSelected={setSelectedMonth} />
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b bg-[#C3C3C3] ">
                <th className="pl-3 py-3">No</th>
                <th >Name</th>
                <th className=''>Attendance Status</th>
                <th>Check In</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((user) => (
                <tr key={user.no} className="border-b text-gray-500 outline-1 outline-[#C3C3C3]">
                  <td className="pl-4 py-2">{user.no}</td>
                  <td>{user.name}</td>
                  <td>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium
                      ${user.status === 'On time' ? 'bg-green-100 text-green-800' :
                        user.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Dropdown Bulan
function Dropdown({ selected, setSelected }: { selected: string, setSelected: (val: string) => void }) {
  return (
    <select
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      className="text-sm bg-[#D9D9D9] text-black rounded px-3 py-1 outline-2 outline-[#bdbdbd]"
    >
      {monthOptions.map((month) => (
        <option key={month} value={month}>{month}</option>
      ))}
    </select>
  );
}

// Kartu
function Card({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="relative bg-white p-4 rounded-lg shadow flex flex-col items-start gap-2 border border-gray-300">
      {/* Kotak icon pojok kanan atas */}
      <div className="absolute top-3 left-3 bg-[#1e3a5f] text-white rounded-md p-1.5 shadow-md text-xl">
        {icon}
      </div>

      {/* Judul utama */}
      <p className="text-base pl-10  text-gray-600 font-semibold text">{title}</p>

      {/* Nilai di bawah judul */}
      <h2 className="pl-1 pt-1 text-2xl font-bold text-black">{value}</h2>

        <div className="my-1 h-px bg-gray-200 w-full" />

      {/* Update time */}
      <p className="text-xs text-gray-400">
        Update: {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
      </p>
    </div>
  );
}

// Export dinamis
export default dynamic(() => Promise.resolve(AdminDashboardPage), { ssr: false });