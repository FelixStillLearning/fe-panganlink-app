import { useState, useEffect, useRef } from 'react'
import { adminApi } from '../../lib/services'

export function AdminPengaturanPage() {
  const [activeTab, setActiveTab] = useState('profil')
  const [loading, setLoading] = useState(true)

  const [profile, setProfile] = useState({ name: '', email: '', location: '', role: '', foto_url: '' })
  const [system, setSystem] = useState({ auto_retrain: true, default_predict_range: 30 })
  const [notification, setNotification] = useState({
    notif_new_product: true,
    notif_anomaly: true,
    notif_report: true,
    notif_system: false,
  })
  const [security, setSecurity] = useState({ password: '', newPassword: '', confirmPassword: '' })

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const res: any = await adminApi.getSettings()
      if (res.data) {
        setProfile(res.data.profile || { name: '', email: '', location: '', role: '', foto_url: '' })
        setSystem(res.data.system || { auto_retrain: true, default_predict_range: 30 })
        setNotification(res.data.notification || { notif_new_product: true, notif_anomaly: true, notif_report: true, notif_system: false })
      }
    } catch (error) {
      console.error('Failed to fetch settings', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async () => {
    try {
      await adminApi.updateSettings({ tab: 'profil', profile })
      alert('Profil berhasil diperbarui')
    } catch (error) {
      alert('Gagal memperbarui profil')
    }
  }

  const handleUpdateSystem = async () => {
    try {
      await adminApi.updateSettings({ tab: 'sistem', system })
      alert('Konfigurasi sistem berhasil diperbarui')
    } catch (error) {
      alert('Gagal memperbarui sistem')
    }
  }

  const handleUpdateNotification = async () => {
    try {
      await adminApi.updateSettings({ tab: 'notifikasi', notification })
      alert('Preferensi notifikasi berhasil diperbarui')
    } catch (error) {
      alert('Gagal memperbarui notifikasi')
    }
  }

  const handleUpdateSecurity = async () => {
    if (security.newPassword !== security.confirmPassword) {
      alert('Konfirmasi kata sandi tidak cocok')
      return
    }
    try {
      await adminApi.updateSettings({ tab: 'keamanan', security: { password: security.newPassword } })
      alert('Keamanan berhasil diperbarui')
      setSecurity({ password: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      alert('Gagal memperbarui keamanan')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile({ ...profile, foto_url: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  if (loading) return <div className="p-8 text-center text-secondary">Memuat pengaturan...</div>

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Pengaturan Sistem</h2>
        <p className="text-sm text-secondary mt-1">Kelola konfigurasi platform PanganLink dan preferensi akun Anda.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 flex flex-col gap-1">
          <button 
            onClick={() => setActiveTab('profil')}
            className={`px-4 py-3 rounded-lg text-sm font-semibold flex items-center gap-3 transition-colors text-left ${activeTab === 'profil' ? 'bg-primary-container text-white shadow-sm' : 'text-secondary hover:bg-surface-container-low hover:text-primary'}`}
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
            Profil Akun
          </button>
          <button 
            onClick={() => setActiveTab('sistem')}
            className={`px-4 py-3 rounded-lg text-sm font-semibold flex items-center gap-3 transition-colors text-left ${activeTab === 'sistem' ? 'bg-primary-container text-white shadow-sm' : 'text-secondary hover:bg-surface-container-low hover:text-primary'}`}
          >
            <span className="material-symbols-outlined text-[20px]">settings_applications</span>
            Konfigurasi Sistem
          </button>
          <button 
            onClick={() => setActiveTab('notifikasi')}
            className={`px-4 py-3 rounded-lg text-sm font-semibold flex items-center gap-3 transition-colors text-left ${activeTab === 'notifikasi' ? 'bg-primary-container text-white shadow-sm' : 'text-secondary hover:bg-surface-container-low hover:text-primary'}`}
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            Notifikasi
          </button>
          <button 
            onClick={() => setActiveTab('keamanan')}
            className={`px-4 py-3 rounded-lg text-sm font-semibold flex items-center gap-3 transition-colors text-left ${activeTab === 'keamanan' ? 'bg-primary-container text-white shadow-sm' : 'text-secondary hover:bg-surface-container-low hover:text-primary'}`}
          >
            <span className="material-symbols-outlined text-[20px]">security</span>
            Keamanan
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-surface-container-lowest rounded-xl shadow-soft border border-outline-variant/30 overflow-hidden">
          
          {/* TAB: Profil */}
          {activeTab === 'profil' && (
            <div className="animate-fadeIn">
              <div className="p-6 border-b border-outline-variant/30">
                <h3 className="text-lg font-bold text-on-surface">Informasi Profil</h3>
                <p className="text-sm text-on-surface-variant">Perbarui foto dan detail informasi pribadi Anda.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-6">
                  {profile.foto_url ? (
                    <img src={profile.foto_url} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-primary-container/20" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold border-2 border-primary-container/20">
                      {profile.name ? profile.name.substring(0, 2).toUpperCase() : 'SA'}
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm font-semibold hover:bg-surface-container-low transition-colors shadow-sm"
                    >
                      Ubah Foto
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/jpeg, image/png, image/gif" 
                      onChange={handleFileChange} 
                    />
                    <span className="text-xs text-on-surface-variant">JPG, GIF atau PNG. Maksimal 5MB.</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-secondary mb-1">Nama Lengkap</label>
                    <input 
                      className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all" 
                      type="text" 
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-1">Email</label>
                    <input 
                      className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all" 
                      type="email" 
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-1">Jabatan</label>
                    <input 
                      className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-sm text-on-surface-variant cursor-not-allowed" 
                      type="text" 
                      value={profile.role || 'Administrator Sistem'} 
                      readOnly 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-1">Nomor Telepon</label>
                    <input 
                      className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all" 
                      type="tel" 
                      value={profile.location}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-surface-container-low border-t border-outline-variant/30 flex justify-end gap-3">
                <button 
                  onClick={handleUpdateProfile}
                  className="px-6 py-2 rounded-lg text-sm font-semibold bg-primary-container text-white shadow-sm hover:shadow-soft transition-all"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          )}

          {/* TAB: Konfigurasi Sistem */}
          {activeTab === 'sistem' && (
            <div className="animate-fadeIn">
              <div className="p-6 border-b border-outline-variant/30">
                <h3 className="text-lg font-bold text-on-surface">Konfigurasi Sistem AI</h3>
                <p className="text-sm text-on-surface-variant">Atur parameter dan ambang batas untuk model prediksi harga (Prophet AI).</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20 flex gap-3">
                  <span className="material-symbols-outlined text-warning">warning</span>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">Peringatan Modifikasi AI</h4>
                    <p className="text-sm text-on-surface-variant mt-1">Mengubah parameter ini dapat mempengaruhi akurasi prediksi harga. Lakukan dengan hati-hati atau konsultasikan dengan Data Scientist.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-outline-variant/30 rounded-lg">
                    <div>
                      <h5 className="font-semibold text-on-surface">Auto-Retrain Model</h5>
                      <p className="text-sm text-on-surface-variant">Latih ulang model secara otomatis setiap minggu dengan data terbaru.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={system.auto_retrain}
                        onChange={(e) => setSystem({...system, auto_retrain: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-outline-variant/30 rounded-lg">
                    <div>
                      <h5 className="font-semibold text-on-surface">Rentang Prediksi Default</h5>
                      <p className="text-sm text-on-surface-variant">Jumlah hari kedepan untuk prediksi chart default.</p>
                    </div>
                    <select 
                      className="px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all"
                      value={system.default_predict_range}
                      onChange={(e) => setSystem({...system, default_predict_range: Number(e.target.value)})}
                    >
                      <option value="7">7 Hari</option>
                      <option value="14">14 Hari</option>
                      <option value="30">30 Hari</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-surface-container-low border-t border-outline-variant/30 flex justify-end gap-3">
                <button 
                  onClick={handleUpdateSystem}
                  className="px-6 py-2 rounded-lg text-sm font-semibold bg-primary-container text-white shadow-sm hover:shadow-soft transition-all"
                >
                  Simpan Konfigurasi
                </button>
              </div>
            </div>
          )}

          {/* TAB: Notifikasi */}
          {activeTab === 'notifikasi' && (
            <div className="animate-fadeIn">
              <div className="p-6 border-b border-outline-variant/30">
                <h3 className="text-lg font-bold text-on-surface">Preferensi Notifikasi</h3>
                <p className="text-sm text-on-surface-variant">Pilih aktivitas mana yang memicu notifikasi untuk Anda.</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 hover:bg-surface-container-low transition-colors rounded-lg border border-transparent hover:border-outline-variant/20">
                    <div className="pt-0.5">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-primary bg-surface border-outline-variant rounded focus:ring-primary focus:ring-2" 
                        checked={notification.notif_new_product}
                        onChange={(e) => setNotification({...notification, notif_new_product: e.target.checked})}
                      />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-on-surface">Pendaftaran Produk Baru</h5>
                      <p className="text-sm text-on-surface-variant">Saat petani mendaftarkan produk yang butuh moderasi.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 hover:bg-surface-container-low transition-colors rounded-lg border border-transparent hover:border-outline-variant/20">
                    <div className="pt-0.5">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-primary bg-surface border-outline-variant rounded focus:ring-primary focus:ring-2" 
                        checked={notification.notif_anomaly}
                        onChange={(e) => setNotification({...notification, notif_anomaly: e.target.checked})}
                      />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-on-surface">Lonjakan Harga Anomali</h5>
                      <p className="text-sm text-on-surface-variant">Peringatan AI jika harga pasar naik/turun drastis.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 hover:bg-surface-container-low transition-colors rounded-lg border border-transparent hover:border-outline-variant/20">
                    <div className="pt-0.5">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-primary bg-surface border-outline-variant rounded focus:ring-primary focus:ring-2" 
                        checked={notification.notif_report}
                        onChange={(e) => setNotification({...notification, notif_report: e.target.checked})}
                      />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-on-surface">Laporan Masalah</h5>
                      <p className="text-sm text-on-surface-variant">Saat ada pembeli atau petani yang melaporkan masalah.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 hover:bg-surface-container-low transition-colors rounded-lg border border-transparent hover:border-outline-variant/20">
                    <div className="pt-0.5">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-primary bg-surface border-outline-variant rounded focus:ring-primary focus:ring-2" 
                        checked={notification.notif_system}
                        onChange={(e) => setNotification({...notification, notif_system: e.target.checked})}
                      />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-on-surface">Pembaruan Sistem</h5>
                      <p className="text-sm text-on-surface-variant">Informasi update dan maintenance platform.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-surface-container-low border-t border-outline-variant/30 flex justify-end gap-3">
                <button 
                  onClick={handleUpdateNotification}
                  className="px-6 py-2 rounded-lg text-sm font-semibold bg-primary-container text-white shadow-sm hover:shadow-soft transition-all"
                >
                  Perbarui Preferensi
                </button>
              </div>
            </div>
          )}

          {/* TAB: Keamanan */}
          {activeTab === 'keamanan' && (
            <div className="animate-fadeIn">
              <div className="p-6 border-b border-outline-variant/30">
                <h3 className="text-lg font-bold text-on-surface">Keamanan Akun</h3>
                <p className="text-sm text-on-surface-variant">Ubah kata sandi dan amankan akun Anda.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm text-secondary mb-1">Kata Sandi Saat Ini</label>
                    <input 
                      className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all" 
                      type="password" 
                      placeholder="••••••••" 
                      value={security.password}
                      onChange={(e) => setSecurity({...security, password: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-1">Kata Sandi Baru</label>
                    <input 
                      className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all" 
                      type="password" 
                      placeholder="Minimal 8 karakter" 
                      value={security.newPassword}
                      onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-1">Konfirmasi Kata Sandi Baru</label>
                    <input 
                      className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all" 
                      type="password" 
                      value={security.confirmPassword}
                      onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-outline-variant/30">
                  <h4 className="text-sm font-bold text-on-surface mb-2">Autentikasi Dua Faktor (2FA)</h4>
                  <div className="flex items-center justify-between p-4 border border-outline-variant/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined">smartphone</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-on-surface">Gunakan Aplikasi Authenticator</div>
                        <div className="text-xs text-on-surface-variant">Tingkatkan keamanan akun dengan kode OTP.</div>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-outline-variant rounded-lg text-sm font-semibold hover:bg-surface-container-low transition-colors">
                      Aktifkan
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-surface-container-low border-t border-outline-variant/30 flex justify-end gap-3">
                <button 
                  onClick={handleUpdateSecurity}
                  className="px-6 py-2 rounded-lg text-sm font-semibold bg-primary-container text-white shadow-sm hover:shadow-soft transition-all"
                >
                  Perbarui Kata Sandi
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
