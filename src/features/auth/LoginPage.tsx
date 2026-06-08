import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function LoginPage() {
  const [role, setRole] = useState<'pembeli' | 'petani' | 'admin'>('pembeli')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated login redirect based on role
    navigate(`/${role}/dashboard`)
  }

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left Panel: Branding & Image (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-surface-variant relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-surface-variant/90 mix-blend-multiply z-10"></div>
        <img 
          src="/img/pertanian.jpg" 
          alt="Petani di Sawah Indonesia" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-white p-12 flex flex-col justify-end h-full w-full">
          <div className="mb-auto">
            <Link to="/" className="text-3xl font-bold tracking-tight text-white flex items-center gap-2 w-max">
              <span className="material-symbols-outlined text-[32px] text-brand-green-light">energy_savings_leaf</span>
              PanganLink
            </Link>
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-4 leading-tight">Hubungkan Petani Langsung ke Meja Anda.</h2>
            <p className="text-lg text-white/80 max-w-md">Bergabunglah dalam revolusi rantai pasok pangan yang transparan, stabil, dan adil menggunakan teknologi Prediksi AI.</p>
          </div>
        </div>
      </div>

      {/* Right Panel: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md animate-fadeIn">
          
          <div className="lg:hidden mb-8">
            <Link to="/" className="text-2xl font-bold tracking-tight text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-[28px] text-brand-green">energy_savings_leaf</span>
              PanganLink
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-on-surface mb-2">Selamat Datang</h1>
            <p className="text-on-surface-variant">Masuk ke akun Anda untuk melanjutkan.</p>
          </div>

          {/* Role Selector (For demo purposes so user can test different dashboards) */}
          <div className="mb-8 p-1 bg-surface-container-high rounded-lg flex text-sm font-semibold">
            <button 
              type="button"
              onClick={() => setRole('pembeli')}
              className={`flex-1 py-2 rounded-md transition-all ${role === 'pembeli' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-secondary hover:text-on-surface'}`}
            >
              Pembeli
            </button>
            <button 
              type="button"
              onClick={() => setRole('petani')}
              className={`flex-1 py-2 rounded-md transition-all ${role === 'petani' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-secondary hover:text-on-surface'}`}
            >
              Petani
            </button>
            <button 
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 rounded-md transition-all ${role === 'admin' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-secondary hover:text-on-surface'}`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-[20px]">mail</span>
                <input 
                  type="email" 
                  required
                  placeholder={`email.${role}@example.com`}
                  className="w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-semibold text-on-surface">Kata Sandi</label>
                <a href="#" className="text-xs font-semibold text-brand-green hover:text-brand-green-dark transition-colors">Lupa sandi?</a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-[20px]">lock</span>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="remember" className="w-4 h-4 text-primary bg-surface border-outline-variant rounded focus:ring-primary focus:ring-2 cursor-pointer" />
              <label htmlFor="remember" className="ml-2 text-sm text-on-surface-variant cursor-pointer">Ingat saya selama 30 hari</label>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary-container text-white py-3 rounded-xl font-bold text-sm shadow-sm hover:shadow-soft hover:bg-primary transition-all flex items-center justify-center gap-2 mt-4"
            >
              Masuk Sekarang
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-on-surface-variant">
            Belum punya akun?{' '}
            <Link to="/register" className="font-bold text-primary hover:text-brand-green transition-colors">Daftar di sini</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
