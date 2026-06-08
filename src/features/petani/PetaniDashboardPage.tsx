import { StatCard, SectionCard, Badge, Button } from '../../components/ui'

const recentOrders = [
  { id: '#ORD-092', product: 'Beras Rojolele',    qty: '50 kg',  status: 'Menunggu', date: '08 Jun 2026' },
  { id: '#ORD-091', product: 'Cabai Merah',       qty: '15 kg',  status: 'Selesai',  date: '07 Jun 2026' },
  { id: '#ORD-090', product: 'Bawang Merah',      qty: '30 kg',  status: 'Selesai',  date: '06 Jun 2026' },
]

const aiRecs = [
  { name: 'Cabai Merah',  trend: '+15% Permintaan', direction: 'up',     price: 'Rp 45k/kg', icon: 'trending_up' },
  { name: 'Beras Premium', trend: 'Stabil',          direction: 'flat',   price: 'Rp 14k/kg', icon: 'trending_flat' },
  { name: 'Bawang Merah', trend: '-5% Pasokan',     direction: 'down',   price: 'Rp 28k/kg', icon: 'trending_down' },
]

export function PetaniDashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome */}
      <div className="opacity-0 animate-fadeUp">
        <p className="text-xs font-semibold text-secondary uppercase tracking-wider">
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface mt-1">
          Selamat datang, Budi! 👋
        </h2>
        <p className="text-secondary text-sm mt-1 max-w-xl">
          Pantau aktivitas toko dan perbarui stok hasil panen Anda hari ini.
        </p>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Produk"      value={12}            icon="inventory_2"     iconColor="text-primary"  trend="2 baru bulan ini" trendUp delay={1} />
        <StatCard label="Order Menunggu"    value={3}             icon="pending_actions" iconColor="text-warning"  delay={2} />
        <StatCard label="Penjualan Bulan Ini" value="Rp 4,2 jt" icon="payments"        iconColor="text-success"  trend="+12% vs bulan lalu" trendUp delay={3} />
        <StatCard label="Pending Approve"   value={2}             icon="gavel"           iconColor="text-danger"   delay={4} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders table */}
        <div className="lg:col-span-2 space-y-6">
          <SectionCard
            title="Pesanan Terbaru"
            icon="shopping_cart_checkout"
            action={<Button variant="ghost" size="sm">Lihat Semua</Button>}
            delay={2}
          >
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[10px] font-bold text-secondary uppercase tracking-wider border-b border-outline-variant/20">
                    <th className="text-left py-2 px-2">ID Pesanan</th>
                    <th className="text-left py-2 px-2">Komoditas</th>
                    <th className="text-left py-2 px-2">Jumlah</th>
                    <th className="text-left py-2 px-2">Status</th>
                    <th className="text-left py-2 px-2">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors"
                    >
                      <td className="py-3 px-2 font-mono text-primary text-[12px] font-semibold">
                        {order.id}
                      </td>
                      <td className="py-3 px-2 font-medium text-on-surface">{order.product}</td>
                      <td className="py-3 px-2 font-mono text-[12px] text-secondary">{order.qty}</td>
                      <td className="py-3 px-2">
                        <Badge variant={order.status === 'Selesai' ? 'success' : 'warning'}>
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

        {/* AI Recommendations */}
        <div>
          <SectionCard
            title="Prophet AI"
            icon="temp_preferences_custom"
            delay={3}
            className="relative overflow-hidden"
          >
            {/* Decorative blob */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-brand-green-muted rounded-full blur-2xl pointer-events-none" />

            <p className="text-sm text-secondary mb-4">
              Prediksi harga komoditas minggu depan berdasarkan tren pasar.
            </p>
            <div className="space-y-3">
              {aiRecs.map((rec) => (
                <div
                  key={rec.name}
                  className="flex items-center justify-between bg-surface-container rounded-xl p-3 interactive-card"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        rec.direction === 'up'   ? 'bg-success/10 text-success' :
                        rec.direction === 'down' ? 'bg-danger/10 text-danger' :
                                                   'bg-warning/10 text-warning'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{rec.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{rec.name}</p>
                      <p
                        className={`text-[11px] font-medium ${
                          rec.direction === 'up'   ? 'text-success' :
                          rec.direction === 'down' ? 'text-danger' :
                                                     'text-warning'
                        }`}
                      >
                        {rec.trend}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-bold font-mono text-primary">{rec.price}</p>
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full" size="md">
              Lihat Analisis Lengkap
            </Button>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
