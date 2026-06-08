import { SectionCard, Button } from '../../components/ui'

const aiRecs = [
  { name: 'Cabai Merah', trend: '+15% Permintaan', direction: 'up', price: 'Rp 45.000/kg', icon: 'trending_up', recommendation: 'Waktu yang tepat untuk menjual stok cabai merah. Harga diprediksi akan stabil tinggi dalam 7 hari ke depan.' },
  { name: 'Bawang Merah', trend: '-5% Pasokan', direction: 'down', price: 'Rp 28.000/kg', icon: 'trending_down', recommendation: 'Tahan stok jika memungkinkan, harga diperkirakan naik awal bulan depan akibat penurunan pasokan.' },
]

export function PetaniRekomendasiPage() {
  return (
    <div className="space-y-6 max-w-7xl animate-fadeUp">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Rekomendasi AI</h2>
        <p className="text-secondary text-sm mt-1">Wawasan cerdas berbasis model Bayesian Ridge untuk membantu Anda menentukan harga jual terbaik.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiRecs.map((rec, i) => (
          <SectionCard key={i} title={rec.name} icon={rec.icon} className="relative overflow-hidden">
            <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl pointer-events-none ${
              rec.direction === 'up' ? 'bg-success/20' : 'bg-danger/20'
            }`} />
            
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-[11px] font-semibold text-secondary uppercase tracking-wider">Prediksi Harga</p>
                <p className="text-2xl font-bold font-mono text-primary mt-1">{rec.price}</p>
              </div>
              <div className={`flex items-center gap-1 text-[12px] font-bold px-2 py-1 rounded-md ${
                rec.direction === 'up' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
              }`}>
                <span className="material-symbols-outlined text-[14px]">{rec.icon}</span>
                {rec.trend}
              </div>
            </div>
            
            <div className="bg-surface-container rounded-xl p-4">
              <div className="flex gap-2 items-start">
                <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
                <p className="text-sm text-on-surface leading-relaxed">
                  {rec.recommendation}
                </p>
              </div>
            </div>
            
            <Button className="mt-4 w-full" variant="outline">Lihat Detail Analisis</Button>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}
