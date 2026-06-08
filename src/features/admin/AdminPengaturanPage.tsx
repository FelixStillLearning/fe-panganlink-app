import { useState } from 'react'

export function AdminPengaturanPage() {
  const [activeTab, setActiveTab] = useState('profil')

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
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold border-2 border-primary-container/20">
                    SA
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm font-semibold hover:bg-surface-container-low transition-colors shadow-sm">
                      Ubah Foto
                    </button>
                    <span className="text-xs text-on-surface-variant">JPG, GIF atau PNG. Maksimal 1MB.</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-secondary mb-1">Nama Lengkap</label>
                    <input className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all" type="text" defaultValue="Super Admin" />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-1">Email</label>
                    <input className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all" type="email" defaultValue="admin@panganlink.id" />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-1">Jabatan</label>
                    <input className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-sm text-on-surface-variant cursor-not-allowed" type="text" defaultValue="Administrator Sistem" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-1">Nomor Telepon</label>
                    <input className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all" type="tel" defaultValue="+62 812 3456 7890" />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-surface-container-low border-t border-outline-variant/30 flex justify-end gap-3">
                <button className="px-6 py-2 rounded-lg text-sm font-semibold bg-primary-container text-white shadow-sm hover:shadow-soft transition-all">
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
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-outline-variant/30 rounded-lg">
                    <div>
                      <h5 className="font-semibold text-on-surface">Rentang Prediksi Default</h5>
                      <p className="text-sm text-on-surface-variant">Jumlah hari kedepan untuk prediksi chart default.</p>
                    </div>
                    <select className="px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all">
                      <option value="7">7 Hari</option>
                      <option value="14">14 Hari</option>
                      <option value="30" selected>30 Hari</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-surface-container-low border-t border-outline-variant/30 flex justify-end gap-3">
                <button className="px-6 py-2 rounded-lg text-sm font-semibold bg-primary-container text-white shadow-sm hover:shadow-soft transition-all">
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
                  {[
                    { title: 'Pendaftaran Produk Baru', desc: 'Saat petani mendaftarkan produk yang butuh moderasi.', checked: true },
                    { title: 'Lonjakan Harga Anomali', desc: 'Peringatan AI jika harga pasar naik/turun drastis.', checked: true },
                    { title: 'Laporan Masalah', desc: 'Saat ada pembeli atau petani yang melaporkan masalah.', checked: true },
                    { title: 'Pembaruan Sistem', desc: 'Informasi update dan maintenance platform.', checked: false },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 hover:bg-surface-container-low transition-colors rounded-lg border border-transparent hover:border-outline-variant/20">
                      <div className="pt-0.5">
                        <input type="checkbox" className="w-4 h-4 text-primary bg-surface border-outline-variant rounded focus:ring-primary focus:ring-2" defaultChecked={item.checked} />
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-on-surface">{item.title}</h5>
                        <p className="text-sm text-on-surface-variant">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-surface-container-low border-t border-outline-variant/30 flex justify-end gap-3">
                <button className="px-6 py-2 rounded-lg text-sm font-semibold bg-primary-container text-white shadow-sm hover:shadow-soft transition-all">
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
                    <input className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all" type="password" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-1">Kata Sandi Baru</label>
                    <input className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all" type="password" placeholder="Minimal 8 karakter" />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-1">Konfirmasi Kata Sandi Baru</label>
                    <input className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all" type="password" />
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
                <button className="px-6 py-2 rounded-lg text-sm font-semibold bg-primary-container text-white shadow-sm hover:shadow-soft transition-all">
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
