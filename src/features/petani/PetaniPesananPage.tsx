import { SectionCard, Badge, Button } from '../../components/ui'

const orders = [
  { id: '#ORD-092', product: 'Beras Rojolele', qty: '50 kg', total: 'Rp 700.000', buyer: 'Toko Makmur', status: 'Menunggu Konfirmasi', date: '08 Jun 2026' },
  { id: '#ORD-093', product: 'Cabai Merah', qty: '10 kg', total: 'Rp 450.000', buyer: 'Supermarket Segar', status: 'Diproses', date: '08 Jun 2026' },
]

export function PetaniPesananPage() {
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
                    <Badge variant={o.status === 'Menunggu Konfirmasi' ? 'warning' : 'primary'}>{o.status}</Badge>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <Button variant="outline" size="sm">Update</Button>
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
