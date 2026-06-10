import { useState, useEffect } from 'react'
import { api } from '../../lib/api'

export function HargaPasarPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tableData, setTableData] = useState<any[]>([])

  const fetchMarketPrices = async () => {
    try {
      const res = await api.get<any>('/v1/admin/market-prices')
      setTableData(res.data || [])
    } catch (err) {
      console.error('Failed to fetch market prices:', err)
    }
  }

  useEffect(() => {
    fetchMarketPrices()
  }, [])

  const handleDelete = async (id: string) => {
    // Find row before deleting
    const rowToDelete = tableData.find(row => row.id === id)
    
    try {
      // Delete from Go Backend
      await api.delete(`/v1/admin/market-prices/${id}`)
      
      // Sync delete with AI Service
      if (rowToDelete) {
        const komoditasMap: Record<string, string> = {
          'Beras': '1',
          'Cabai Merah': '2',
          'Bawang Merah': '3'
        }
        const kid = komoditasMap[rowToDelete.item]
        if (kid) {
          const dateStr = new Date(rowToDelete.date).toISOString().split('T')[0]
          try {
            await fetch(`http://localhost:8000/api/v1/ai/delete_data?komoditas_id=${kid}&tanggal=${dateStr}`, {
              method: 'DELETE'
            })
          } catch(e) {
            console.error("Gagal hapus di AI:", e)
          }
        }
      }

      setTableData(prev => prev.filter(row => row.id !== id))
    } catch (err) {
      console.error('Failed to delete market price:', err)
      alert('Gagal menghapus data harga pasar.')
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const item = (form.elements.namedItem('komoditas') as HTMLSelectElement).value
    const dateStr = (form.elements.namedItem('tanggal') as HTMLInputElement).value
    const priceStr = (form.elements.namedItem('harga') as HTMLInputElement).value
    const region = (form.elements.namedItem('wilayah') as HTMLInputElement).value

    try {
      // Update to Go Backend
      const payload = {
        item,
        date: new Date(dateStr).toISOString(),
        price: parseFloat(priceStr),
        region
      }
      await api.post('/v1/admin/market-prices', payload)
      
      // Update AI Service as well
      const komoditasMap: Record<string, string> = {
        'Beras': '1',
        'Cabai Merah': '2',
        'Bawang Merah': '3'
      }
      const kid = komoditasMap[item]
      if (kid) {
          try {
              await fetch('http://localhost:8000/api/v1/ai/update_data', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ 
                      komoditas_id: kid, 
                      tanggal: dateStr, 
                      harga_aktual: parseFloat(priceStr) 
                  })
              });
          } catch (aiErr) {
              console.error("Gagal sinkronisasi dengan AI service:", aiErr);
          }
      }

      await fetchMarketPrices()
      setIsModalOpen(false)
      alert("Data Harga Pasar berhasil ditambahkan! AI akan menggunakan data ini untuk prediksi berikutnya.")
    } catch (err) {
      console.error('Failed to save market price:', err)
      alert('Gagal menyimpan data harga pasar.')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Data Harga Pasar</h2>
          <p className="text-sm text-secondary mt-1">Data historis yang digunakan model AI Prophet</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-container text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary shadow-sm hover:shadow-soft transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Tambah Data
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-primary-muted border-l-4 border-primary rounded-r-lg p-4 flex items-start gap-3">
        <span className="material-symbols-outlined text-primary mt-0.5">info</span>
        <p className="text-sm text-on-surface-variant">Data ini digunakan langsung oleh model AI Prophet untuk prediksi harga di masa depan.</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface-container-lowest rounded-xl shadow-soft border border-outline-variant/30 p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-auto flex-1 flex flex-col gap-1">
          <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Komoditas</label>
          <div className="relative">
            <select className="w-full appearance-none bg-surface border border-outline-variant rounded-lg px-4 py-2 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-muted outline-none transition-all cursor-pointer">
              <option>Semua Komoditas</option>
              <option>Beras</option>
              <option>Cabai Merah</option>
              <option>Bawang Merah</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">arrow_drop_down</span>
          </div>
        </div>
        <div className="w-full md:w-auto flex-1 flex flex-col gap-1">
          <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Rentang Tanggal</label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-secondary text-[18px]">calendar_today</span>
            <input 
              className="w-full bg-surface border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-muted outline-none transition-all" 
              placeholder="Pilih tanggal..." 
              type="text" 
              defaultValue="1 Jun 2026 - 30 Jun 2026"
            />
          </div>
        </div>
        <div className="w-full md:w-auto self-end mt-2 md:mt-0">
          <button className="w-full md:w-auto border border-outline-variant text-primary hover:bg-surface-container-low transition-colors px-6 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Terapkan Filter
          </button>
        </div>
      </div>

      {/* Data Table Card */}
      <div className="bg-surface-container-lowest rounded-xl shadow-soft border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary-container/20 border-b border-outline-variant/30">
                <th className="py-3 px-6 text-xs font-semibold text-secondary uppercase tracking-wider">Tanggal</th>
                <th className="py-3 px-6 text-xs font-semibold text-secondary uppercase tracking-wider">Komoditas</th>
                <th className="py-3 px-6 text-xs font-semibold text-secondary uppercase tracking-wider">Harga/kg</th>
                <th className="py-3 px-6 text-xs font-semibold text-secondary uppercase tracking-wider">Wilayah</th>
                <th className="py-3 px-6 text-xs font-semibold text-secondary uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-on-surface divide-y divide-outline-variant/20">
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="py-4 px-6 text-secondary">
                    {new Date(row.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-4 px-6 font-medium">{row.item}</td>
                  <td className="py-4 px-6 font-mono font-bold text-primary">Rp {row.price.toLocaleString('id-ID')}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-surface-variant text-on-surface-variant">
                      {row.region}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right transition-opacity">
                    <button className="text-secondary hover:text-primary p-1.5 rounded-md hover:bg-primary-muted transition-colors mr-1" title="Edit" onClick={() => setIsModalOpen(true)}>
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button onClick={() => handleDelete(row.id)} className="text-secondary hover:text-danger p-1.5 rounded-md hover:bg-danger/10 transition-colors" title="Hapus">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest">
          <span className="text-sm text-secondary">Menampilkan 1-10 dari 156 data</span>
          <div className="flex gap-1">
            <button className="p-1.5 rounded-md border border-outline-variant text-secondary hover:bg-surface-container-low transition-colors disabled:opacity-50"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
            <button className="px-3 py-1.5 rounded-md bg-primary-container text-white text-sm font-semibold">1</button>
            <button className="px-3 py-1.5 rounded-md border border-outline-variant text-secondary hover:bg-surface-container-low transition-colors text-sm font-medium">2</button>
            <button className="px-3 py-1.5 rounded-md border border-outline-variant text-secondary hover:bg-surface-container-low transition-colors text-sm font-medium">3</button>
            <button className="p-1.5 rounded-md border border-outline-variant text-secondary hover:bg-surface-container-low transition-colors"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
          </div>
        </div>
      </div>

      {/* Modal Tambah Data */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-surface-container-lowest rounded-xl shadow-popup overflow-hidden animate-fadeIn">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
              <h3 className="text-lg font-bold text-on-surface">Tambah Data Harga</h3>
              <button className="text-secondary hover:text-on-surface p-1 rounded-full hover:bg-surface-container-low transition-colors" onClick={() => setIsModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-secondary">Komoditas</label>
                <div className="relative">
                  <select name="komoditas" required className="w-full appearance-none bg-surface border border-outline-variant rounded-lg px-4 py-2 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-muted outline-none transition-all cursor-pointer">
                    <option value="">Pilih Komoditas</option>
                    <option value="Beras">Beras</option>
                    <option value="Cabai Merah">Cabai Merah</option>
                    <option value="Bawang Merah">Bawang Merah</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">arrow_drop_down</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-secondary">Tanggal</label>
                <input name="tanggal" required className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-muted outline-none transition-all" type="date"/>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-secondary">Harga (Rp)</label>
                <input name="harga" required className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-muted outline-none transition-all" placeholder="14000" type="number"/>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-secondary">Wilayah</label>
                <input name="wilayah" required className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-muted outline-none transition-all" type="text" defaultValue="Nasional"/>
              </div>
              <div className="pt-4 border-t border-outline-variant/30 flex justify-end gap-3 mt-2">
                <button type="button" className="px-4 py-2 rounded-lg text-sm font-medium border border-outline-variant hover:bg-surface-container-low transition-colors" onClick={() => setIsModalOpen(false)}>
                  Batal
                </button>
                <button type="submit" className="bg-primary-container text-white hover:bg-primary transition-colors px-6 py-2 rounded-lg shadow-sm text-sm font-semibold">
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
