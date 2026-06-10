import { useState, useEffect } from 'react'
import { SectionCard, Badge } from '../../components/ui'
import { pembeliApi } from '../../lib/services'

export function PembeliRiwayatPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const res = await pembeliApi.getHistory()
      const data = (res as any).data || []
      // Filter for completed or cancelled orders only
      const history = data.filter((o: any) => ['selesai', 'success', 'batal', 'ditolak'].includes(o.status.toLowerCase()))
      // Sort by latest
      history.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      setOrders(history)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8 text-center text-secondary">Memuat riwayat...</div>

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="opacity-0 animate-fadeUp">
        <h2 className="text-2xl font-bold text-on-surface">Riwayat Pembelian</h2>
        <p className="text-secondary text-sm mt-1">
          Daftar seluruh transaksi yang telah selesai atau dibatalkan.
        </p>
      </div>

      <SectionCard title="Semua Riwayat" icon="history" delay={1}>
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] font-bold text-secondary uppercase tracking-wider border-b border-outline-variant/20">
                <th className="text-left py-2 px-2">ID</th>
                <th className="text-left py-2 px-2">Produk</th>
                <th className="text-left py-2 px-2">Total</th>
                <th className="text-left py-2 px-2">Status</th>
                <th className="text-left py-2 px-2">Tanggal</th>
                <th className="text-left py-2 px-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-secondary">Belum ada riwayat transaksi.</td>
                </tr>
              ) : orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors"
                >
                  <td className="py-3 px-2 font-mono text-primary text-[12px] font-semibold">{order.id}</td>
                  <td className="py-3 px-2">
                    <p className="font-medium text-on-surface line-clamp-1 max-w-[200px]">
                      {order.items?.map((i: any) => i.product?.nama || i.product?.komoditas?.nama || 'Produk').join(', ')}
                    </p>
                    <p className="text-[11px] text-secondary">
                      {order.items?.[0]?.product?.petani?.farm_name || order.items?.[0]?.product?.petani?.name || 'Petani'}
                    </p>
                  </td>
                  <td className="py-3 px-2 font-medium">Rp {order.total_harga?.toLocaleString('id-ID')}</td>
                  <td className="py-3 px-2">
                    <Badge variant={order.status === 'selesai' || order.status === 'success' ? 'success' : 'danger'}>
                      {order.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-[12px] text-secondary">
                    {new Date(order.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-3 px-2">
                    <a href="#" onClick={(e) => { e.preventDefault(); window.print(); }} className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded hover:bg-primary/20 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">receipt</span>
                      Nota
                    </a>
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
