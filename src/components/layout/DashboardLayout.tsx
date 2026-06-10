import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar, NavItem } from './Sidebar'
import { Topbar } from './Topbar'
import { authApi } from '../../lib/services'

type DashboardLayoutProps = {
  navItems: NavItem[]
  footerNavItems?: NavItem[]
  role?: string
  userName?: string // keeping this as fallback
}

export function DashboardLayout({
  navItems,
  footerNavItems,
  role,
  userName: fallbackUserName,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [realName, setRealName] = useState<string | null>(null)

  useEffect(() => {
    authApi.getMe().then((res: any) => {
      if (res && res.user && res.user.name) {
        setRealName(res.user.name)
      }
    }).catch(console.error)
  }, [])

  const displayUserName = realName || fallbackUserName

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        navItems={navItems}
        footerNavItems={footerNavItems}
        role={role}
        userName={displayUserName}
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
