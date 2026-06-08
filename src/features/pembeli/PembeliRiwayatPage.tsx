import { SectionCard, Badge, Button } from '../../components/ui'

const historyOrders = [
  { id: '#ORD-101', product: 'Tomat Cherry', qty: '5 kg', seller: 'Kebun Ceria', date: '15 Mei 2026', total: 'Rp 110.000', status: 'Selesai' },
  { id: '#ORD-098', product: 'Bawang Merah', qty: '10 kg', seller: 'Tani Jaya', date: '02 Mei 2026', total: 'Rp 350.000', status: 'Dibatalkan' },
  { id: '#ORD-085', product: 'Kopi Arabika', qty: '2 pack', seller: 'Kopi Nusantara', date: '20 Apr 2026', total: 'Rp 130.000', status: 'Selesai' },
]

export function PembeliRiwayatPage() {
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
              {historyOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors"
                >
                  <td className="py-3 px-2 font-mono text-primary text-[12px] font-semibold">{order.id}</td>
                  <td className="py-3 px-2">
                    <p className="font-medium text-on-surface">{order.product}</p>
                    <p className="text-[11px] text-secondary">{order.seller}</p>
                  </td>
                  <td className="py-3 px-2 font-medium">{order.total}</td>
                  <td className="py-3 px-2">
                    <Badge variant={order.status === 'Selesai' ? 'success' : 'danger'}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-[12px] text-secondary">{order.date}</td>
                  <td className="py-3 px-2">
                    <Button variant="ghost" size="sm" icon="receipt">Nota</Button>
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
