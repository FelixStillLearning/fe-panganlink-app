import { SectionCard, Button, Badge } from '../../components/ui'

const products = [
  { id: 1, name: 'Beras Rojolele', category: 'Beras', stock: '500 kg', price: 'Rp 14.000/kg', status: 'Aktif' },
  { id: 2, name: 'Cabai Merah', category: 'Sayuran', stock: '50 kg', price: 'Rp 45.000/kg', status: 'Menunggu Review' },
]

export function PetaniProdukPage() {
  return (
    <div className="space-y-6 max-w-7xl animate-fadeUp">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Produk Saya</h2>
          <p className="text-secondary text-sm mt-1">Kelola daftar komoditas yang Anda jual di PanganLink.</p>
        </div>
        <Button icon="add" size="md">Tambah Produk</Button>
      </div>

      <SectionCard title="Daftar Produk">
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] font-bold text-secondary uppercase tracking-wider border-b border-outline-variant/20">
                <th className="text-left py-2 px-2">Nama Produk</th>
                <th className="text-left py-2 px-2">Kategori</th>
                <th className="text-left py-2 px-2">Stok</th>
                <th className="text-left py-2 px-2">Harga</th>
                <th className="text-left py-2 px-2">Status</th>
                <th className="text-right py-2 px-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors">
                  <td className="py-3 px-2 font-medium text-on-surface">{p.name}</td>
                  <td className="py-3 px-2 text-secondary">{p.category}</td>
                  <td className="py-3 px-2 font-mono text-[12px] text-secondary">{p.stock}</td>
                  <td className="py-3 px-2 font-mono text-primary font-semibold text-[12px]">{p.price}</td>
                  <td className="py-3 px-2">
                    <Badge variant={p.status === 'Aktif' ? 'success' : 'warning'}>{p.status}</Badge>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <Button variant="ghost" size="sm" icon="edit" className="text-primary hover:bg-primary/10">Edit</Button>
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
