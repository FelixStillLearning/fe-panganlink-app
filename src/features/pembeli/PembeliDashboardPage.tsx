import { StatCard, SectionCard, Badge, Button } from '../../components/ui'

const recentPurchases = [
  { id: '#ORD-205', product: 'Beras Organik',    qty: '25 kg', seller: 'Budi Santoso',  status: 'Dikirim',  date: '08 Jun 2026' },
  { id: '#ORD-204', product: 'Cabai Merah',       qty: '2 kg',  seller: 'Tani Makmur',   status: 'Selesai',  date: '06 Jun 2026' },
  { id: '#ORD-203', product: 'Madu Hutan',         qty: '1 btl', seller: 'Desa Wangi',    status: 'Selesai',  date: '04 Jun 2026' },
]

export function PembeliDashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome */}
      <div className="opacity-0 animate-fadeUp">
        <p className="text-xs font-semibold text-secondary uppercase tracking-wider">
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface mt-1">
          Halo, Rini! 🛒
        </h2>
        <p className="text-secondary text-sm mt-1 max-w-xl">
          Temukan produk segar langsung dari petani terpercaya.
        </p>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Pembelian" value={18}          icon="shopping_bag"  iconColor="text-primary" delay={1} />
        <StatCard label="Dalam Pengiriman" value={2}          icon="local_shipping" iconColor="text-tertiary" delay={2} />
        <StatCard label="Total Belanja"   value="Rp 1,8 jt"  icon="payments"      iconColor="text-success"  trend="+8% bulan ini" trendUp delay={3} />
        <StatCard label="Produk Favorit"  value={7}           icon="favorite"      iconColor="text-danger"   delay={4} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionCard
            title="Pesanan Terakhir"
            icon="receipt_long"
            action={<Button variant="ghost" size="sm">Riwayat Lengkap</Button>}
            delay={2}
          >
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[10px] font-bold text-secondary uppercase tracking-wider border-b border-outline-variant/20">
                    <th className="text-left py-2 px-2">ID Pesanan</th>
                    <th className="text-left py-2 px-2">Produk</th>
                    <th className="text-left py-2 px-2">Penjual</th>
                    <th className="text-left py-2 px-2">Status</th>
                    <th className="text-left py-2 px-2">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPurchases.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors"
                    >
                      <td className="py-3 px-2 font-mono text-primary text-[12px] font-semibold">{order.id}</td>
                      <td className="py-3 px-2 font-medium text-on-surface">{order.product}</td>
                      <td className="py-3 px-2 text-[12px] text-secondary">{order.seller}</td>
                      <td className="py-3 px-2">
                        <Badge variant={order.status === 'Selesai' ? 'success' : 'info'}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-[12px] text-secondary">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        <div>
          <SectionCard title="Jelajahi Kategori" icon="category" delay={3}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Sayuran', icon: 'local_florist', color: 'bg-success/10 text-success' },
                { name: 'Buah', icon: 'nutrition', color: 'bg-warning/10 text-warning' },
                { name: 'Beras & Biji', icon: 'spa', color: 'bg-primary/10 text-primary' },
                { name: 'Rempah', icon: 'eco', color: 'bg-tertiary/10 text-tertiary' },
                { name: 'Madu & Olahan', icon: 'beehive', color: 'bg-brand-green-light/10 text-brand-green' },
                { name: 'Kopi & Teh', icon: 'coffee', color: 'bg-secondary/10 text-secondary' },
              ].map((cat) => (
                <button
                  key={cat.name}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border border-outline-variant/20 hover:border-primary/30 hover:bg-brand-green-muted transition-all duration-200 interactive-card"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cat.color}`}>
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {cat.icon}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-on-surface text-center">{cat.name}</span>
                </button>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
