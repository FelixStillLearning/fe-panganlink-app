import { SectionCard, Button } from '../../components/ui'

export function PetaniPengaturanPage() {
  return (
    <div className="space-y-6 max-w-4xl animate-fadeUp">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Pengaturan</h2>
        <p className="text-secondary text-sm mt-1">Atur preferensi aplikasi Anda.</p>
      </div>

      <SectionCard title="Notifikasi">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-sm text-on-surface">Notifikasi Pesanan Baru</h4>
              <p className="text-xs text-secondary">Kirim notifikasi ke email saat ada pesanan masuk.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-outline-variant/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-sm text-on-surface">Update Rekomendasi AI</h4>
              <p className="text-xs text-secondary">Terima peringatan saat ada perubahan tren harga ekstrem.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-outline-variant/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
            </label>
          </div>
        </div>
        <div className="mt-6">
          <Button icon="save">Simpan Pengaturan</Button>
        </div>
      </SectionCard>
    </div>
  )
}
