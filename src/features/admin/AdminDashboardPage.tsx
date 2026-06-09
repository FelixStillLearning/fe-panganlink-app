import { useState, useEffect } from 'react'
import { StatCard, SectionCard, Badge, Button } from '../../components/ui'
import { api } from '../../lib/api'

export function AdminDashboardPage() {
  const [stats, setStats] = useState<{total_users: number, total_products: number, total_orders: number, weekly_sales: any[]}>({ total_users: 0, total_products: 0, total_orders: 0, weekly_sales: [] })
  const [users, setUsers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const statsRes = await api.get<any>('/v1/admin/dashboard')
        setStats({
          total_users: statsRes.total_users || 0,
          total_products: statsRes.total_products || 0,
          total_orders: statsRes.total_orders || 0,
          weekly_sales: statsRes.weekly_sales || []
        })

        const usersRes = await api.get<any>('/v1/admin/users')
        setUsers(usersRes.data || [])

        const productsRes = await api.get<any>('/v1/admin/products')
        setProducts(productsRes.data || [])
      } catch (err) {
        console.error('Failed to fetch admin dashboard data:', err)
      }
    }
    fetchDashboard()
  }, [])

  const handleAction = async (id: string, action: 'approved' | 'rejected') => {
    try {
      await api.put(`/v1/admin/products/${id}/${action === 'approved' ? 'approve' : 'reject'}`, {})
      setProducts(prev => prev.map(p => p.id === id ? { ...p, status: action } : p))
    } catch (err) {
      console.error(`Failed to ${action} product:`, err)
      alert(`Gagal mengubah status produk.`)
    }
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Stats Row */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label="Total User"    value={stats.total_users}  icon="group"           iconColor="text-primary" delay={1} />
        <StatCard label="Petani Aktif"  value={users.filter(u => u.role === 'petani').length}   icon="agriculture"     iconColor="text-success" delay={2} />
        <StatCard label="Pembeli Aktif" value={users.filter(u => u.role === 'pembeli').length}  icon="storefront"      iconColor="text-tertiary" delay={3} />
        <StatCard label="Total Produk"  value={stats.total_products}   icon="inventory_2"     iconColor="text-warning"  highlight delay={4} />
        <StatCard label="Transaksi"     value={stats.total_orders}  icon="receipt_long"    iconColor="text-primary" delay={5} />
        <StatCard label="Komoditas"     value={3}    icon="category"        iconColor="text-success" delay={6} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Moderation */}
          <SectionCard
            title="Daftar Produk Terbaru"
            icon="inventory"
            action={<Button variant="ghost" size="sm">Lihat Semua</Button>}
            delay={2}
          >
            <div className="space-y-3">
              {products.slice(0, 5).map((p: any) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between py-2.5 px-2 hover:bg-surface-container/60 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-secondary text-[20px]">
                        eco
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-on-surface text-sm">{p.nama || p.komoditas?.nama || p.komoditas_id || 'Produk'}</p>
                      <p className="text-[12px] text-secondary mt-0.5">
                        {p.petani?.name || 'Petani'} · Harga: Rp{(p.harga || 0).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {p.status === 'pending' ? (
                      <>
                        <button onClick={() => handleAction(p.id, 'approved')} className="p-1.5 rounded-lg bg-success/10 text-success hover:bg-success hover:text-white transition-all duration-200 group active:scale-95" title="Setujui">
                          <span className="material-symbols-outlined text-[18px]">check</span>
                        </button>
                        <button onClick={() => handleAction(p.id, 'rejected')} className="p-1.5 rounded-lg bg-danger/10 text-danger hover:bg-danger hover:text-white transition-all duration-200 group active:scale-95" title="Tolak">
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </>
                    ) : (
                      <Badge variant={p.status === 'approved' ? 'success' : 'danger'}>
                        {p.status === 'approved' ? 'Disetujui' : 'Ditolak'}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <div className="text-center text-secondary py-4 text-sm">Belum ada produk</div>
              )}
            </div>
          </SectionCard>

          {/* Chart */}
          <SectionCard title="Transaksi per Hari (Minggu Ini)" icon="bar_chart" delay={3}>
            <div className="relative">
              <div className="h-52 flex items-end justify-between gap-2 border-b border-outline-variant/30 pb-0 relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between pr-2 text-[10px] text-secondary pointer-events-none -ml-7">
                  <span>100</span>
                  <span>50</span>
                  <span>0</span>
                </div>

                {/* Horizontal grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-full h-px bg-outline-variant/20" />
                  ))}
                </div>

                {/* Bars */}
                {stats.weekly_sales.map((bar) => (
                  <div
                    key={bar.day}
                    className="flex-1 group relative flex items-end justify-center cursor-pointer"
                    style={{ height: '100%' }}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-10">
                      <div className="bg-on-surface text-surface-container-lowest text-[10px] font-semibold px-2 py-1 rounded whitespace-nowrap shadow-popup">
                        {bar.value}
                      </div>
                    </div>
                    {/* Bar */}
                    <div
                      className="w-full bg-brand-green-pale group-hover:bg-brand-green-light rounded-t-lg transition-all duration-300"
                      style={{ height: bar.height }}
                    >
                      <div
                        className="w-full bg-brand-green-light group-hover:bg-primary rounded-t-lg transition-all duration-300"
                        style={{ height: '30%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between mt-2 px-0 text-[11px] text-secondary">
                {stats.weekly_sales.map((bar) => (
                  <span key={bar.day} className="flex-1 text-center">{bar.day}</span>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <SectionCard title="Pendaftar Terbaru" icon="group_add" delay={4}>
            <div className="space-y-4">
              {users.slice(0, 5).map((user, i) => (
                <div
                  key={user.id}
                  className={`${i < Math.min(users.length, 5) - 1 ? 'pb-4 border-b border-outline-variant/20' : ''} space-y-1`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-on-surface text-sm">{user.name}</span>
                    <Badge
                      variant={user.role === 'petani' ? 'success' : user.role === 'admin' ? 'default' : 'info'}
                    >
                      {user.role}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-secondary truncate pr-2">{user.email}</span>
                    <Badge
                      variant={
                        user.status === 'Aktif' ? 'success' :
                        user.status === 'Pending' ? 'warning' :
                        'danger'
                      }
                    >
                      Aktif
                    </Badge>
                  </div>
                  <span className="text-[11px] text-outline font-mono truncate">{user.id}</span>
                </div>
              ))}
              {users.length === 0 && (
                <div className="text-center text-secondary py-4 text-sm">Belum ada user</div>
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
