import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-[#2D8DFE]">
        <Navbar title="Checkclock" />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
