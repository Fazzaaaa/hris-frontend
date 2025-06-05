    'use client'

    // import DashboardLayout from '@/app/components/ui'
    import React, { useState } from 'react'
    import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Label,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    } from 'recharts'

    export default function DashboardPage() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState('Pilih Rentang Tanggal')
    const [selectedMonth, setSelectedMonth] = useState('Juni 2025')
    const [monthDropdownOpen, setMonthDropdownOpen] = useState(false)
    const [leaveDropdownOpen, setLeaveDropdownOpen] = useState(false)
    const [selectedLeaveRange, setSelectedLeaveRange] = useState('Rentang Waktu')

    // Tambahan dropdown baru untuk "view by week"
    const [weekDropdownOpen, setWeekDropdownOpen] = useState(false)
    const [selectedWeek, setSelectedWeek] = useState('View by Week')

    const dateOptions = ['7 Hari Terakhir', '30 Hari Terakhir', 'Bulan Ini']
    const monthOptions = ['Mei 2025', 'Juni 2025', 'Juli 2025']
    const weekOptions = ['Week 1', 'Week 2', 'Week 3', 'Week 4']

    const handleOptionClick = (option: string) => {
        setSelectedOption(option)
        setDropdownOpen(false)
    }

    const handleMonthSelect = (month: string) => {
        setSelectedMonth(month)
        setMonthDropdownOpen(false)
    }

    const handleLeaveRangeSelect = (range: string) => {
        setSelectedLeaveRange(range)
        setLeaveDropdownOpen(false)
    }

    const handleWeekSelect = (week: string) => {
        setSelectedWeek(week)
        setWeekDropdownOpen(false)
    }

    const pieData = [
        { name: 'Present', value: 40, color: '#247046' },
        { name: 'Permit', value: 20, color: '#2D8DFE' },
        { name: 'Leave', value: 15, color: '#C01005' },
        { name: 'Sick', value: 25, color: '#FEAA00' },
    ]

    // Data bar graph sesuai permintaan
    const barData = [
        { date: 'March 20', hours: 8 },
        { date: 'March 21', hours: 2 },
        { date: 'March 22', hours: 4 },
        { date: 'March 23', hours: 3 },
        { date: 'March 24', hours: 6.72 }, // 6hr 43m = 6 + 43/60 = 6.7167 approx
        { date: 'March 25', hours: 1.5 },
        { date: 'March 26', hours: 4 },
    ]

    return (
        // <DashboardLayout>
        <div className="p-6">
            {/* Dropdown Rentang Tanggal */}
            <div className="relative inline-block mb-6">
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-[250px] h-[50px] bg-white text-black rounded shadow-md flex items-center justify-between px-4 text-sm font-semibold"
            >
                {selectedOption}
                <span className="ml-2">&#x25BC;</span>
            </button>

            {dropdownOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-white text-black border border-gray-300 rounded shadow-md">
                {dateOptions.map((option, index) => (
                    <li
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                    {option}
                    </li>
                ))}
                </ul>
            )}
            </div>

            {/* 4 Kotak Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            <StatBox title="Work Hours" value="120h 54m" indicatorColor="#1D395E" />
            <StatBox title="On Time" value="20" indicatorColor="#2D8DFE" />
            <StatBox title="Late" value="5" indicatorColor="#FEAA00" />
            <StatBox title="Absent" value="10" indicatorColor="#C01005" />
            </div>

            {/* Dua Kotak Besar */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            {/* Kotak Kiri - Attendance Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Attendance Summary</h3>
                <div className="relative">
                    <button
                    onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded text-sm shadow-sm text-black"
                    >
                    {selectedMonth} <span className="ml-2">&#x25BC;</span>
                    </button>
                    {monthDropdownOpen && (
                    <ul className="absolute right-0 mt-1 w-[150px] bg-white border border-gray-300 rounded shadow-md z-10">
                        {monthOptions.map((month, index) => (
                        <li
                            key={index}
                            onClick={() => handleMonthSelect(month)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black"
                        >
                            {month}
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
                </div>

                {/* Pie Chart */}
                <div className="w-full h-64">
                <ResponsiveContainer>
                    <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        labelLine={false}
                    >
                        <Label
                        value="Total Presensi"
                        position="center"
                        style={{ fill: '#000', fontWeight: 'bold', fontSize: '14px' }}
                        />
                        {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    </PieChart>
                </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex justify-around mt-4">
                {pieData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm text-gray-700">{entry.name}</span>
                    </div>
                ))}
                </div>
            </div>

            {/* Kotak Kanan - Leave Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-black">Leave Summary</h3>
                <div className="relative">
                    <button
                    onClick={() => setLeaveDropdownOpen(!leaveDropdownOpen)}
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded text-sm shadow-sm text-black"
                    >
                    {selectedLeaveRange} <span className="ml-2">&#x25BC;</span>
                    </button>
                    {leaveDropdownOpen && (
                    <ul className="absolute right-0 mt-1 w-[150px] bg-white border border-gray-300 rounded shadow-md z-10">
                        {dateOptions.map((range, index) => (
                        <li
                            key={index}
                            onClick={() => handleLeaveRangeSelect(range)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black"
                        >
                            {range}
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
                </div>

                {/* Total Quota */}
                <div className="border border-gray-500 rounded-md p-4">
                <div className="text-base text-black font mb-1 flex items-center">
                    <span className="inline-block w-4 h-4 bg-gray-500 rounded-full mr-2"></span>
                    Total Quota Annual Leave
                </div>
                <div className="text-3xl font-extrabold text-black mb-3 text-center">12 Days</div>
                <div className="text-sm text-gray-500 border-t pt-2 cursor-pointer">Request Leave →</div>
                </div>

                {/* Taken & Remaining */}
                <div className="grid grid-cols-2 gap-4">
                {/* Kotak Taken */}
                <div className="border border-gray-500 rounded-md p-4">
                    <div className="text-sm text-black font mb-1 flex items-center">
                    <span className="inline-block w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                    Taken
                    </div>
                    <div className="text-xl font-extrabold text-black mb-3">4 Days</div>
                    <div className="text-sm text-gray-500 border-t pt-2 cursor-pointer">See Details →</div>
                </div>

                {/* Kotak Remaining */}
                <div className="border border-gray-500 rounded-md p-4">
                    <div className="text-sm text-black font mb-1 flex items-center">
                    <span className="inline-block w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                    Remaining
                    </div>
                    <div className="text-xl font-extrabold text-black mb-3">8 Days</div>
                    <div className="text-sm text-gray-500 border-t pt-2 cursor-pointer">Request Leaves →</div>
                </div>
                </div>
            </div>
            </div>

            {/* Tambahan Kotak Besar di bawah */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-black">Your Work Hours</h3>
                <div className="relative">
                <button
                    onClick={() => setWeekDropdownOpen(!weekDropdownOpen)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded text-sm shadow-sm text-black flex items-center"
                >
                    {selectedWeek} <span className="ml-2">&#x25BC;</span>
                </button>
                {weekDropdownOpen && (
                    <ul className="absolute right-0 mt-1 w-[150px] bg-white border border-gray-300 rounded shadow-md z-10">
                    {weekOptions.map((week, index) => (
                        <li
                        key={index}
                        onClick={() => handleWeekSelect(week)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black"
                        >
                        {week}
                        </li>
                    ))}
                    </ul>
                )}
                </div>
            </div>

            {/* Work Hours Display */}
            <div className="text-4xl font-extrabold text-black mb-6">120h 54m</div>

            {/* Bar Graph */}
            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis
                    label={{ value: 'Hours', angle: -90, position: 'insideLeft', dy: 50 }}
                    domain={[0, 10]}
                    tickCount={6}
                />
                <XAxis dataKey="date" />
                <Tooltip />
                <Bar
                    dataKey="hours"
                    fill="#CBD5E1"
                    activeBar={{ fill: "#1D395E" }}
                    radius={[5, 5, 0, 0]}
                />
                </BarChart>
                </ResponsiveContainer>
            </div>
            </div>
        </div>
        // </DashboardLayout>
    )
    }

function StatBox({
  title,
  value,
  indicatorColor,
}: {
  title: string
  value: string | number
  indicatorColor: string
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-center text-black border border-gray-200">
      <div className="flex items-center mb-2">
        <span
          className="w-10 h-10 rounded-sm mr-2"
          style={{ backgroundColor: indicatorColor }}
        ></span>
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <div className="text-3xl font-extrabold">{value}</div>
    </div>
  )
}

