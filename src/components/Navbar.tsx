"use client";

import { FiBell } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Import Popover components

// Contoh data notifikasi (sama seperti sebelumnya)
interface Notification {
  id: number;
  message: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: 1, message: "Karyawan baru Juanita telah ditambahkan.", timestamp: "2 jam lalu", read: false },
];

type NavbarProps = {
  title: string;
  toggleSidebar?: () => void;
};

export default function Nav({ title }: { title: string }) {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  // State untuk mengontrol popover visibility tidak diperlukan secara eksplisit lagi
  // Popover Shadcn akan mengelola itu secara internal.

  const userName =
    pathname.startsWith("/user")
      ? "User"
      : pathname.startsWith("/admin")
      ? "Admin"
      : "Guest";

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Fungsi untuk menandai notifikasi sebagai dibaca saat popover dibuka
  const handleOpenChange = (open: boolean) => {
    if (open) { // Jika popover sedang dibuka
      setNotifications(prevNotifs =>
        prevNotifs.map(notif => ({ ...notif, read: true }))
      );
    }
    // Jika ditutup, tidak perlu melakukan apa-apa di sini kecuali ada logika khusus
  };

  const handleNotificationClick = (id: number) => {
    // Logika untuk menangani klik pada notifikasi individual
    setNotifications(prevNotifs =>
      prevNotifs.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    console.log(`Notifikasi ID ${id} diklik!`);
  };

  return (
    <div
      className="top-0 w-full z-50** flex items-center justify-between px-6 py-3 bg-white text-black shadow-md"
    >
      {/* Kiri: Judul */}
      <h1 className="text-lg font-bold ">{title}</h1>
      {/* Kanan: Icon dan Info User */}
      <div className="flex items-center gap-4">
        {/* Menggunakan Popover dari Shadcn/ui */}
        <Popover onOpenChange={handleOpenChange}> {/* Tambahkan onOpenChange */}
          <PopoverTrigger asChild>
            <div className="relative p-2 rounded-full hover:bg-white hover:text-[#1C3D5A] transition cursor-pointer">
              <FiBell className="text-lg" />
              {/* Bubble Notifikasi Merah */}
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {unreadNotificationsCount}
                </span>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0"> {/* Sesuaikan lebar dan padding PopoverContent */}
            <div className="p-3 border-b border-gray-200 font-semibold text-gray-800 ">
              Notifikasi ({unreadNotificationsCount} Belum Dibaca)
            </div>
            {notifications.length === 0 ? (
              <div className="p-3 text-gray-500">Tidak ada notifikasi.</div>
            ) : (
              <ul className="max-h-60 overflow-y-auto">
                {notifications.map((notif) => (
                  <li
                    key={notif.id}
                    className={`p-3 text-sm border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      notif.read ? "text-gray-500" : "font-medium text-gray-800 bg-blue-50"
                    }`}
                    onClick={() => handleNotificationClick(notif.id)}
                  >
                    <p>{notif.message}</p>
                    <p className="text-xs text-gray-400">{notif.timestamp}</p>
                  </li>
                ))}
              </ul>
            )}
            <div className="p-2 border-t border-gray-200 text-center">
              <button
                onClick={() => console.log("Lihat semua notifikasi")}
                className="text-blue-600 hover:underline text-sm"
              >
                Lihat Semua Notifikasi
              </button>
            </div>
          </PopoverContent>
        </Popover>
        <FaUserCircle className="text-2xl" />
        <span className="text-sm">{userName}</span>
      </div>
    </div>
  );
}