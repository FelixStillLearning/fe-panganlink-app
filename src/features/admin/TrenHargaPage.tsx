import { useState, useMemo } from 'react'
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
  const [selectedPeriod, setSelectedPeriod] = useState('30 Hari')
  const [selectedCommodity, setSelectedCommodity] = useState('Beras')

  // Generate Mock Data
  const { chartData, labels, predictedValues, upperValues, lowerValues } = useMemo(() => {
    const data = []
    let currentPrice = 14000
    const startDate = new Date()
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      
      const change = Math.floor(Math.random() * 600) - 300
      currentPrice = Math.max(13000, Math.min(15500, currentPrice + change))
      
      const confidenceMargin = 400 + Math.floor(Math.random() * 200)
      
      data.push({
        dateStr: date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
        predicted: currentPrice,
        lower: currentPrice - confidenceMargin,
        upper: currentPrice + confidenceMargin
      })
    }

    return {
      chartData: data,
      labels: data.map(d => d.dateStr),
      predictedValues: data.map(d => d.predicted),
      upperValues: data.map(d => d.upper),
      lowerValues: data.map(d => d.lower)
    }
  }, [])

  const formatRp = (value: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    }).format(value)
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Batas Atas',
        data: upperValues,
        borderColor: 'transparent',
        backgroundColor: 'rgba(93, 68, 50, 0.1)',
        fill: '+1',
        pointRadius: 0,
        tension: 0.4
      },
      {
        label: 'Prediksi Harga',
        data: predictedValues,
        borderColor: '#5D4432',
        borderWidth: 2.5,
        backgroundColor: '#5D4432',
        pointRadius: 3,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#5D4432',
        pointHoverRadius: 6,
        tension: 0.4,
        fill: false
      },
      {
        label: 'Batas Bawah',
        data: lowerValues,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        pointRadius: 0,
        tension: 0.4,
        fill: false
      }
    ]
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          font: { family: 'Be Vietnam Pro', size: 12 },
          filter: (item) => item.text !== 'Batas Bawah'
        }
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#28180c',
        bodyColor: '#4f453e',
        borderColor: '#e7e1db',
        borderWidth: 1,
        padding: 12,
        titleFont: { family: 'Be Vietnam Pro', size: 14, weight: 'bold' },
        bodyFont: { family: 'JetBrains Mono', size: 12 },
        displayColors: false,
        callbacks: {
          label: (context) => {
            if(context.datasetIndex === 2) return ''
            if(context.datasetIndex === 1) return `Prediksi: ${formatRp(context.raw as number)}`
            if(context.datasetIndex === 0) {
              const i = context.dataIndex
              return `Range: ${formatRp(lowerValues[i])} - ${formatRp(upperValues[i])}`
            }
            return ''
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'JetBrains Mono', size: 10 }, color: '#4f453e' }
      },
      y: {
        grid: { color: '#e7e1db' },
        ticks: {
          font: { family: 'JetBrains Mono', size: 10 },
          color: '#4f453e',
          callback: (value) => 'Rp ' + (Number(value)/1000) + 'k'
        }
      }
    }
  }

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
          {['7 Hari', '14 Hari', '30 Hari'].map(period => (
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

      {/* Main Chart Area */}
      <div className="bg-surface-container-lowest rounded-xl p-4 md:p-6 shadow-soft border border-outline-variant/30 relative overflow-hidden animate-fadeIn" style={{ animationDelay: '200ms' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-surface/50 to-primary-muted/20 pointer-events-none"></div>
        <div className="relative z-10 w-full h-[350px] md:h-[450px]">
          <Line data={data} options={options} />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn" style={{ animationDelay: '300ms' }}>
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-soft border border-outline-variant/30 flex flex-col gap-2 hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">today</span>
            </div>
            <span className="text-sm text-on-surface-variant">Harga Prediksi Hari Ini</span>
          </div>
          <div className="font-mono text-xl font-bold text-primary">Rp 14.250</div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-soft border border-outline-variant/30 flex flex-col gap-2 hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <span className="text-sm text-on-surface-variant">Prediksi Tertinggi (30 hari)</span>
          </div>
          <div className="font-mono text-xl font-bold text-on-surface">Rp 15.100 <span className="text-xs text-on-surface-variant font-sans font-normal ml-1">(15 Jun)</span></div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-soft border border-outline-variant/30 flex flex-col gap-2 hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center text-danger">
              <span className="material-symbols-outlined">trending_down</span>
            </div>
            <span className="text-sm text-on-surface-variant">Prediksi Terendah (30 hari)</span>
          </div>
          <div className="font-mono text-xl font-bold text-on-surface">Rp 13.800 <span className="text-xs text-on-surface-variant font-sans font-normal ml-1">(22 Jun)</span></div>
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
                    <th className="py-4 px-6 text-sm font-semibold text-on-surface-variant border-b border-outline-variant/30 whitespace-nowrap">Tanggal</th>
                    <th className="py-4 px-6 text-sm font-semibold text-on-surface-variant border-b border-outline-variant/30 whitespace-nowrap">Prediksi</th>
                    <th className="py-4 px-6 text-sm font-semibold text-on-surface-variant border-b border-outline-variant/30 whitespace-nowrap">Batas Bawah</th>
                    <th className="py-4 px-6 text-sm font-semibold text-on-surface-variant border-b border-outline-variant/30 whitespace-nowrap">Batas Atas</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-sm text-on-surface">
                  {chartData.map((row, index) => (
                    <tr key={index} className={`border-b border-outline-variant/20 hover:bg-surface transition-colors ${index % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low/50'}`}>
                      <td className="py-3 px-6 whitespace-nowrap text-on-surface-variant font-sans">{row.dateStr}</td>
                      <td className="py-3 px-6 whitespace-nowrap text-primary font-bold">{formatRp(row.predicted)}</td>
                      <td className="py-3 px-6 whitespace-nowrap text-on-surface-variant/80">{formatRp(row.lower)}</td>
                      <td className="py-3 px-6 whitespace-nowrap text-on-surface-variant/80">{formatRp(row.upper)}</td>
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
