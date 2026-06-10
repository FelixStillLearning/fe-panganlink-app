import { useState, useEffect } from 'react'
import { SectionCard, Badge, Button, Modal } from '../../components/ui'
import { petaniApi } from '../../lib/services'

export function PetaniPesananPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await petaniApi.getOrders()
      // Filter out completed/canceled orders for "Order Masuk" page
      const activeOrders = ((res as any).data || []).filter((o: any) => 
        o.status !== 'selesai' && o.status !== 'success' && o.status !== 'canceled' && o.status !== 'rejected'
      )
      // Sort by newest first
      activeOrders.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      setOrders(activeOrders)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateClick = (order: any) => {
    setSelectedOrder(order)
    setSelectedStatus(order.status)
    setIsModalOpen(true)
  }

  const handleUpdateSubmit = async () => {
    if (!selectedOrder) return
    try {
      await petaniApi.updateOrderStatus(selectedOrder.id, selectedStatus)
      setIsModalOpen(false)
      fetchOrders() // refresh data
    } catch (err: any) {
      alert(err.message || 'Gagal mengupdate status pesanan')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  const formatRupiah = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`
  }

  if (loading) {
    return <div className="p-8 text-center text-secondary">Memuat daftar pesanan...</div>
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
                <th className="text-left py-2 px-2">Tanggal</th>
                <th className="text-left py-2 px-2">ID Pesanan</th>
                <th className="text-left py-2 px-2">Pembeli</th>
                <th className="text-left py-2 px-2">Produk</th>
                <th className="text-left py-2 px-2">Total Harga</th>
                <th className="text-left py-2 px-2">Status</th>
                <th className="text-right py-2 px-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan={7} className="py-8 text-center text-secondary">Belum ada order masuk</td></tr>
              ) : orders.map((o) => (
                <tr key={o.id} className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors">
                  <td className="py-3 px-2 text-[12px] text-secondary">{formatDate(o.created_at)}</td>
                  <td className="py-3 px-2 font-mono text-primary text-[12px] font-semibold">{o.id}</td>
                  <td className="py-3 px-2 font-medium text-on-surface">{o.buyer?.name || 'Guest'}</td>
                  <td className="py-3 px-2 text-secondary">
                    {o.items?.map((item: any) => `${item.product?.nama || item.product?.komoditas?.nama || 'Produk'} (${item.jumlah}kg)`).join(', ')}
                  </td>
                  <td className="py-3 px-2 font-mono text-primary text-[12px] font-semibold">{formatRupiah(o.total_harga)}</td>
                  <td className="py-3 px-2">
                    <Badge variant={o.status === 'pending' || o.status === 'menunggu' ? 'warning' : 'info'}>{o.status}</Badge>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <Button variant="outline" size="sm" icon="update" onClick={() => handleUpdateClick(o)}>Update</Button>
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
        title={`Update Status Pesanan ${selectedOrder?.id || ''}`}
      >
        <div className="space-y-5">
          <p className="text-sm text-secondary bg-warning/10 p-3 rounded-lg border border-warning/20">
            <span className="material-symbols-outlined text-[16px] text-warning mr-1.5 align-text-bottom">info</span>
            Pilih status terbaru untuk pesanan ini. Pembeli akan menerima notifikasi otomatis.
          </p>
          <div>
            <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-2.5">Status Pesanan</label>
            <div className="space-y-2.5">
              {[
                { value: 'pending', label: 'Menunggu Pembayaran' },
                { value: 'paid', label: 'Sudah Dibayar / Menunggu Konfirmasi' },
                { value: 'diproses', label: 'Sedang Diproses' },
                { value: 'dikirim', label: 'Sedang Dikirim' },
                { value: 'selesai', label: 'Selesai' }
              ].map((status) => (
                <label key={status.value} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selectedStatus === status.value ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/50 hover:bg-surface-container/30'}`}>
                  <input 
                    type="radio" 
                    name="order_status" 
                    className="text-primary focus:ring-primary w-4 h-4 accent-primary" 
                    checked={selectedStatus === status.value} 
                    onChange={() => setSelectedStatus(status.value)} 
                  />
                  <span className="text-sm font-medium text-on-surface">{status.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="pt-5 flex gap-3 justify-end border-t border-outline-variant/30 mt-2">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button icon="check_circle" onClick={handleUpdateSubmit}>Konfirmasi Status</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
