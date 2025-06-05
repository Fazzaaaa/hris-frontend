'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  MdSpaceDashboard,
  MdGroups,
  MdAccessTime,
  MdAssignment,
  MdPayments,
  MdLogout,
  MdDrafts,
} from 'react-icons/md';

type SidebarIconProps = {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
};

const SidebarIcon: React.FC<SidebarIconProps> = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`group flex items-center gap-4 p-3 rounded-md w-full transition-colors duration-300 overflow-hidden whitespace-nowrap
      ${active ? 'bg-white text-[#1e3a5f]' : 'text-gray-400 hover:bg-[#1C3D5A] hover:text-white'}`}
  >
    <div className="text-2xl">{icon}</div>
    <span className="text-sm hidden group-hover/sidebar:inline-block">{label}</span>
  </button>
);

const adminMenuItems = [
  { icon: <MdSpaceDashboard />, path: '/admin/dashboard', label: 'Dashboard' },
  { icon: <MdGroups />, path: '/admin/employee', label: 'Employee' },
  { icon: <MdAccessTime />, path: '/admin/checkclock', label: 'Checkclock' },
  { icon: <MdDrafts />, path: '/admin/letter-management', label: 'Letter Manager' },
  { icon: <MdPayments />, path: '/pricing', label: 'Payment Plan' },
  { icon: <MdLogout />, path: '/log-out', label: 'Log out' },
];

const userMenuItems = [
  { icon: <MdSpaceDashboard />, path: '/user/dashboard', label: 'Dashboard' },
  { icon: <MdAccessTime />, path: '/user/checkclock', label: 'Checkclock' },
  { icon: <MdAssignment />, path: '/user/letter-management', label: 'Letter' },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  // State untuk menu items dan activePath agar render di client stabil
  const [menuItems, setMenuItems] = useState<typeof adminMenuItems | typeof userMenuItems>([]);
  const [activePath, setActivePath] = useState<string>("");

  useEffect(() => {
    if (!pathname) return;

    if (pathname.startsWith('/admin')) {
      setMenuItems(adminMenuItems);
    } else if (pathname.startsWith('/user')) {
      setMenuItems(userMenuItems);
    } else {
      setMenuItems([]);
    }

    setActivePath(pathname);
  }, [pathname]);

  // Jika menuItems kosong, render null atau loading supaya SSR dan Client tetap sama
  if (menuItems.length === 0) return null;

  return (
    <aside className="group/sidebar h-screen sticky top-0 transition-all duration-300 bg-[#1e3a5f] shadow-md hover:w-48 w-16">
      {/* Logo */}
      <div
        className="flex items-center gap-2 px-3 py-4 pl-5 cursor-pointer"
        onClick={() => {
          if (activePath.startsWith('/admin')) router.push('/admin/dashboard');
          else if (activePath.startsWith('/user')) router.push('/user/dashboard');
          else router.push('/');
        }}
      >
        <img src="/images/vector-hris.png" alt="Logo" className="w-6 h-auto" />
        <span className="hidden group-hover/sidebar:inline-block text-2xl font-semibold relative top-1 left-5 text-white">HRIS</span>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-2 mt-4 w-full px-2">
        {menuItems.map(({ icon, path, label }) => {
          const active = activePath === path || activePath.startsWith(path + '/');
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
    </aside>
  );
}
