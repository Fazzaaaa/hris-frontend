import { FiBell, FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar({ title }: { title: string })  {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white text-black w-full shadow-md">
      {/* Kiri: Judul */}
      <h1 className="text-lg font-bold ">
        {title}
      </h1>

      {/* Tengah: Search Bar */}
      <div className="flex items-center bg-white rounded-md px-2 py-1 w-1/3 text-black outline outline-gray-400">

        <FiSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none w-full"
        />
      </div>

      {/* Kanan: Icon dan Info User */}
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-full hover:bg-white hover:text-[#1C3D5A] transition">
          <FiBell className="text-lg" />
        </div>
        <FaUserCircle className="text-2xl" />
        <span className="text-sm">   ⏷</span>
      </div>
    </div>
  );
}