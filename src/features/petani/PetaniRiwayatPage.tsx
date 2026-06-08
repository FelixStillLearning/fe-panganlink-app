import { SectionCard, Badge } from '../../components/ui'

const history = [
  { id: '#ORD-091', product: 'Cabai Merah', qty: '15 kg', total: 'Rp 675.000', buyer: 'Bapak Rudi', status: 'Selesai', date: '07 Jun 2026' },
  { id: '#ORD-090', product: 'Bawang Merah', qty: '30 kg', total: 'Rp 840.000', buyer: 'Toko Lestari', status: 'Selesai', date: '06 Jun 2026' },
]

export function PetaniRiwayatPage() {
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
                <th className="text-left py-2 px-2">Produk</th>
                <th className="text-left py-2 px-2">Total Pendapatan</th>
                <th className="text-left py-2 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id} className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors">
                  <td className="py-3 px-2 text-[12px] text-secondary">{h.date}</td>
                  <td className="py-3 px-2 font-mono text-primary text-[12px] font-semibold">{h.id}</td>
                  <td className="py-3 px-2 text-on-surface">{h.product} ({h.qty})</td>
                  <td className="py-3 px-2 font-mono text-success text-[12px] font-semibold">{h.total}</td>
                  <td className="py-3 px-2">
                    <Badge variant="success">{h.status}</Badge>
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
