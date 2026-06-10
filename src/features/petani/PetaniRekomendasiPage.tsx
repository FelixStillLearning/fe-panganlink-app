import { SectionCard } from '../../components/ui'

import { useState, useEffect } from 'react'

export function PetaniRekomendasiPage() {
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecs = async () => {
      setIsLoading(true)
      try {
        const komoditasIds = ['1', '2', '3'] // Beras, Cabai, Bawang
        
        const reqs = komoditasIds.map(kid => 
          fetch('http://localhost:8000/api/v1/ai/recommend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ komoditas_id: kid })
          }).then(res => res.json())
        )
        
        const results = await Promise.all(reqs)
        
        // Filter out empty results and format
        const formatted = results.filter(r => r.komoditas_name).map(r => ({
          name: r.komoditas_name === 'beras' ? 'Beras' : r.komoditas_name === 'cabai_merah' ? 'Cabai Merah' : 'Bawang Merah',
          trend: r.trend_text,
          direction: r.direction,
          price: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(r.predicted_price),
          icon: r.icon,
          recommendation: r.recommendation
        }))
        
        setRecommendations(formatted)
      } catch (err) {
        console.error("Gagal mengambil rekomendasi", err)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchRecs()
  }, [])

  return (
    <div className="space-y-6 max-w-7xl animate-fadeUp">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Rekomendasi AI</h2>
        <p className="text-secondary text-sm mt-1">Wawasan cerdas berbasis model Huber Regression untuk membantu Anda menentukan keputusan jual/tahan terbaik.</p>
      </div>

      {isLoading ? (
        <div className="w-full py-12 flex flex-col items-center justify-center text-primary">
          <span className="material-symbols-outlined animate-spin text-4xl mb-4">refresh</span>
          <p className="font-medium animate-pulse">AI sedang menganalisis pasar...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, i) => (
            <SectionCard key={i} title={rec.name} icon={rec.icon} className="relative overflow-hidden">
              <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl pointer-events-none ${
                rec.direction === 'up' ? 'bg-success/20' : rec.direction === 'down' ? 'bg-danger/20' : 'bg-primary/20'
              }`} />
              
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-[11px] font-semibold text-secondary uppercase tracking-wider">Prediksi Harga Esok</p>
                  <p className="text-2xl font-bold font-mono text-primary mt-1">{rec.price}</p>
                </div>
                <div className={`flex items-center gap-1 text-[12px] font-bold px-2 py-1 rounded-md ${
                  rec.direction === 'up' ? 'bg-success/10 text-success' : rec.direction === 'down' ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'
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
              
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  )
}
