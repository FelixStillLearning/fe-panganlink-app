import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type TopbarProps = {
  onMenuClick: () => void
  title?: string
  subtitle?: string
  actions?: React.ReactNode
}

// Map route segments to page titles
const routeTitles: Record<string, { title: string; subtitle: string }> = {
  dashboard:  { title: 'Dashboard',         subtitle: 'Selamat datang kembali 👋' },
  moderasi:   { title: 'Moderasi Produk',   subtitle: 'Kelola produk yang menunggu persetujuan' },
  komoditas:  { title: 'Kelola Komoditas',  subtitle: 'Atur kategori dan data komoditas' },
  'harga-pasar': { title: 'Harga Pasar',    subtitle: 'Pantau dan perbarui harga pasar terkini' },
  'tren-harga':  { title: 'Tren Harga AI',  subtitle: 'Analisis prediksi harga berbasis AI' },
  produk:     { title: 'Produk Saya',       subtitle: 'Kelola semua produk yang Anda jual' },
  pesanan:    { title: 'Pesanan',           subtitle: 'Daftar order masuk dari pembeli' },
  riwayat:    { title: 'Riwayat Transaksi', subtitle: 'Semua transaksi yang telah selesai' },
  rekomendasi:{ title: 'Rekomendasi AI',    subtitle: 'Saran cerdas dari Prophet AI' },
  profil:     { title: 'Profil Akun',       subtitle: 'Kelola informasi profil Anda' },
  browse:     { title: 'Jelajahi Produk',   subtitle: 'Temukan produk segar langsung dari petani' },
  pengaturan: { title: 'Pengaturan',        subtitle: 'Konfigurasi akun dan aplikasi' },
  bantuan:    { title: 'Bantuan',           subtitle: 'Pusat bantuan dan FAQ' },
}

export function Topbar({ onMenuClick, title, subtitle, actions }: TopbarProps) {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-detect page title from route
  const segments = location.pathname.split('/').filter(Boolean)
  const lastSegment = segments[segments.length - 1] ?? ''
  const routeInfo = routeTitles[lastSegment]
  const pageTitle    = title    ?? routeInfo?.title    ?? 'PanganLink'
  const pageSubtitle = subtitle ?? routeInfo?.subtitle ?? ''

  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <header
      className={`topbar sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 py-3 transition-shadow duration-300 ${
        scrolled ? 'shadow-card' : ''
      }`}
    >
      {/* Left: hamburger (mobile) + page title */}
      <div className="flex items-center gap-4">
        {/* Hamburger – mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-surface-container transition-colors duration-200 group"
          aria-label="Buka menu"
        >
          <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors">
            menu
          </span>
        </button>

        {/* Page info */}
        <div>
          <h2 className="text-[16px] md:text-[18px] font-bold text-on-surface leading-tight">
            {pageTitle}
          </h2>
          {pageSubtitle && (
            <p className="text-[12px] text-secondary hidden md:block mt-0.5 leading-none">
              {pageSubtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right: actions / date / avatar */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Date – desktop */}
        <span className="hidden md:inline-block text-[11px] text-secondary bg-surface-container px-3 py-1.5 rounded-full tracking-wide">
          {today}
        </span>

        {/* Custom actions slot */}
        {actions}

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-surface-container transition-colors duration-200 group">
          <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors text-[20px]">
            notifications
          </span>
          {/* Notification dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-white" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-full sidebar-brand-accent flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-soft">
            <span
              className="material-symbols-outlined text-white text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              person
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
