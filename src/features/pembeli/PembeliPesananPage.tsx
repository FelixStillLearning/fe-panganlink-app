import { useState, useEffect } from 'react'
import { Badge, Button } from '../../components/ui'
import { pembeliApi } from '../../lib/services'

export function PembeliPesananPage() {
  const [activeTab, setActiveTab] = useState('Semua')
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = ['Semua', 'Menunggu Pembayaran', 'Diproses', 'Dikirim', 'Selesai']

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await pembeliApi.getOrders()
      const data = (res as any).data || []
      // Only show non-completed/non-cancelled orders in 'Pesanan Saya' active view
      // Unless they are Selesai, we might keep them in 'Semua' or 'Selesai' tab
      setOrders(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await pembeliApi.updateOrderStatus(id, status)
      fetchOrders()
    } catch (err) {
      console.error(err)
    }
  }

  const filteredOrders = orders.filter(o => {
    // Map backend status to tab names
    const statusMap: Record<string, string> = {
      'pending': 'Menunggu Pembayaran',
      'menunggu': 'Menunggu Pembayaran',
      'diproses': 'Diproses',
      'dikirim': 'Dikirim',
      'selesai': 'Selesai',
      'success': 'Selesai',
      'batal': 'Dibatalkan',
      'ditolak': 'Dibatalkan'
    }
    
    const tabStatus = statusMap[o.status] || o.status
    // Hide cancelled orders from this page
    if (tabStatus === 'Dibatalkan') return false
    
    return activeTab === 'Semua' || tabStatus === activeTab
  })

  if (loading) return <div className="p-8 text-center text-secondary">Memuat pesanan...</div>

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="opacity-0 animate-fadeUp">
        <h2 className="text-2xl font-bold text-on-surface">Pesanan Saya</h2>
        <p className="text-secondary text-sm mt-1">
          Pantau status pesanan Anda dari petani.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 opacity-0 animate-fadeUp stagger-1 border-b border-outline-variant/20">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors border-b-2
              ${activeTab === tab 
                ? 'border-primary text-primary' 
                : 'border-transparent text-secondary hover:text-on-surface'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4 opacity-0 animate-fadeUp stagger-2">
        {filteredOrders.length > 0 ? filteredOrders.map(order => (
          <div key={order.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-5 shadow-sm hover:border-primary/30 transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-outline-variant/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">local_mall</span>
                <div>
                  <p className="text-xs text-secondary">ID Pesanan: <span className="font-mono font-medium text-on-surface">{order.id}</span></p>
                  <p className="text-[11px] text-secondary">
                    {new Date(order.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <Badge variant={order.status === 'selesai' || order.status === 'success' ? 'success' : order.status === 'dikirim' ? 'info' : 'warning'}>
                {order.status.toUpperCase()}
              </Badge>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-on-surface">
                  {order.items?.map((i: any) => i.product?.komoditas?.nama || 'Produk').join(', ')}
                </h4>
                <p className="text-sm text-secondary mt-1">
                  {order.items?.length} jenis barang • {order.items?.[0]?.product?.petani?.farm_name || order.items?.[0]?.product?.petani?.name || 'Petani'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-secondary">Total Belanja</p>
                <p className="font-bold text-primary">Rp {order.total_harga?.toLocaleString('id-ID')}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-outline-variant/10 flex justify-end gap-2">
              <Button variant="outline" size="sm">Hubungi Penjual</Button>
              {(order.status === 'selesai' || order.status === 'success') && <Button variant="primary" size="sm">Beri Ulasan</Button>}
              {order.status === 'dikirim' && (
                <>
                  <Button variant="outline" size="sm">Lacak Pengiriman</Button>
                  <Button variant="primary" size="sm" onClick={() => handleUpdateStatus(order.id, 'selesai')}>Pesanan Diterima</Button>
                </>
              )}
            </div>
          </div>
        )) : (
          <div className="py-12 text-center border border-outline-variant/20 rounded-xl bg-surface-container-lowest/50 border-dashed">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">inbox</span>
            <p className="text-on-surface font-medium">Belum ada pesanan</p>
            <p className="text-sm text-secondary">Anda belum memiliki pesanan dengan status ini.</p>
          </div>
        )}
      </div>
    </div>
  )
}
