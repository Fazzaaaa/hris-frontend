// components/dashboard/AddCheckclockForm.tsx
"use client";

import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CloudUpload, XCircle } from "lucide-react";

// Data simulasi untuk dropdown
const mockEmployees = [
  { id: "emp1", name: "John Doe" },
  { id: "emp2", name: "Jane Smith" },
  { id: "emp3", name: "Peter Jones" },
  { id: "emp4", name: "Alice Brown" },
  { id: "emp5", name: "Bob Johnson" },
];

const mockLocations = [
  { id: "loc1", name: "Kantor Pusat Malang", lat: "-7.9814", lang: "112.6247" }, // Malang Center
  { id: "loc2", name: "Cabang Surabaya", lat: "-7.2575", lang: "112.7521" },
  { id: "loc3", name: "Gudang Lawang", lat: "-7.8285", lang: "112.7161" },
];

const mockAbsenceTypes = [
  { id: "clock_in", name: "Clock In" },
  { id: "clock_out", name: "Clock Out" },
  { id: "absent", name: "Absent" },
  { id: "annual_leave", name: "Annual Leave" },
  { id: "sick_leave", name: "Sick Leave" },
];

export default function AddCheckclockForm() {
  const router = useRouter();

  // State untuk form
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(mockEmployees);
  const [selectedAbsenceType, setSelectedAbsenceType] = useState<string>("");
  const [clockInTime, setClockInTime] = useState<string>("");
  const [clockOutTime, setClockOutTime] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [addressDetail, setAddressDetail] = useState<string>("");
  const [latLocation, setLatLocation] = useState<string>("");
  const [langLocation, setLangLocation] = useState<string>("");
  const [supportingEvidence, setSupportingEvidence] = useState<File | null>(null);
  // Default map ke pusat Malang
  const [mapUrl, setMapUrl] = useState("https://maps.google.com/maps?q=-7.9814,112.6247&hl=en&z=13&output=embed");
  useEffect(() => {
    setFilteredEmployees(
      mockEmployees.filter((emp) =>
        emp.name.toLowerCase().includes(employeeSearch.toLowerCase())
      )
    );
  }, [employeeSearch]);

  // Handle perubahan lokasi untuk update Lat/Lang dan Map
  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);

    if (value === "live") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude.toString();
          const lng = position.coords.longitude.toString();
          setLatLocation(lat);
          setLangLocation(lng);
          setMapUrl(`https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=13&output=embed`);
        });
      }
    } else {
      const location = mockLocations.find((loc) => loc.id === value);
      if (location) {
        setLatLocation(location.lat);
        setLangLocation(location.lang);
        setMapUrl(`https://maps.google.com/maps?q=${location.lat},${location.lang}&hl=en&z=13&output=embed`);
      }
    }
  };

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSupportingEvidence(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSupportingEvidence(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClearFile = () => {
    setSupportingEvidence(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika pengiriman data ke backend (API Laravel Anda)
    console.log({
      selectedEmployee,
      selectedAbsenceType,
      clockInTime,
      clockOutTime,
      selectedLocation,
      addressDetail,
      latLocation,
      langLocation,
      supportingEvidence: supportingEvidence?.name, // Hanya nama file untuk log
    });

    // Contoh pengiriman data menggunakan FormData untuk file upload
    const formData = new FormData();
    formData.append("employee_id", selectedEmployee);
    formData.append("absence_type", selectedAbsenceType);
    if (selectedAbsenceType === "clock_in") {
      formData.append("clock_in_time", clockInTime);
    }
    if (selectedAbsenceType === "clock_out") {
      formData.append("clock_out_time", clockOutTime);
    }
    formData.append("location_id", selectedLocation);
    formData.append("address_detail", addressDetail);
    formData.append("latitude", latLocation);
    formData.append("longitude", langLocation);
    if (supportingEvidence) {
      formData.append("supporting_evidence", supportingEvidence);
    }

    // Contoh fetch ke API Laravel Anda (ganti dengan endpoint sebenarnya)
    // fetch('/api/checkclock', {
    //   method: 'POST',
    //   body: formData,
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    //   alert('Data absensi berhasil ditambahkan!');
    //   router.push('/admin/checkclock');
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    //   alert('Gagal menambahkan data absensi.');
    // });

    alert("Data absensi berhasil ditambahkan (simulasi)!");
    router.push("/admin/checkclock");
  };

  const handleCancel = () => {
    console.log("Form cancelled");
    router.push("/admin/checkclock");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-extrabold text-gray-800">Add Checkclock</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Left Column */}
          <div className="flex flex-col space-y-6">
            <div className="space-y-2">
              <Label htmlFor="employee" className="text-sm font-medium text-gray-700">
                Karyawan
              </Label>
              <Input
                placeholder="Ketik nama karyawan..."
                value={employeeSearch}
                onChange={(e) => setEmployeeSearch(e.target.value)}
              />
              {employeeSearch && (
                <div className="border rounded shadow bg-white max-h-40 overflow-y-auto">
                  {filteredEmployees.map((emp) => (
                    <div
                      key={emp.id}
                      onClick={() => {
                        setSelectedEmployee(emp.id);
                        setEmployeeSearch(emp.name);
                      }}
                      className="cursor-pointer hover:bg-gray-100 px-3 py-1"
                    >
                      {emp.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="absence-type" className="text-sm font-medium text-gray-700">Tipe Absensi</Label>
              <Select onValueChange={setSelectedAbsenceType} value={selectedAbsenceType}>
                <SelectTrigger id="absence-type" className="w-full">
                  <SelectValue placeholder="Choose Absence type" />
                </SelectTrigger>
                <SelectContent>
                  {mockAbsenceTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Conditional Time Inputs */}
            {(selectedAbsenceType === "clock_in" || selectedAbsenceType === "clock_out") && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="clock-in" className="text-sm font-medium text-gray-700">Clock In</Label>
                  <Input
                    id="clock-in"
                    type="time"
                    value={clockInTime}
                    onChange={(e) => setClockInTime(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clock-out" className="text-sm font-medium text-gray-700">Clock Out</Label>
                  <Input
                    id="clock-out"
                    type="time"
                    value={clockOutTime}
                    onChange={(e) => setClockOutTime(e.target.value)}
                    className="w-full"
                  />
                </div>
              </>
            )}

            {/* Placeholder for other absence types */}
            {/* {selectedAbsenceType && !["clock_in", "clock_out"].includes(selectedAbsenceType) && (
              <div className="text-sm text-gray-500 italic p-2 border border-gray-200 rounded-md bg-gray-50">
                No time inputs needed for {mockAbsenceTypes.find(t => t.id === selectedAbsenceType)?.name}.
              </div>
            )} */}

            {/* Upload Supporting Evidence */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Upload supporting evidence</Label>
              <div
                className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center hover:border-gray-400 transition-colors duration-200 cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('file-upload')?.click()} // Klik div untuk buka file explorer
              >
                {supportingEvidence ? (
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-sm font-medium text-gray-700">{supportingEvidence.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={(e) => { e.stopPropagation(); handleClearFile(); }} // Stop propagation agar tidak memicu click parent
                      className="text-red-500 hover:text-red-700"
                    >
                      <XCircle className="h-5 w-5" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <CloudUpload className="mx-auto h-16 w-16 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-[#257047]">Drag and Drop here</span> or{" "}
                      <span className="underline text-[#257047] hover:text-[#1f5a3a]">Browse</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
                  </>
                )}
                <Input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
              </div>
              {supportingEvidence && (
                <Button type="button" className="w-full bg-[#257047] hover:bg-[#1f5a3a]">
                  Upload Now
                </Button>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col space-y-6">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                Location
              </Label>
              <Select onValueChange={handleLocationChange} value={selectedLocation}>
                <SelectTrigger id="location" className="w-full">
                  <SelectValue placeholder="Choose location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="live">Gunakan Lokasi Sekarang</SelectItem>
                  {mockLocations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Google Maps Placeholder */}
            <div className="w-full h-64 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address-detail" className="text-sm font-medium text-gray-700">Address Detail</Label>
              <Input
                id="address-detail"
                placeholder="Enter address detail"
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lat-location" className="text-sm font-medium text-gray-700">Lat</Label>
                <Input
                  id="lat-location"
                  placeholder="Lat Location"
                  value={latLocation}
                  onChange={(e) => setLatLocation(e.target.value)}
                  className="w-full"
                  readOnly // Karena ini akan terisi otomatis dari select location
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lang-location" className="text-sm font-medium text-gray-700">Lang</Label>
                <Input
                  id="lang-location"
                  placeholder="Lang Location"
                  value={langLocation}
                  onChange={(e) => setLangLocation(e.target.value)}
                  className="w-full"
                  readOnly // Karena ini akan terisi otomatis dari select location
                />
              </div>
            </div>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <Button variant="outline" onClick={handleCancel} className="px-6 py-2">
            Cancel
          </Button>
          <Button className="bg-[#257047] hover:bg-[#1f5a3a] px-6 py-2" onClick={handleSubmit} type="submit">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}