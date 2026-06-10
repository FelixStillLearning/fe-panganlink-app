import { useState, useEffect } from 'react'
import { SectionCard, Badge } from '../../components/ui'
import { petaniApi } from '../../lib/services'

export function PetaniRiwayatPage() {
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    setLoading(true)
    try {
      // In the backend GetHistory uses the same GetPetaniOrders service
      const res = await petaniApi.getHistory()
      // Filter out only completed or canceled orders
      const completedOrders = ((res as any).data || []).filter((o: any) => 
        o.status === 'selesai' || o.status === 'success' || o.status === 'canceled' || o.status === 'rejected'
      )
      // Sort by newest first
      completedOrders.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      setHistory(completedOrders)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  const formatRupiah = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`
  }

  if (loading) {
    return <div className="p-8 text-center text-secondary">Memuat riwayat penjualan...</div>
  }

  return (
    <div className="space-y-6 max-w-7xl animate-fadeUp">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Riwayat Penjualan</h2>
        <p className="text-secondary text-sm mt-1">Rekap semua pesanan yang telah selesai atau dibatalkan.</p>
      </div>

      <SectionCard title="History">
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] font-bold text-secondary uppercase tracking-wider border-b border-outline-variant/20">
                <th className="text-left py-2 px-2">Tanggal</th>
                <th className="text-left py-2 px-2">ID Pesanan</th>
                <th className="text-left py-2 px-2">Pembeli</th>
                <th className="text-left py-2 px-2">Produk</th>
                <th className="text-left py-2 px-2">Total Pendapatan</th>
                <th className="text-left py-2 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr><td colSpan={6} className="py-8 text-center text-secondary">Belum ada riwayat penjualan</td></tr>
              ) : history.map((h) => (
                <tr key={h.id} className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors">
                  <td className="py-3 px-2 text-[12px] text-secondary">{formatDate(h.created_at)}</td>
                  <td className="py-3 px-2 font-mono text-primary text-[12px] font-semibold">{h.id}</td>
                  <td className="py-3 px-2 text-on-surface">{h.buyer?.name || 'Guest'}</td>
                  <td className="py-3 px-2 text-on-surface">
                    {h.items?.map((item: any) => `${item.product?.nama || item.product?.komoditas?.nama || 'Produk'} (${item.jumlah}kg)`).join(', ')}
                  </td>
                  <td className="py-3 px-2 font-mono text-success text-[12px] font-semibold">{formatRupiah(h.total_harga)}</td>
                  <td className="py-3 px-2">
                    <Badge variant={h.status === 'selesai' || h.status === 'success' ? 'success' : 'danger'}>{h.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}
