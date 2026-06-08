import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar, NavItem } from './Sidebar'
import { Topbar } from './Topbar'

type DashboardLayoutProps = {
  navItems: NavItem[]
  footerNavItems?: NavItem[]
  role?: string
  userName?: string
}

export function DashboardLayout({
  navItems,
  footerNavItems,
  role,
  userName,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        navItems={navItems}
        footerNavItems={footerNavItems}
        role={role}
        userName={userName}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-[256px] min-h-screen">
        {/* Topbar */}
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 animate-fadeIn">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
