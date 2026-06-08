import { useState } from 'react'
import { SectionCard, Badge, Button, Modal } from '../../components/ui'

const orders = [
  { id: '#ORD-092', product: 'Beras Rojolele', qty: '50 kg', total: 'Rp 700.000', buyer: 'Toko Makmur', status: 'Menunggu Konfirmasi', date: '08 Jun 2026' },
  { id: '#ORD-093', product: 'Cabai Merah', qty: '10 kg', total: 'Rp 450.000', buyer: 'Supermarket Segar', status: 'Diproses', date: '08 Jun 2026' },
]

export function PetaniPesananPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const handleUpdate = (id: string) => {
    setSelectedOrder(id)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6 max-w-7xl animate-fadeUp">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Order Masuk</h2>
        <p className="text-secondary text-sm mt-1">Kelola pesanan dari pembeli dan perbarui status pengiriman.</p>
      </div>

      <SectionCard title="Daftar Pesanan">
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] font-bold text-secondary uppercase tracking-wider border-b border-outline-variant/20">
                <th className="text-left py-2 px-2">ID Pesanan</th>
                <th className="text-left py-2 px-2">Pembeli</th>
                <th className="text-left py-2 px-2">Produk</th>
                <th className="text-left py-2 px-2">Total Harga</th>
                <th className="text-left py-2 px-2">Status</th>
                <th className="text-right py-2 px-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors">
                  <td className="py-3 px-2 font-mono text-primary text-[12px] font-semibold">{o.id}</td>
                  <td className="py-3 px-2 font-medium text-on-surface">{o.buyer}</td>
                  <td className="py-3 px-2 text-secondary">{o.product} ({o.qty})</td>
                  <td className="py-3 px-2 font-mono text-primary text-[12px] font-semibold">{o.total}</td>
                  <td className="py-3 px-2">
                    <Badge variant={o.status === 'Menunggu Konfirmasi' ? 'warning' : 'info'}>{o.status}</Badge>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <Button variant="outline" size="sm" icon="update" onClick={() => handleUpdate(o.id)}>Update</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Update Status Pesanan ${selectedOrder || ''}`}
      >
        <div className="space-y-5">
          <p className="text-sm text-secondary bg-warning/10 p-3 rounded-lg border border-warning/20">
            <span className="material-symbols-outlined text-[16px] text-warning mr-1.5 align-text-bottom">info</span>
            Pilih status terbaru untuk pesanan ini. Pembeli akan menerima notifikasi otomatis.
          </p>
          <div>
            <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-2.5">Status Pesanan</label>
            <div className="space-y-2.5">
              {['Menunggu Konfirmasi', 'Diproses', 'Dikirim', 'Selesai'].map((status) => (
                <label key={status} className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant hover:border-primary/50 hover:bg-surface-container/30 cursor-pointer transition-all">
                  <input type="radio" name="order_status" className="text-primary focus:ring-primary w-4 h-4 accent-primary" defaultChecked={status === 'Diproses'} />
                  <span className="text-sm font-medium text-on-surface">{status}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="pt-5 flex gap-3 justify-end border-t border-outline-variant/30 mt-2">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button icon="check_circle" onClick={() => setIsModalOpen(false)}>Konfirmasi Status</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
