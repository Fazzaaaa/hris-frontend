'use client'

import React from 'react'
import Sidebar from '@/app/components/sidebar'
import Navbar from '@/app/components/navbar'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const getTitleFromPath = (path: string) => {
    const parts = path.split('/').filter(Boolean)
    const lastPart = parts[parts.length - 1] || 'Dashboard'
    return lastPart
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const title = getTitleFromPath(pathname)

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title={title} />
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  )
}