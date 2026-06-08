import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

// Navigation config — admin sidebar
export const adminNavItems = [
  { to: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/admin/moderasi', icon: 'verified_user', label: 'Moderasi Produk' },
  { to: '/admin/komoditas', icon: 'category', label: 'Kelola Komoditas' },
  { to: '/admin/harga-pasar', icon: 'price_change', label: 'Harga Pasar' },
  { to: '/admin/tren-harga', icon: 'trending_up', label: 'Tren Harga AI' },
]

export const adminFooterNavItems = [
  { to: '/admin/pengaturan', icon: 'settings', label: 'Pengaturan' },
]

// Navigation config — petani sidebar
export const petaniNavItems = [
  { to: '/petani/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/petani/produk', icon: 'inventory_2', label: 'Produk Saya' },
  { to: '/petani/pesanan', icon: 'shopping_cart_checkout', label: 'Order Masuk' },
  { to: '/petani/riwayat', icon: 'history', label: 'Riwayat Penjualan' },
  { to: '/petani/rekomendasi', icon: 'temp_preferences_custom', label: 'Rekomendasi AI' },
  { to: '/petani/profil', icon: 'person', label: 'Profil Akun' },
]

export const petaniFooterNavItems = [
  { to: '/petani/bantuan', icon: 'help', label: 'Bantuan' },
  { to: '/petani/pengaturan', icon: 'settings', label: 'Pengaturan' },
]

// Navigation config — pembeli sidebar
export const pembeliNavItems = [
  { to: '/pembeli/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/pembeli/browse', icon: 'storefront', label: 'Jelajahi Produk' },
  { to: '/pembeli/pesanan', icon: 'shopping_bag', label: 'Pesanan Saya' },
  { to: '/pembeli/riwayat', icon: 'receipt_long', label: 'Riwayat Pembelian' },
  { to: '/pembeli/profil', icon: 'person', label: 'Profil Akun' },
]

export const pembeliFooterNavItems = [
  { to: '/pembeli/bantuan', icon: 'help', label: 'Bantuan' },
]

export type NavItem = {
  to: string
  icon: string
  label: string
}

type SidebarProps = {
  navItems: NavItem[]
  footerNavItems?: NavItem[]
  role?: string
  userName?: string
  isOpen?: boolean
  onClose?: () => void
}

function NavItemLink({ item, onClick }: { item: NavItem; onClick?: () => void }) {
  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      className={({ isActive }) =>
        `sidebar-nav-link group ${isActive ? 'active' : ''}`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className="material-symbols-outlined transition-all duration-200"
            style={{
              fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            {item.icon}
          </span>
          <span className="text-sm font-medium tracking-wide">{item.label}</span>
        </>
      )}
    </NavLink>
  )
}

export function Sidebar({
  navItems,
  footerNavItems = [],
  role = 'Admin',
  userName = 'PanganLink',
  isOpen = true,
  onClose,
}: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()

  // close mobile sidebar on route change
  useEffect(() => {
    onClose?.()
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogout = () => {
    navigate('/')
  }

  const roleColor: Record<string, string> = {
    Admin: 'bg-primary text-white',
    Petani: 'bg-brand-green-light text-white',
    Pembeli: 'bg-tertiary text-white',
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar fixed left-0 top-0 h-full w-[256px] hidden lg:flex flex-col z-40 animate-slideInLeft">
        {/* Brand */}
        <div className="px-5 pt-7 pb-6">
          <div className="flex items-center gap-3">
            <div className="sidebar-brand-accent w-10 h-10 rounded-xl flex items-center justify-center shadow-soft flex-shrink-0">
              <span
                className="material-symbols-outlined text-white text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                eco
              </span>
            </div>
            <div>
              <h1 className="text-[17px] font-bold text-on-surface tracking-tight leading-tight">
                PanganLink
              </h1>
              <p className="text-[11px] text-secondary tracking-wide mt-0.5">Pasar Tani Digital</p>
            </div>
          </div>

          {/* Role badge */}
          <div className="mt-4 flex items-center gap-2">
            <span
              className={`text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wider uppercase ${
                roleColor[role] ?? 'bg-secondary-container text-on-secondary-container'
              }`}
            >
              {role}
            </span>
            <span className="text-[12px] text-secondary truncate">{userName}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-outline-variant/30 mx-4 mb-3" />

        {/* Nav links */}
        <nav className="flex-1 flex flex-col gap-0.5 overflow-y-auto px-1 pb-2">
          {navItems.map((item, i) => (
            <div key={item.to} className={`stagger-${Math.min(i + 1, 6)} opacity-0 animate-fadeUp`}>
              <NavItemLink item={item} />
            </div>
          ))}
        </nav>

        {/* Footer nav */}
        {footerNavItems.length > 0 && (
          <>
            <div className="h-px bg-outline-variant/30 mx-4 mt-2 mb-2" />
            <nav className="flex flex-col gap-0.5 px-1 pb-2">
              {footerNavItems.map((item) => (
                <NavItemLink key={item.to} item={item} />
              ))}
            </nav>
          </>
        )}

        {/* Logout */}
        <div className="px-3 pb-5">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-danger hover:bg-danger/8 transition-all duration-200 group">
            <span className="material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:translate-x-0.5">
              logout
            </span>
            <span className="text-sm font-medium">Keluar</span>
          </button>
        </div>

        {/* Bottom green accent bar */}
        <div className="h-1 sidebar-brand-accent opacity-60 rounded-none" />
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay fixed inset-0 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`sidebar fixed left-0 top-0 h-full w-[256px] flex flex-col z-50 lg:hidden
          transition-transform duration-300 ease-spring
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Brand */}
        <div className="px-5 pt-6 pb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="sidebar-brand-accent w-9 h-9 rounded-xl flex items-center justify-center shadow-soft flex-shrink-0">
              <span
                className="material-symbols-outlined text-white text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                eco
              </span>
            </div>
            <h1 className="text-[16px] font-bold text-on-surface">PanganLink</h1>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-secondary text-[20px]">close</span>
          </button>
        </div>

        <div className="h-px bg-outline-variant/30 mx-4 mb-3" />

        <nav className="flex-1 flex flex-col gap-0.5 overflow-y-auto px-1 pb-2">
          {navItems.map((item) => (
            <NavItemLink key={item.to} item={item} onClick={onClose} />
          ))}
        </nav>

        {footerNavItems.length > 0 && (
          <>
            <div className="h-px bg-outline-variant/30 mx-4 mt-2 mb-2" />
            <nav className="flex flex-col gap-0.5 px-1 pb-2">
              {footerNavItems.map((item) => (
                <NavItemLink key={item.to} item={item} onClick={onClose} />
              ))}
            </nav>
          </>
        )}

        <div className="px-3 pb-5">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-danger hover:bg-danger/8 transition-all duration-200">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span className="text-sm font-medium">Keluar</span>
          </button>
        </div>

        <div className="h-1 sidebar-brand-accent opacity-60" />
      </aside>
    </>
  )
}
