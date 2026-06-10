import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export function TrenHargaPage() {
  const [isTableOpen, setIsTableOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('3 Bulan')
  const [selectedCommodity, setSelectedCommodity] = useState('Beras')

  const [historicalData, setHistoricalData] = useState<any[]>([])
  const [predictionData, setPredictionData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const aggregateByMonth = (dataArray: any[], dateField: string, valFields: string[]) => {
    const grouped: Record<string, any> = {}
    dataArray.forEach(item => {
      const d = new Date(item[dateField])
      const monthYear = d.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })
      
      if (!grouped[monthYear]) {
        grouped[monthYear] = { count: 0, dateObj: new Date(d.getFullYear(), d.getMonth(), 1) }
        valFields.forEach(f => grouped[monthYear][f] = 0)
      }
      
      grouped[monthYear].count += 1
      valFields.forEach(f => {
        if (item[f] !== null && item[f] !== undefined) {
          grouped[monthYear][f] += item[f]
        }
      })
    })
    
    return Object.keys(grouped).map(key => {
      const obj = grouped[key]
      const result: any = { monthYear: key }
      valFields.forEach(f => {
        result[f] = obj[f] / obj.count
      })
      result._date = obj.dateObj
      return result
    }).sort((a, b) => a._date.getTime() - b._date.getTime())
  }

  useEffect(() => {
    const fetchForecast = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const komoditasMap: Record<string, string> = {
          'Beras': '1',
          'Cabai Merah': '2',
          'Bawang Merah': '3'
        }
        const periodMap: Record<string, number> = {
          '1 Bulan': 30,
          '3 Bulan': 90,
          '6 Bulan': 180
        }
        
        const kid = komoditasMap[selectedCommodity]
        const periods = periodMap[selectedPeriod]
        
        const res = await fetch('http://localhost:8000/api/v1/ai/forecast', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ komoditas_id: kid, periods: periods })
        })
        
        if (!res.ok) throw new Error('Gagal mengambil data prediksi dari AI Service')
        
        const data = await res.json()
        const predictions = data.predictions || []
        const historical = data.historical || []
        
        // Aggregate historis
        const aggHist = aggregateByMonth(historical, 'tanggal', ['harga_aktual'])
        setHistoricalData(aggHist)
        
        // Aggregate prediksi
        const aggPred = aggregateByMonth(predictions, 'tanggal', ['prediksi_harga', 'batas_bawah', 'batas_atas'])
        setPredictionData(aggPred)
        
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchForecast()
  }, [selectedCommodity, selectedPeriod])

  const formatRp = (value: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    }).format(value)
  }

  // --- CHART HISTORIS CONFIG ---
  const histLabels = historicalData.map(d => d.monthYear)
  const histValues = historicalData.map(d => d.harga_aktual)
  
  const histChartData = {
    labels: histLabels,
    datasets: [
      {
        label: 'Harga Aktual Rata-rata',
        data: histValues,
        borderColor: '#198754',
        borderWidth: 2.5,
        backgroundColor: '#198754',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
        fill: false
      }
    ]
  }

  // --- CHART PREDIKSI CONFIG ---
  const predLabels = predictionData.map(d => d.monthYear)
  const predValues = predictionData.map(d => d.prediksi_harga)
  const upperValues = predictionData.map(d => d.batas_atas)
  const lowerValues = predictionData.map(d => d.batas_bawah)

  const predChartData = {
    labels: predLabels,
    datasets: [
      {
        label: 'Batas Atas',
        data: upperValues,
        borderColor: 'transparent',
        backgroundColor: 'rgba(93, 68, 50, 0.1)',
        fill: '+1',
        pointRadius: 0,
        tension: 0.3
      },
      {
        label: 'Prediksi Rata-rata',
        data: predValues,
        borderColor: '#5D4432',
        borderWidth: 3,
        backgroundColor: '#5D4432',
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.3,
        fill: false
      },
      {
        label: 'Batas Bawah',
        data: lowerValues,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        pointRadius: 0,
        tension: 0.3,
        fill: false
      }
    ]
  }

  const commonOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        display: true, position: 'bottom',
        labels: {
          usePointStyle: true, font: { family: 'Be Vietnam Pro', size: 12 },
          filter: (item) => item.text !== 'Batas Bawah' && item.text !== 'Batas Atas'
        }
      },
      tooltip: {
        backgroundColor: '#ffffff', titleColor: '#28180c', bodyColor: '#4f453e',
        borderColor: '#e7e1db', borderWidth: 1, padding: 12,
        titleFont: { family: 'Be Vietnam Pro', size: 14, weight: 'bold' },
        bodyFont: { family: 'JetBrains Mono', size: 12 }, displayColors: false,
        callbacks: {
          label: (context) => {
            if(context.datasetIndex === 2 || context.datasetIndex === 0 && context.dataset.label === 'Batas Atas') return ''
            return `${context.dataset.label}: ${formatRp(context.raw as number)}`
          }
        }
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: 'JetBrains Mono', size: 10 }, color: '#4f453e' } },
      y: { grid: { color: '#e7e1db' }, ticks: { font: { family: 'JetBrains Mono', size: 10 }, color: '#4f453e', callback: (value) => 'Rp ' + (Number(value)/1000) + 'k' } }
    }
  }

  // --- STATS ---
  const currentPrice = predValues.length > 0 ? predValues[0] : 0
  const maxObj = predictionData.length > 0 ? predictionData.reduce((prev, current) => (prev.prediksi_harga > current.prediksi_harga) ? prev : current, predictionData[0]) : null
  const minObj = predictionData.length > 0 ? predictionData.reduce((prev, current) => (prev.prediksi_harga < current.prediksi_harga) ? prev : current, predictionData[0]) : null

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="animate-fadeIn">
        <h1 className="text-2xl md:text-4xl font-bold text-primary mb-2">Tren Harga Komoditas</h1>
        <p className="text-base text-on-surface-variant flex items-center gap-2">
          <span className="material-symbols-outlined text-warning text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          Prediksi berbasis AI untuk 30 hari ke depan
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 animate-fadeIn" style={{ animationDelay: '100ms' }}>
        {/* Commodity Selector */}
        <div className="flex flex-wrap gap-3">
          {['Beras', 'Cabai Merah', 'Bawang Merah'].map(item => (
            <button 
              key={item}
              onClick={() => setSelectedCommodity(item)}
              className={`px-6 py-3 rounded-xl border text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md flex items-center gap-2 ${
                selectedCommodity === item 
                  ? 'border-primary bg-primary-container text-white' 
                  : 'border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:border-primary'
              }`}
            >
              <span>{item}</span>
            </button>
          ))}
        </div>

        {/* Period Selector */}
        <div className="flex bg-surface-container-highest rounded-full p-1 border border-outline-variant">
          {['1 Bulan', '3 Bulan', '6 Bulan'].map(period => (
            <button 
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedPeriod === period 
                  ? 'bg-surface-container-lowest text-primary font-bold shadow-sm' 
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="w-full h-[400px] flex flex-col items-center justify-center text-primary bg-surface-container-lowest rounded-xl shadow-soft">
          <span className="material-symbols-outlined animate-spin text-4xl mb-4">refresh</span>
          <p className="font-medium animate-pulse">Menghitung Prediksi AI Bulanan...</p>
        </div>
      ) : error ? (
        <div className="w-full h-[400px] flex flex-col items-center justify-center text-danger bg-surface-container-lowest rounded-xl shadow-soft">
          <span className="material-symbols-outlined text-4xl mb-4">error</span>
          <p className="font-medium">{error}</p>
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row gap-6 animate-fadeIn" style={{ animationDelay: '200ms' }}>
          {/* Chart Historis */}
          <div className="flex-1 bg-surface-container-lowest rounded-xl p-4 md:p-6 shadow-soft border border-outline-variant/30 relative overflow-hidden">
            <h3 className="text-lg font-bold text-on-surface mb-4">Tren Harga Historis (1 Tahun Terakhir)</h3>
            <div className="relative z-10 w-full h-[300px]">
              <Line data={histChartData} options={commonOptions} />
            </div>
          </div>

          {/* Chart Prediksi */}
          <div className="flex-1 bg-surface-container-lowest rounded-xl p-4 md:p-6 shadow-soft border border-outline-variant/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-surface/50 to-primary-muted/20 pointer-events-none"></div>
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-warning text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              Prediksi Harga ({selectedPeriod} ke Depan)
            </h3>
            <div className="relative z-10 w-full h-[300px]">
              <Line data={predChartData} options={commonOptions} />
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn" style={{ animationDelay: '300ms' }}>
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-soft border border-outline-variant/30 flex flex-col gap-2 hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">today</span>
            </div>
            <span className="text-sm text-on-surface-variant">Harga Prediksi Hari Ini</span>
          </div>
          <div className="font-mono text-xl font-bold text-primary">{formatRp(currentPrice)}</div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-soft border border-outline-variant/30 flex flex-col gap-2 hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <span className="text-sm text-on-surface-variant">Prediksi Tertinggi</span>
          </div>
          <div className="font-mono text-xl font-bold text-on-surface">
            {maxObj ? formatRp(maxObj.prediksi_harga) : 'Rp 0'} 
            <span className="text-xs text-on-surface-variant font-sans font-normal ml-1">({maxObj?.monthYear})</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-soft border border-outline-variant/30 flex flex-col gap-2 hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center text-danger">
              <span className="material-symbols-outlined">trending_down</span>
            </div>
            <span className="text-sm text-on-surface-variant">Prediksi Terendah</span>
          </div>
          <div className="font-mono text-xl font-bold text-on-surface">
            {minObj ? formatRp(minObj.prediksi_harga) : 'Rp 0'} 
            <span className="text-xs text-on-surface-variant font-sans font-normal ml-1">({minObj?.monthYear})</span>
          </div>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-surface-container-lowest rounded-xl shadow-soft border border-outline-variant/30 overflow-hidden animate-fadeIn" style={{ animationDelay: '400ms' }}>
        <button 
          onClick={() => setIsTableOpen(!isTableOpen)}
          className="w-full flex items-center justify-between p-6 bg-surface-container-low hover:bg-surface-container-high transition-colors"
        >
          <span className="text-lg font-bold text-primary">Lihat Data Lengkap</span>
          <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${isTableOpen ? 'rotate-180' : ''}`}>expand_more</span>
        </button>
        
        {isTableOpen && (
          <div className="border-t border-outline-variant/30">
            <div className="overflow-x-auto hide-scrollbar max-h-[400px]">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low sticky top-0">
                  <tr>
                    <th className="py-4 px-6 text-sm font-semibold text-on-surface-variant border-b border-outline-variant/30 whitespace-nowrap">Bulan</th>
                    <th className="py-4 px-6 text-sm font-semibold text-on-surface-variant border-b border-outline-variant/30 whitespace-nowrap">Prediksi Rata-rata</th>
                    <th className="py-4 px-6 text-sm font-semibold text-on-surface-variant border-b border-outline-variant/30 whitespace-nowrap">Batas Bawah</th>
                    <th className="py-4 px-6 text-sm font-semibold text-on-surface-variant border-b border-outline-variant/30 whitespace-nowrap">Batas Atas</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-sm text-on-surface">
                  {predictionData.map((row, index) => (
                    <tr key={index} className={`border-b border-outline-variant/20 hover:bg-surface transition-colors ${index % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low/50'}`}>
                      <td className="py-3 px-6 whitespace-nowrap text-on-surface-variant font-sans">{row.monthYear}</td>
                      <td className="py-3 px-6 whitespace-nowrap text-primary font-bold">{row.prediksi_harga ? formatRp(row.prediksi_harga) : '-'}</td>
                      <td className="py-3 px-6 whitespace-nowrap text-on-surface-variant/80">{row.batas_bawah ? formatRp(row.batas_bawah) : '-'}</td>
                      <td className="py-3 px-6 whitespace-nowrap text-on-surface-variant/80">{row.batas_atas ? formatRp(row.batas_atas) : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Footer Disclaimer */}
      <div className="text-center pb-8">
        <p className="text-sm italic text-secondary">
          Prediksi bersifat indikatif berdasarkan tren historis. Harga aktual dapat berbeda.
        </p>
      </div>
    </div>
  )
}
