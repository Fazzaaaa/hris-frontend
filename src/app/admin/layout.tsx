'use client'

import React from 'react'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const getTitleFromPath = (path: string) => {
    const parts = path.split('/').filter(Boolean)
    const lastPart = parts[parts.length - 1] || 'Admin'
    return lastPart
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const title = getTitleFromPath(pathname)

  return (
<div className="flex min-h-screen bg-[#7CA5BF]">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-[#7ca5bf]">
        <Navbar title={title}/>
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  )
}