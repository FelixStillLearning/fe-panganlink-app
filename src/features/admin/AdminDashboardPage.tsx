import { StatCard, SectionCard, Badge, Button } from '../../components/ui'

const pendingProducts = [
  { id: 1, name: 'Kopi Arabika Gayo',   farmer: 'Budi Santoso',       icon: 'eco',          submitted: '08 Jun 2026' },
  { id: 2, name: 'Beras Merah Organik', farmer: 'Koperasi Tani Makmur', icon: 'spa',         submitted: '07 Jun 2026' },
  { id: 3, name: 'Madu Hutan Liar',     farmer: 'Desa Wangi',          icon: 'local_florist', submitted: '07 Jun 2026' },
]

const recentUsers = [
  { name: 'Andi Wijaya',     email: 'andi.w@email.com',     role: 'Petani',  status: 'Aktif',   date: '08 Jun 2026' },
  { name: 'Siti Aminah',     email: 'siti.a@email.com',     role: 'Pembeli', status: 'Aktif',   date: '07 Jun 2026' },
  { name: 'Budi Santoso',    email: 'budi.s@email.com',     role: 'Petani',  status: 'Pending', date: '07 Jun 2026' },
  { name: 'Koperasi Tani',   email: 'kop.tani@email.com',   role: 'Petani',  status: 'Aktif',   date: '06 Jun 2026' },
  { name: 'Rina Melati',     email: 'rina.m@email.com',     role: 'Pembeli', status: 'Banned',  date: '06 Jun 2026' },
]

const chartBars = [
  { day: 'Sen', value: 30, height: '30%' },
  { day: 'Sel', value: 45, height: '45%' },
  { day: 'Rab', value: 20, height: '20%' },
  { day: 'Kam', value: 60, height: '60%' },
  { day: 'Jum', value: 85, height: '85%' },
  { day: 'Sab', value: 55, height: '55%' },
  { day: 'Min', value: 70, height: '70%' },
]

export function AdminDashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Stats Row */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label="Total User"    value={142}  icon="group"           iconColor="text-primary" delay={1} />
        <StatCard label="Petani Aktif"  value={38}   icon="agriculture"     iconColor="text-success" delay={2} />
        <StatCard label="Pembeli Aktif" value={104}  icon="storefront"      iconColor="text-tertiary" delay={3} />
        <StatCard label="Produk Pending" value={7}   icon="pending_actions" iconColor="text-warning"  highlight delay={4} />
        <StatCard label="Transaksi"     value={289}  icon="receipt_long"    iconColor="text-primary" delay={5} />
        <StatCard label="Komoditas"     value={3}    icon="category"        iconColor="text-success" delay={6} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Moderation */}
          <SectionCard
            title="Produk Menunggu Moderasi"
            icon="warning"
            action={<Button variant="ghost" size="sm">Lihat Semua</Button>}
            delay={2}
          >
            <div className="space-y-3">
              {pendingProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between py-2.5 px-2 hover:bg-surface-container/60 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-secondary text-[20px]">
                        {p.icon}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-on-surface text-sm">{p.name}</p>
                      <p className="text-[12px] text-secondary mt-0.5">
                        {p.farmer} · {p.submitted}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 rounded-lg bg-success/10 text-success hover:bg-success hover:text-white transition-all duration-200 group active:scale-95">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </button>
                    <button className="p-1.5 rounded-lg bg-danger/10 text-danger hover:bg-danger hover:text-white transition-all duration-200 group active:scale-95">
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                </div>
              ))}
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
                {chartBars.map((bar) => (
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
                {chartBars.map((bar) => (
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
              {recentUsers.map((user, i) => (
                <div
                  key={i}
                  className={`${i < recentUsers.length - 1 ? 'pb-4 border-b border-outline-variant/20' : ''} space-y-1`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-on-surface text-sm">{user.name}</span>
                    <Badge
                      variant={user.role === 'Petani' ? 'success' : 'info'}
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
                      {user.status}
                    </Badge>
                  </div>
                  <span className="text-[11px] text-outline font-mono">{user.date}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
