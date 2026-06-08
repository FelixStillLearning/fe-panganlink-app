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
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-sm text-on-surface">Update Rekomendasi AI</h4>
              <p className="text-xs text-secondary">Terima peringatan saat ada perubahan tren harga ekstrem.</p>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
        </div>
        <div className="mt-6">
          <Button>Simpan Pengaturan</Button>
        </div>
      </SectionCard>
    </div>
  )
}
