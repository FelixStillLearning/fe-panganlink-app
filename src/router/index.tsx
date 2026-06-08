import { createBrowserRouter, Navigate } from 'react-router-dom'

import { DashboardLayout } from '../components/layout'
import {
  adminNavItems, adminFooterNavItems,
  petaniNavItems, petaniFooterNavItems,
  pembeliNavItems, pembeliFooterNavItems,
} from '../components/layout'

import { LandingPage }          from '../features/landing/LandingPage'
import { AdminDashboardPage }   from '../features/admin/AdminDashboardPage'
import { ModerasiProdukPage }   from '../features/admin/ModerasiProdukPage'
import { KelolaKomoditasPage }  from '../features/admin/KelolaKomoditasPage'
import { HargaPasarPage }       from '../features/admin/HargaPasarPage'
import { TrenHargaPage }        from '../features/admin/TrenHargaPage'
import { PetaniDashboardPage }  from '../features/petani/PetaniDashboardPage'
import { PembeliDashboardPage } from '../features/pembeli/PembeliDashboardPage'
import { PlaceholderPage }      from '../features/shared/PlaceholderPage'

// ===== ADMIN Layout =====
const adminLayout = {
  element: (
    <DashboardLayout
      navItems={adminNavItems}
      footerNavItems={adminFooterNavItems}
      role="Admin"
      userName="Super Admin"
    />
  ),
  children: [
    { index: true, element: <Navigate to="/admin/dashboard" replace /> },
    { path: 'dashboard',  element: <AdminDashboardPage /> },
    { path: 'moderasi',   element: <ModerasiProdukPage /> },
    { path: 'komoditas',  element: <KelolaKomoditasPage /> },
    { path: 'harga-pasar', element: <HargaPasarPage /> },
    { path: 'tren-harga', element: <TrenHargaPage /> },
    { path: 'pengaturan', element: <PlaceholderPage title="Pengaturan" /> },
  ],
}

// ===== PETANI Layout =====
const petaniLayout = {
  element: (
    <DashboardLayout
      navItems={petaniNavItems}
      footerNavItems={petaniFooterNavItems}
      role="Petani"
      userName="Budi Santoso"
    />
  ),
  children: [
    { index: true, element: <Navigate to="/petani/dashboard" replace /> },
    { path: 'dashboard',   element: <PetaniDashboardPage /> },
    { path: 'produk',      element: <PlaceholderPage title="Produk Saya" /> },
    { path: 'pesanan',     element: <PlaceholderPage title="Order Masuk" /> },
    { path: 'riwayat',     element: <PlaceholderPage title="Riwayat Penjualan" /> },
    { path: 'rekomendasi', element: <PlaceholderPage title="Rekomendasi AI" /> },
    { path: 'profil',      element: <PlaceholderPage title="Profil Akun" /> },
    { path: 'bantuan',     element: <PlaceholderPage title="Bantuan" /> },
    { path: 'pengaturan',  element: <PlaceholderPage title="Pengaturan" /> },
  ],
}

// ===== PEMBELI Layout =====
const pembeliLayout = {
  element: (
    <DashboardLayout
      navItems={pembeliNavItems}
      footerNavItems={pembeliFooterNavItems}
      role="Pembeli"
      userName="Rini Melati"
    />
  ),
  children: [
    { index: true, element: <Navigate to="/pembeli/dashboard" replace /> },
    { path: 'dashboard', element: <PembeliDashboardPage /> },
    { path: 'browse',    element: <PlaceholderPage title="Jelajahi Produk" /> },
    { path: 'pesanan',   element: <PlaceholderPage title="Pesanan Saya" /> },
    { path: 'riwayat',   element: <PlaceholderPage title="Riwayat Pembelian" /> },
    { path: 'profil',    element: <PlaceholderPage title="Profil Akun" /> },
    { path: 'bantuan',   element: <PlaceholderPage title="Bantuan" /> },
  ],
}

export const router = createBrowserRouter([
  // Landing Page
  { path: '/', element: <LandingPage /> },

  // Admin routes
  { path: '/admin', ...adminLayout },

  // Petani routes
  { path: '/petani', ...petaniLayout },

  // Pembeli routes
  { path: '/pembeli', ...pembeliLayout },

  // 404 fallback
  { path: '*', element: <Navigate to="/admin/dashboard" replace /> },
])
