import { createBrowserRouter, Navigate } from 'react-router-dom'

import { DashboardLayout } from '../components/layout'
import {
  adminNavItems, adminFooterNavItems,
  petaniNavItems, petaniFooterNavItems,
  pembeliNavItems, pembeliFooterNavItems,
} from '../components/layout'

import { LandingPage }          from '../features/landing/LandingPage'
import { LoginPage }            from '../features/auth/LoginPage'
import { RegisterPage }         from '../features/auth/RegisterPage'
import { AdminDashboardPage }   from '../features/admin/AdminDashboardPage'
import { ModerasiProdukPage }   from '../features/admin/ModerasiProdukPage'
import { KelolaKomoditasPage }  from '../features/admin/KelolaKomoditasPage'
import { HargaPasarPage }       from '../features/admin/HargaPasarPage'
import { TrenHargaPage }        from '../features/admin/TrenHargaPage'
import { AdminPengaturanPage }  from '../features/admin/AdminPengaturanPage'
import { PetaniDashboardPage }  from '../features/petani/PetaniDashboardPage'
import { PembeliDashboardPage } from '../features/pembeli/PembeliDashboardPage'
import { PembeliBrowsePage }    from '../features/pembeli/PembeliBrowsePage'
import { PembeliPesananPage }   from '../features/pembeli/PembeliPesananPage'
import { PembeliRiwayatPage }   from '../features/pembeli/PembeliRiwayatPage'
import { PembeliProfilPage }    from '../features/pembeli/PembeliProfilPage'
import { PembeliBantuanPage }   from '../features/pembeli/PembeliBantuanPage'
import { PembeliKeranjangPage } from '../features/pembeli/PembeliKeranjangPage'
import { CartProvider }         from '../store/CartContext'

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
    { path: 'pengaturan', element: <AdminPengaturanPage /> },
  ],
}

import { PetaniProdukPage }      from '../features/petani/PetaniProdukPage'
import { PetaniPesananPage }     from '../features/petani/PetaniPesananPage'
import { PetaniRiwayatPage }     from '../features/petani/PetaniRiwayatPage'
import { PetaniRekomendasiPage } from '../features/petani/PetaniRekomendasiPage'
import { PetaniProfilPage }      from '../features/petani/PetaniProfilPage'
import { PetaniBantuanPage }     from '../features/petani/PetaniBantuanPage'
import { PetaniPengaturanPage }  from '../features/petani/PetaniPengaturanPage'

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
    { path: 'produk',      element: <PetaniProdukPage /> },
    { path: 'pesanan',     element: <PetaniPesananPage /> },
    { path: 'riwayat',     element: <PetaniRiwayatPage /> },
    { path: 'rekomendasi', element: <PetaniRekomendasiPage /> },
    { path: 'profil',      element: <PetaniProfilPage /> },
    { path: 'bantuan',     element: <PetaniBantuanPage /> },
    { path: 'pengaturan',  element: <PetaniPengaturanPage /> },
  ],
}

// ===== PEMBELI Layout =====
const pembeliLayout = {
  element: (
    <CartProvider>
      <DashboardLayout
        navItems={pembeliNavItems}
        footerNavItems={pembeliFooterNavItems}
        role="Pembeli"
        userName="Rini Melati"
      />
    </CartProvider>
  ),
  children: [
    { index: true, element: <Navigate to="/pembeli/dashboard" replace /> },
    { path: 'dashboard', element: <PembeliDashboardPage /> },
    { path: 'browse',    element: <PembeliBrowsePage /> },
    { path: 'pesanan',   element: <PembeliPesananPage /> },
    { path: 'riwayat',   element: <PembeliRiwayatPage /> },
    { path: 'keranjang', element: <PembeliKeranjangPage /> },
    { path: 'profil',    element: <PembeliProfilPage /> },
    { path: 'bantuan',   element: <PembeliBantuanPage /> },
  ],
}

export const router = createBrowserRouter([
  // Public routes
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },

  // Admin routes
  { path: '/admin', ...adminLayout },

  // Petani routes
  { path: '/petani', ...petaniLayout },

  // Pembeli routes
  { path: '/pembeli', ...pembeliLayout },

  // 404 fallback
  { path: '*', element: <Navigate to="/admin/dashboard" replace /> },
])
