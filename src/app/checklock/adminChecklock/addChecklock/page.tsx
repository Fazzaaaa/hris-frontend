// components/AddCheckClock.js
"use client";
import { useState } from 'react';

const AddCheckClock = () => {
  const [employee, setEmployee] = useState('');
  const [absenceType, setAbsenceType] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  return (
    <div className="w-full h-screen p-5 bg-gray-100 text-black overflow-auto">
      <h2 className="text-2xl font-bold mb-5">Add Checkclock</h2>
      <div className="border border-black rounded p-6 bg-white shadow-md h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Employee</label>
            <select
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              className="border rounded w-full p-2"
            >
              <option value="">Choose employee</option>
              <option value="emp1">Employee 1</option>
              <option value="emp2">Employee 2</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border rounded w-full p-2"
            >
              <option value="">Choose location</option>
              <option value="loc1">Location 1</option>
              <option value="loc2">Location 2</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Absence type</label>
            <select
              value={absenceType}
              onChange={(e) => setAbsenceType(e.target.value)}
              className="border rounded w-full p-2"
            >
              <option value="">Choose Absence type</option>
              <option value="clockIn">Clock In</option>
              <option value="clockOut">Clock Out</option>
              <option value="absent">Absent</option>
              <option value="annualLeave">Annual Leave</option>
              <option value="sickLeave">Sick Leave</option>
            </select>
          </div>

          <div className="border rounded w-full mt-1 h-56 bg-gray-200"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Kolom 1: Upload Supporting Evidence */}
          <div>
            <h3 className="font-bold">Upload Supporting Evidence</h3>
            <div className="border-dashed border-2 border-gray-300 p-5 text-center bg-gray-50">
              <p>Drag and Drop here or Browse</p>
            </div>
            <button className="mt-2 p-2 bg-blue-500 text-white rounded w-full">
              Upload Now
            </button>
          </div>

          {/* Kolom 2: Address Detail */}
          <div>
            <h3 className="font-bold">Address Detail</h3>
            <select
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border rounded w-full p-2 mt-1"
            >
              <option value="">Choose address</option>
            </select>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block mb-1">Lat</label>
                <input
                  type="text"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  placeholder="Lat Location"
                  className="border rounded w-full p-2"
                />
              </div>
              <div>
                <label className="block mb-1">Lang</label>
                <input
                  type="text"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  placeholder="Lang Location"
                  className="border rounded w-full p-2"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button className="p-2 bg-white text-red-500 border border-red-500 rounded hover:bg-red-50">
            Cancel
          </button>
          <button className="p-2 bg-green-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddCheckClock;
