import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function LandingPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-surface text-on-surface font-sans antialiased min-h-screen flex flex-col overflow-x-hidden">
      {/* TopNavBar - Glassmorphism */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-surface/80 backdrop-blur-lg shadow-card py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="flex justify-between items-center px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 group cursor-pointer">
            <span
              className="material-symbols-outlined text-primary text-[28px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              eco
            </span>
            <span className="text-[22px] font-bold text-primary tracking-tight">
              PanganLink
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 bg-surface-container-low/50 backdrop-blur-md px-6 py-2.5 rounded-full border border-outline-variant/20 shadow-sm">
            <a className="text-secondary font-medium hover:text-primary transition-colors text-sm" href="#tentang">Tentang</a>
            <a className="text-secondary font-medium hover:text-primary transition-colors text-sm" href="#fitur">Fitur</a>
            <a className="text-secondary font-medium hover:text-primary transition-colors text-sm" href="#sdgs">SDGs</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-primary font-medium hover:bg-primary-muted px-4 py-2.5 rounded-xl transition-colors text-sm"
            >
              Masuk
            </Link>
            <Link
              to="/pembeli"
              className="bg-primary-container text-on-primary hover:scale-[0.98] transition-transform px-5 py-2.5 rounded-xl text-sm font-medium shadow-soft"
            >
              Daftar
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-6 lg:px-12">
          {/* Decorative Blobs */}
          <div className="absolute top-20 -left-32 w-[500px] h-[500px] bg-primary-fixed/60 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-40 -right-32 w-[600px] h-[600px] bg-secondary-container/50 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            {/* Left Copy */}
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <h1 className="text-[44px] md:text-[64px] font-bold leading-[1.1] tracking-tight text-primary opacity-0 animate-fadeUp stagger-1">
                Dari Ladang ke <br />
                Meja Makan — Langsung
              </h1>
              
              <p className="text-lg text-on-surface-variant max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-0 animate-fadeUp stagger-2">
                Mendukung SDG 2: Zero Hunger dengan menghubungkan petani langsung ke pembeli. Harga adil, transparan, dan berkelanjutan.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 opacity-0 animate-fadeUp stagger-3">
                <Link
                  to="/petani"
                  className="bg-primary-container text-on-primary hover:scale-[0.98] transition-transform px-8 py-4 rounded-xl text-base font-medium shadow-soft flex items-center justify-center gap-2 hover:-translate-y-1 duration-300"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>agriculture</span>
                  Saya Petani
                </Link>
                
                <Link
                  to="/pembeli"
                  className="border border-outline text-primary hover:bg-primary-muted transition-colors px-8 py-4 rounded-xl text-base font-medium flex items-center justify-center gap-2 hover:-translate-y-1 duration-300"
                >
                  <span className="material-symbols-outlined text-primary">storefront</span>
                  Saya Pembeli
                </Link>
              </div>
            </div>

            {/* Right Image/Graphic */}
            <div className="flex-1 relative w-full max-w-[500px] opacity-0 animate-fadeUp stagger-4">
              <div className="relative aspect-square mx-auto rounded-xl overflow-hidden shadow-popup border-4 border-surface-container-lowest group">
                <img
                  alt="Petani di ladang sayuran segar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuACn73kLEXxHIxg7byi6fKCdyu4x9NeLUURn0jMcBW7d98J2vtYwnFReaocYhPESt5zivMMk2g8wdhBGf4DBOi15KElLbb4GD7KPvl_SUth0YnXcGlWjaEmKBOpRXake_1j7Ccnn6lCcgPTvbYg9rQiYBjBZ9S3RhDvMP7NQ_rVOWFKGaRzojiPYbIOHW5eDjQsjEgdPXAXMZqWiU1Y4w7ZMspHtk56MnIFh_h_FIwwGzPJ6exGYh2GMpiSyiA1tlLusSILk0BDFXM"
                />
              </div>

              {/* Decorative floating elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-warning/20 backdrop-blur-md border border-white/40 rounded-3xl rotate-12 -z-10 animate-pulse2" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 backdrop-blur-md border border-white/40 rounded-full -z-10 animate-pulse2" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="fitur" className="py-24 bg-surface-bright px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 opacity-0 animate-fadeUp">
              <h2 className="text-[32px] md:text-[40px] font-bold text-primary">Solusi Cerdas untuk Pertanian</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-surface-container-lowest p-8 rounded-xl shadow-soft hover:-translate-y-2 hover:shadow-card transition-all duration-300 border border-outline-variant/30 opacity-0 animate-fadeUp stagger-1">
                <div className="w-14 h-14 rounded-full bg-primary-muted flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-[28px]">handshake</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Marketplace Langsung</h3>
                <p className="text-base text-on-surface-variant leading-relaxed">Transaksi tanpa perantara, memastikan petani mendapat harga terbaik dan pembeli mendapat produk segar.</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gradient-to-br from-surface-container-lowest to-surface-container/50 p-8 rounded-xl shadow-soft hover:-translate-y-2 hover:shadow-card transition-all duration-300 border border-outline-variant/30 opacity-0 animate-fadeUp stagger-2">
                <div className="w-14 h-14 rounded-full bg-primary-muted flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-[28px]">analytics</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">AI Harga Prophet</h3>
                <p className="text-base text-on-surface-variant leading-relaxed">Prediksi harga komoditas berbasis AI untuk membantu Anda mengambil keputusan bisnis yang lebih baik.</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-surface-container-lowest p-8 rounded-xl shadow-soft hover:-translate-y-2 hover:shadow-card transition-all duration-300 border border-outline-variant/30 opacity-0 animate-fadeUp stagger-3">
                <div className="w-14 h-14 rounded-full bg-primary-muted flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-[28px]">visibility</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Tren Transparan</h3>
                <p className="text-base text-on-surface-variant leading-relaxed">Data pasar dan tren permintaan yang terbuka untuk semua, menciptakan ekosistem pertanian yang adil.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SDG 2 SECTION */}
        <section id="sdgs" className="py-24 px-6 lg:px-12 bg-primary-container text-on-primary">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6 opacity-0 animate-slideInLeft">
              <div className="inline-flex items-center gap-2 bg-on-primary/10 px-4 py-1.5 rounded-full mb-2 border border-on-primary/20">
                <span className="material-symbols-outlined text-sm">public</span>
                <span className="text-xs font-semibold tracking-wider">SDG GOAL 2</span>
              </div>
              <h2 className="text-[36px] lg:text-[48px] font-bold leading-tight text-white">
                Zero Hunger
              </h2>
              <p className="text-lg text-on-primary/90 max-w-lg leading-relaxed">
                PanganLink berkomitmen untuk mencapai ketahanan pangan dan meningkatkan gizi, serta mendorong pertanian berkelanjutan. Kami percaya bahwa setiap panen berharga dan tidak ada hasil bumi yang terbuang.
              </p>
            </div>

            <div className="flex-1 w-full relative opacity-0 animate-fadeUp stagger-2">
              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-primary/30 border border-on-primary/20 shadow-2xl">
                <img
                  alt="Bahan makanan segar"
                  className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:scale-105 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwugNmhFGvJKvkJW0SG9tgcZ-lCD1fNy_jWY7XKShc27XbI536aiKL9FQS_XmdBtDsxf0tAv3bbkcEAyPpseugsA5Co3OPuTwcJ-X7sHmYQY65qaiO88T5sZ9KoSzLp5Uu6z751sUwPcZ-yCENvgEzV04muWMElGtioSMu90dG9SEd3M7SXZMdg1O3wMGkRpPJjcpXb6jTxAL5G0byLfyrYIvja3sWWIJdi-NrxmhIjcV8FmVK12grikJVMW9kzl4r71S3_fhgmSg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-20 border-b border-secondary-container bg-surface">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 opacity-0 animate-fadeUp">
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-[100px] divide-y md:divide-y-0 md:divide-x divide-secondary-container">
              <div className="text-center w-full md:w-auto py-4 md:py-0 md:px-8">
                <div className="text-[48px] md:text-[64px] font-bold text-primary mb-2 tracking-tight">100+</div>
                <div className="text-sm font-semibold text-secondary uppercase tracking-wider">Petani Bergabung</div>
              </div>
              <div className="text-center w-full md:w-auto py-4 md:py-0 md:px-8">
                <div className="text-[48px] md:text-[64px] font-bold text-primary mb-2 tracking-tight">500+</div>
                <div className="text-sm font-semibold text-secondary uppercase tracking-wider">Pembeli Aktif</div>
              </div>
              <div className="text-center w-full md:w-auto py-4 md:py-0 md:px-8">
                <div className="text-[48px] md:text-[64px] font-bold text-primary mb-2 tracking-tight">3</div>
                <div className="text-sm font-semibold text-secondary uppercase tracking-wider">Komoditas Utama</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full py-12 px-6 lg:px-12 bg-surface-container border-t border-secondary-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
            <span className="text-xl font-bold text-primary">PanganLink</span>
          </div>
          <p className="text-sm text-on-surface-variant text-center md:text-left">
            © 2024 PanganLink Indonesia. Mendukung Kedaulatan Pangan Nasional.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-sm font-medium text-secondary hover:text-primary hover:underline transition-colors" href="#">Kebijakan Privasi</a>
            <a className="text-sm font-medium text-secondary hover:text-primary hover:underline transition-colors" href="#">Syarat & Ketentuan</a>
            <a className="text-sm font-medium text-secondary hover:text-primary hover:underline transition-colors" href="#">Hubungi Kami</a>
            <a className="text-sm font-medium text-secondary hover:text-primary hover:underline transition-colors" href="#">Blog Pertanian</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
