"use client";

import { FiBell } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image"; // Import Next.js Image component
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Interface untuk user data
interface UserData {
  id: string;
  name: string;
  profileImage?: string; // URL foto profil
  role: 'admin' | 'user' | 'guest';
}

// Contoh data notifikasi
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
  userData?: UserData; // Tambahan prop untuk data user
};

export default function Nav({ title, userData }: NavbarProps) {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [currentUser, setCurrentUser] = useState<UserData | null>(userData || null);

  // Fallback username berdasarkan pathname jika userData tidak tersedia
  const fallbackUserName = pathname.startsWith("/user")
    ? "User"
    : pathname.startsWith("/admin")
    ? "Admin"
    : "Guest";

  const userName = currentUser?.name || fallbackUserName;
  const profileImage = currentUser?.profileImage;

  // Fungsi untuk mengambil data user (contoh implementasi)
  useEffect(() => {
    if (!userData) {
      // Simulasi fetch user data dari API/context/localStorage
      fetchUserData();
    }
  }, [userData]);

  const fetchUserData = async () => {
    try {
      // Contoh: ambil dari localStorage atau API
      const userFromStorage = localStorage.getItem('userData');
      if (userFromStorage) {
        setCurrentUser(JSON.parse(userFromStorage));
        return;
      }

      // Atau fetch dari API
      // const response = await fetch('/api/user/profile');
      // const userData = await response.json();
      // setCurrentUser(userData);
      
      // Untuk demo, set data dummy
      const dummyUser: UserData = {
        id: '1',
        name: 'John Doe',
        profileImage: '/images/profile-placeholder.jpg', // Path ke foto profil
        role: pathname.startsWith("/admin") ? 'admin' : 'user'
      };
      setCurrentUser(dummyUser);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setNotifications(prevNotifs =>
        prevNotifs.map(notif => ({ ...notif, read: true }))
      );
    }
  };

  const handleNotificationClick = (id: number) => {
    setNotifications(prevNotifs =>
      prevNotifs.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    console.log(`Notifikasi ID ${id} diklik!`);
  };

  // Komponen untuk menampilkan foto profil
  const ProfileImage = () => {
    if (profileImage) {
      return (
        <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300">
          <Image
            src={profileImage}
            alt={`${userName} profile`}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback jika gambar gagal dimuat
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <FaUserCircle className="text-2xl text-gray-400 hidden" />
        </div>
      );
    }
    
    // Fallback ke icon default
    return <FaUserCircle className="text-2xl text-gray-400" />;
  };

  return (
    <div className="top-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-white text-black shadow-md">
      {/* Kiri: Judul */}
      <h1 className="text-lg font-bold">{title}</h1>
      
      {/* Kanan: Icon dan Info User */}
      <div className="flex items-center gap-4">
        {/* Popover Notifikasi */}
        <Popover onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <div className="relative p-2 rounded-full hover:bg-gray-100 hover:text-[#1C3D5A] transition cursor-pointer">
              <FiBell className="text-lg" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {unreadNotificationsCount}
                </span>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0">
            <div className="p-3 border-b border-gray-200 font-semibold text-gray-800">
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

        {/* Profile Section */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-lg px-2 py-1 transition">
          <ProfileImage />
          <span className="text-sm font-medium">{userName}</span>
        </div>
      </div>
    </div>
  );
}