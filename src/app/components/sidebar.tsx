import {
    MdOutlineSpaceDashboard,
    MdGroups,
    MdAccessTime,
    MdAssignment,
    MdCalendarToday,
  } from "react-icons/md";
  import { useState } from "react";
  
  export default function Sidebar() {
    const [activeIndex, setActiveIndex] = useState(0); // 0 = dashboard aktif awalnya
  
    const icons = [
      <MdOutlineSpaceDashboard />,
      <MdGroups />,
      <MdAccessTime />,
      <MdAssignment />,
      <MdCalendarToday />,
    ];
  
    return (
      <div className="w-16 h-screen bg-[#2f5a80] flex flex-col items-center py-4 gap-6 shadow-md">
        {/* Logo */}
        <img src="/images/vector-hris.png" alt="Logo HRIS" className="w-6 h-auto" />
  
        {/* Menu Items */}
        <div className="flex flex-col items-center gap-6 mt-4">
          {icons.map((icon, index) => (
            <SidebarIcon
              key={index}
              icon={icon}
              active={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    );
  }

  function SidebarIcon({ icon, active = false, onClick }: { icon: React.ReactNode; active?: boolean; onClick: () => void }) {
    return (
      <div
        onClick={onClick}
        className={`
          group p-2 rounded-lg cursor-pointer transition 
          ${active ? "bg-white" : "hover:bg-white"}
        `}
      >
        <div
          className={`text-2xl ${
            active ? "text-[#1C3D5A]" : "text-white group-hover:text-[#1C3D5A]"
          }`}
        >
          {icon}
        </div>
      </div>
    );
  }
  