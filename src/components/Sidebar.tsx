"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  MdSpaceDashboard,
  MdGroups,
  MdAccessTime,
  MdAssignment,
  MdPayments,
  MdLogout,
  MdDrafts,
  MdSupportAgent,
  MdPerson,
} from "react-icons/md";
import { logout } from "@/app/services/auth";

type SidebarIconProps = {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
};

const SidebarIcon: React.FC<SidebarIconProps> = ({
  icon,
  label,
  active = false,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`group flex items-center gap-4 p-3 rounded-md w-full transition-colors duration-300 overflow-hidden whitespace-nowrap
      ${
        active
          ? "bg-white text-[#1e3a5f]"
          : "text-gray-400 hover:bg-[#1C3D5A] hover:text-white"
      }`}
  >
    <div className="text-2xl">{icon}</div>
    <span className="text-sm hidden group-hover/sidebar:inline-block">
      {label}
    </span>
  </button>
);

const adminMenuItems = [
  { icon: <MdSpaceDashboard />, path: "/admin/dashboard", label: "Dashboard" },
  { icon: <MdGroups />, path: "/admin/employee", label: "Employee" },
  { icon: <MdAccessTime />, path: "/admin/checkclock", label: "Checkclock" },
  {
    icon: <MdDrafts />,
    path: "/admin/letter-management",
    label: "Letter Manager",
  },
  { icon: <MdPayments />, path: "/admin/pricing", label: "Payment Plan" },
];

const userMenuItems = [
  { icon: <MdSpaceDashboard />, path: "/user/dashboard", label: "Dashboard" },
  { icon: <MdAccessTime />, path: "/user/checkclock", label: "Checkclock" },
  { icon: <MdAssignment />, path: "/user/letter-management", label: "Letter Manager" },
  { icon: <MdPerson />, path: "/user/profile", label: "Profile" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [menuItems, setMenuItems] = useState<
    typeof adminMenuItems | typeof userMenuItems
  >([]);
  const [activePath, setActivePath] = useState<string>("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (!pathname) return;

    if (pathname.startsWith("/admin")) {
      setMenuItems(adminMenuItems);
    } else if (pathname.startsWith("/user")) {
      setMenuItems(userMenuItems);
    } else {
      setMenuItems([]);
    }

    setActivePath(pathname);
  }, [pathname]);

  if (menuItems.length === 0) return null;

  return (
    <>
      {/* Sidebar */}
        {/* Logo */}
      <aside className="group/sidebar h-screen sticky top-0 transition-all duration-300 bg-[#1e3a5f] shadow-md hover:w-48 w-16 flex flex-col">
        <div
          className="flex items-center gap-2 px-3 py-4 pl-5 cursor-pointer bg-white"
          onClick={() => {
            if (activePath.startsWith("/admin"))
              router.push("/admin/dashboard");
            else if (activePath.startsWith("/user"))
              router.push("/user/dashboard");
            else router.push("/");
          }}
        >
          <img
            src="/images/vector-hris.png"
            alt="Logo"
            className="w-6 h-auto"
          />
          <span className="hidden group-hover/sidebar:inline-block text-2xl font-semibold relative top-1 left-5 text-Black">
            HRIS
          </span>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-2 mt-4 w-full px-2">
          {menuItems.map(({ icon, path, label }) => {
            const active =
              activePath === path || activePath.startsWith(path + "/");
            return (
              <SidebarIcon
                key={path}
                icon={icon}
                label={label}
                active={active}
                onClick={() => router.push(path)}
              />
            );
          })}
        </div>

        {/* Customer Service + Logout */}
        <div className="mt-auto flex flex-col gap-2 px-2 pb-4">
          <SidebarIcon
            icon={<MdSupportAgent />}
            label="Customer Service"
            onClick={() =>
              (window.location.href = "mailto:marketing@cmlabs.co")
            }
          />
          <SidebarIcon
            icon={<MdLogout />}
            label="Log out"
            onClick={() => setShowLogoutModal(true)}
          />
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-[#5D5D5D]/[.72] z-50 flex justify-center items-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md text-center">
            <h2 className="text-xl font-bold mb-2">Logout Confirmation</h2>
            <p className="mb-6 text-sm">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={async () => {
                  try {
                    await logout(); // panggil fungsi logout
                    setShowLogoutModal(false);
                    router.push("/"); // redirect ke halaman utama
                  } catch (err) {
                    console.error("Logout gagal:", err);
                  }
                }}
                className="bg-[#1e3a5f] text-white px-5 py-2 rounded-md font-semibold"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="border border-[#1e3a5f] text-[#1e3a5f] px-5 py-2 rounded-md font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
