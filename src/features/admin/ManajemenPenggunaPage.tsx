import { useState, useEffect } from 'react'
import { api } from '../../lib/api'

export function ManajemenPenggunaPage() {
  const [users, setUsers] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    try {
      const res = await api.get('/v1/admin/users')
      setUsers(res.data || [])
    } catch (err) {
      console.error("Gagal mengambil data user", err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleRegisterPetani = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    try {
      await api.post('/v1/auth/register', { name, email, password, role: 'petani' })
      alert('Akun Petani berhasil dibuat!')
      setIsModalOpen(false)
      fetchUsers()
    } catch (err: any) {
      alert(`Gagal membuat akun: ${err.message || 'Terjadi kesalahan'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-7xl animate-fadeUp">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Manajemen Pengguna</h2>
          <p className="text-secondary text-sm mt-1">Kelola akun Pembeli dan daftarkan akun khusus Petani.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-soft hover:bg-brand-green-dark transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Buat Akun Petani
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-soft border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary-container/20 border-b border-outline-variant/30">
                <th className="py-3 px-6 text-xs font-semibold text-secondary uppercase tracking-wider">Nama Lengkap</th>
                <th className="py-3 px-6 text-xs font-semibold text-secondary uppercase tracking-wider">Email</th>
                <th className="py-3 px-6 text-xs font-semibold text-secondary uppercase tracking-wider">Role</th>
                <th className="py-3 px-6 text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-on-surface divide-y divide-outline-variant/20">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-4 px-6 font-medium">{user.name}</td>
                  <td className="py-4 px-6 text-secondary">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide ${
                      user.role === 'petani' ? 'bg-success/10 text-success' : 
                      user.role === 'admin' ? 'bg-primary/10 text-primary' : 
                      'bg-tertiary/10 text-tertiary'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-md text-[11px] font-bold tracking-wide ${
                      user.status === 'active' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                    }`}>
                      {user.status === 'active' ? 'Aktif' : 'Non-aktif'}
                    </span>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-secondary">Belum ada data pengguna</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Petani */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-surface-container-lowest rounded-xl shadow-popup overflow-hidden animate-fadeIn">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
              <h3 className="text-lg font-bold text-on-surface">Pendaftaran Akun Petani</h3>
              <button className="text-secondary hover:text-on-surface p-1 rounded-full hover:bg-surface-container-low transition-colors" onClick={() => setIsModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleRegisterPetani} className="p-6 flex flex-col gap-4">
              <div className="bg-primary-muted border-l-4 border-primary rounded-r-lg p-3 flex items-start gap-3 mb-2">
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">info</span>
                <p className="text-xs text-on-surface-variant">Hanya Admin yang berhak mendaftarkan akun Petani baru ke dalam sistem PanganLink.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">Nama Lengkap Petani</label>
                <input 
                  type="text" name="name" required placeholder="Nama Lengkap"
                  className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">Email Petani</label>
                <input 
                  type="email" name="email" required placeholder="petani@example.com"
                  className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">Kata Sandi (Default)</label>
                <input 
                  type="text" name="password" required defaultValue="petani123"
                  className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all"
                />
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex justify-end gap-3 mt-2">
                <button type="button" className="px-4 py-2 rounded-lg text-sm font-medium border border-outline-variant hover:bg-surface-container-low transition-colors" onClick={() => setIsModalOpen(false)}>
                  Batal
                </button>
                <button type="submit" disabled={loading} className="bg-primary text-white hover:bg-brand-green-dark transition-colors px-6 py-2 rounded-lg shadow-sm text-sm font-semibold disabled:opacity-70">
                  {loading ? 'Memproses...' : 'Buat Akun'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
