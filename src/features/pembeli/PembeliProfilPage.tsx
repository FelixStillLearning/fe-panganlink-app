import { SectionCard, Badge, Button } from '../../components/ui'

export function PembeliProfilPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="opacity-0 animate-fadeUp">
        <h2 className="text-2xl font-bold text-on-surface">Profil Akun</h2>
        <p className="text-secondary text-sm mt-1">
          Kelola informasi data diri dan alamat pengiriman Anda.
        </p>
      </div>

      <div className="flex items-center gap-6 p-6 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/20 opacity-0 animate-fadeUp stagger-1">
        <div className="w-24 h-24 rounded-full bg-brand-green-light flex items-center justify-center text-white text-3xl font-bold shadow-soft">
          R
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-on-surface">Rini Melati</h3>
          <p className="text-secondary text-sm flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-[16px]">mail</span>
            rini.melati@example.com
          </p>
          <div className="mt-3 flex gap-2">
            <Badge variant="success">Pembeli Aktif</Badge>
            <Badge variant="default">Member sejak 2025</Badge>
          </div>
        </div>
        <Button variant="outline" icon="edit">Edit Profil</Button>
      </div>

      <SectionCard title="Informasi Pribadi" icon="person" delay={2}>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-secondary mb-1">Nama Lengkap</label>
              <input type="text" defaultValue="Rini Melati" className="w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-xs font-medium text-secondary mb-1">Nomor Telepon</label>
              <input type="text" defaultValue="081234567890" className="w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg text-sm focus:outline-none focus:border-primary" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-secondary mb-1">Email</label>
              <input type="email" defaultValue="rini.melati@example.com" disabled className="w-full px-3 py-2 bg-surface-container-highest border border-outline-variant/30 rounded-lg text-sm text-secondary cursor-not-allowed" />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button variant="primary">Simpan Perubahan</Button>
          </div>
        </form>
      </SectionCard>

      <SectionCard title="Alamat Pengiriman Utama" icon="home" delay={3}>
        <div className="p-4 border border-outline-variant/30 rounded-xl bg-surface-container/30">
          <div className="flex justify-between items-start mb-2">
            <span className="font-semibold text-on-surface">Rumah</span>
            <button type="button" className="text-primary text-sm font-medium hover:underline">Ubah</button>
          </div>
          <p className="text-sm text-secondary leading-relaxed">
            Jl. Mawar Merah No. 45, RT 02/RW 05<br/>
            Kecamatan Melati, Kota Bandung<br/>
            Jawa Barat, 40123
          </p>
        </div>
        <div className="mt-4">
          <Button variant="outline" icon="add" className="w-full border-dashed">Tambah Alamat Baru</Button>
        </div>
      </SectionCard>
    </div>
  )
}
