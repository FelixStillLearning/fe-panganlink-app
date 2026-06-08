import { SectionCard, Button } from '../../components/ui'

export function PetaniProfilPage() {
  return (
    <div className="space-y-6 max-w-7xl animate-fadeUp">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Profil Akun</h2>
        <p className="text-secondary text-sm mt-1">Kelola informasi pribadi dan profil kebun/toko Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SectionCard className="text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl text-primary">person</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface">Budi Santoso</h3>
            <p className="text-sm text-secondary">Petani PanganLink</p>
            <Button variant="outline" className="mt-4 w-full" size="sm" icon="photo_camera">Ubah Foto</Button>
          </SectionCard>
        </div>
        
        <div className="lg:col-span-2">
          <SectionCard title="Informasi Pribadi">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                  <input type="text" className="w-full bg-transparent text-sm text-on-surface p-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all" defaultValue="Budi Santoso" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Email</label>
                  <input type="email" className="w-full bg-transparent text-sm text-on-surface p-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all" defaultValue="budi@petani.com" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Nomor Telepon</label>
                  <input type="tel" className="w-full bg-transparent text-sm text-on-surface p-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all" defaultValue="081234567890" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Nama Kebun/Toko</label>
                  <input type="text" className="w-full bg-transparent text-sm text-on-surface p-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all" defaultValue="Kebun Subur Jaya" />
                </div>
              </div>
              <div className="mt-5">
                <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                <textarea className="w-full bg-transparent text-sm text-on-surface p-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all resize-none" rows={3} defaultValue="Jl. Pertanian No 12, Desa Makmur, Jawa Barat"></textarea>
              </div>
              <div className="pt-4 border-t border-outline-variant/30 mt-4 flex justify-end">
                <Button icon="save">Simpan Perubahan</Button>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
