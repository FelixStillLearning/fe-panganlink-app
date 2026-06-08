import { useState } from 'react'
import { Badge, Button } from '../../components/ui'

const mockOrders = [
  { id: '#ORD-205', product: 'Beras Organik Mentik Wangi', qty: '25 kg', seller: 'Budi Santoso', status: 'Diproses', date: '08 Jun 2026', total: 'Rp 450.000' },
  { id: '#ORD-204', product: 'Cabai Merah Keriting', qty: '2 kg', seller: 'Tani Makmur', status: 'Dikirim', date: '06 Jun 2026', total: 'Rp 90.000' },
  { id: '#ORD-203', product: 'Madu Hutan Asli', qty: '1 btl', seller: 'Desa Wangi', status: 'Selesai', date: '04 Jun 2026', total: 'Rp 85.000' },
]

export function PembeliPesananPage() {
  const [activeTab, setActiveTab] = useState('Semua')
  const tabs = ['Semua', 'Menunggu Pembayaran', 'Diproses', 'Dikirim', 'Selesai']

  const filteredOrders = mockOrders.filter(o => activeTab === 'Semua' || o.status === activeTab)

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
                  <p className="text-[11px] text-secondary">{order.date}</p>
                </div>
              </div>
              <Badge variant={order.status === 'Selesai' ? 'success' : order.status === 'Dikirim' ? 'info' : 'warning'}>
                {order.status}
              </Badge>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-on-surface">{order.product}</h4>
                <p className="text-sm text-secondary mt-1">{order.qty} • {order.seller}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-secondary">Total Belanja</p>
                <p className="font-bold text-primary">{order.total}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-outline-variant/10 flex justify-end gap-2">
              <Button variant="outline" size="sm">Hubungi Penjual</Button>
              {order.status === 'Selesai' && <Button variant="primary" size="sm">Beri Ulasan</Button>}
              {order.status === 'Dikirim' && <Button variant="primary" size="sm">Lacak Pengiriman</Button>}
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
