'use client'

import { LeftPage } from './components/LeftPage'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-screen items-center gap-10 bg-gray-300 p-10 pl-0 dark:bg-gray-950">
      <LeftPage />
      <div
        style={{ height: 'calc(100vh - 50px)' }}
        className="flex-1 rounded-lg bg-white p-10 dark:bg-black"
      >
        {children}
      </div>
    </div>
  )
}
