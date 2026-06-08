import { useEffect, useState } from 'react'
import { StatCard, SectionCard, Badge, Button } from '../../components/ui'
import { pembeliApi, authApi } from '../../lib/services'

export function PembeliDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      authApi.getMe(),
      pembeliApi.getDashboard()
    ]).then(([meRes, statsRes]: any) => {
      setUser(meRes.user)
      setStats(statsRes.data)
      setLoading(false)
    }).catch((err) => {
      console.error(err)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div className="p-8 text-center text-secondary">Memuat dashboard...</div>
  }

  const name = user?.name ? user.name.split(' ')[0] : 'Pembeli'
  const recentOrders = stats?.recent_orders?.slice(0, 5) || []

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome */}
      <div className="opacity-0 animate-fadeUp">
        <p className="text-xs font-semibold text-secondary uppercase tracking-wider">
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface mt-1">
          Halo, {name}! 🛒
        </h2>
        <p className="text-secondary text-sm mt-1 max-w-xl">
          Temukan produk segar langsung dari petani terpercaya.
        </p>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Pembelian" value={stats?.total_pembelian || 0}          icon="shopping_bag"  iconColor="text-primary" delay={1} />
        <StatCard label="Dalam Pengiriman" value={stats?.dalam_pengiriman || 0}          icon="local_shipping" iconColor="text-tertiary" delay={2} />
        <StatCard label="Total Belanja"   value={`Rp ${(stats?.total_belanja || 0).toLocaleString('id-ID')}`}  icon="payments"      iconColor="text-success"  trend="" trendUp delay={3} />
        <StatCard label="Produk Favorit"  value={stats?.produk_favorit || 0}           icon="favorite"      iconColor="text-danger"   delay={4} />
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
                  {recentOrders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-secondary">Belum ada pesanan</td>
                    </tr>
                  ) : recentOrders.map((order: any) => (
                    <tr
                      key={order.id}
                      className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors"
                    >
                      <td className="py-3 px-2 font-mono text-primary text-[12px] font-semibold">{order.id}</td>
                      <td className="py-3 px-2 font-medium text-on-surface">
                        {order.items?.map((i: any) => i.product?.komoditas?.nama || 'Produk').join(', ')}
                      </td>
                      <td className="py-3 px-2 text-[12px] text-secondary">
                        {order.items?.[0]?.product?.petani?.name || 'Petani'}
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant={order.status === 'selesai' || order.status === 'success' ? 'success' : order.status === 'pending' || order.status === 'menunggu' ? 'warning' : 'info'}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-[12px] text-secondary">
                        {new Date(order.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
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
