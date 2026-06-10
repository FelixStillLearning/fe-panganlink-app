import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { api } from '../../lib/api'

export function RegisterPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const role = 'pembeli' // Petani harus didaftarkan oleh admin
    
    try {
      await api.post('/v1/auth/register', { name, email, password, role })
      alert('Pendaftaran berhasil! Silakan masuk ke akun Anda.')
      navigate('/login')
    } catch (err: any) {
      const msg = err.message || 'Pendaftaran gagal. Silakan coba lagi.'
      setError(msg)
      alert(`Pendaftaran Gagal:\n${msg}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface flex flex-row-reverse">
      {/* Right Panel: Branding & Image (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-primary relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-green/80 to-primary-dark/90 mix-blend-multiply z-10"></div>
        <img 
          src="/img/Thriving Farm Fields.jpg" 
          alt="Petani Indonesia" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-white p-12 flex flex-col justify-end h-full w-full">
          <div className="mb-auto self-end">
            <Link to="/" className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              <img src="/img/logo_panganlink.png" alt="PanganLink Logo" className="h-10 w-10 object-contain" />
              PanganLink
            </Link>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-bold mb-4 leading-tight">Mulai Perjalanan Anda.</h2>
            <p className="text-lg text-white/80 max-w-md ml-auto">Bersama membangun ekosistem agrikultur yang lebih kuat, cerdas, dan menguntungkan semua pihak.</p>
          </div>
        </div>
      </div>

      {/* Left Panel: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8 overflow-y-auto hide-scrollbar relative">
        <Link to="/" className="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary transition-colors bg-surface-container-low px-4 py-2 rounded-full shadow-sm hover:shadow-card">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Kembali
        </Link>
        <div className="w-full max-w-md animate-fadeIn m-auto py-4 mt-16 lg:mt-auto">
          
          <div className="lg:hidden mb-8">
            <Link to="/" className="text-2xl font-bold tracking-tight text-primary flex items-center gap-2">
              <img src="/img/logo_panganlink.png" alt="PanganLink Logo" className="h-8 w-8 object-contain" />
              PanganLink
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-on-surface mb-2">Daftar Akun</h1>
            <p className="text-on-surface-variant">Lengkapi data di bawah ini untuk bergabung di PanganLink.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-danger bg-danger/10 border border-danger/20 rounded-xl">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">Nama Lengkap</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-[20px]">person</span>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="Nama Lengkap Anda"
                  className="w-full pl-11 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-[20px]">mail</span>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="email@example.com"
                  className="w-full pl-11 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">Kata Sandi</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-[20px]">lock</span>
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-11 pr-12 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>
            
            <div className="flex items-start mt-4">
              <input type="checkbox" id="terms" required className="w-4 h-4 mt-0.5 text-primary bg-surface border-outline-variant rounded focus:ring-primary focus:ring-2 cursor-pointer" />
              <label htmlFor="terms" className="ml-2 text-sm text-on-surface-variant cursor-pointer">
                Saya setuju dengan <a href="#" className="font-semibold text-primary hover:text-brand-green">Syarat & Ketentuan</a> serta <a href="#" className="font-semibold text-primary hover:text-brand-green">Kebijakan Privasi</a> yang berlaku.
              </label>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary-container text-white py-3 rounded-xl font-bold text-sm shadow-sm hover:shadow-soft hover:bg-primary transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Memproses...' : 'Daftar Akun'}
              {!loading && <span className="material-symbols-outlined text-[18px]">person_add</span>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-on-surface-variant">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-bold text-primary hover:text-brand-green transition-colors">Masuk di sini</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
