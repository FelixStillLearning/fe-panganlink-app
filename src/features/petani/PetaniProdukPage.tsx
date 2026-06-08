import { useState } from 'react'
import { SectionCard, Button, Badge, Modal } from '../../components/ui'

const products = [
  { id: 1, name: 'Beras Rojolele', category: 'Beras', stock: '500 kg', price: 'Rp 14.000/kg', status: 'Aktif' },
  { id: 2, name: 'Cabai Merah', category: 'Sayuran', stock: '50 kg', price: 'Rp 45.000/kg', status: 'Menunggu Review' },
]

export function PetaniProdukPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')

  const handleOpenModal = (mode: 'add' | 'edit') => {
    setModalMode(mode)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6 max-w-7xl animate-fadeUp">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Produk Saya</h2>
          <p className="text-secondary text-sm mt-1">Kelola daftar komoditas yang Anda jual di PanganLink.</p>
        </div>
        <Button icon="add" size="md" onClick={() => handleOpenModal('add')}>Tambah Produk</Button>
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
                    <Button variant="ghost" size="sm" icon="edit" onClick={() => handleOpenModal('edit')}>Edit</Button>
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
        title={modalMode === 'add' ? 'Tambah Produk Baru' : 'Edit Produk'}
      >
        <div className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Foto Produk</label>
            <label className="block border-2 border-dashed border-outline-variant/60 rounded-xl p-6 text-center hover:border-primary/50 hover:bg-brand-green-muted transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-secondary group-hover:text-primary">add_photo_alternate</span>
              </div>
              <p className="text-sm font-medium text-on-surface">Klik untuk unggah foto</p>
              <p className="text-[11px] text-secondary mt-1">Format JPG, PNG (Max. 2MB)</p>
              <input type="file" className="hidden" accept="image/*" />
            </label>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Nama Produk</label>
            <input type="text" className="w-full bg-transparent text-sm text-on-surface p-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all" placeholder="Cth: Beras Rojolele Premium" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Kategori</label>
              <select className="w-full bg-transparent text-sm text-on-surface p-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all">
                <option>Beras</option>
                <option>Sayuran</option>
                <option>Buah-buahan</option>
                <option>Bumbu Dapur</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Stok (kg)</label>
              <input type="number" className="w-full bg-transparent text-sm text-on-surface p-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all" placeholder="0" />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Harga per Kg</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-sm font-bold text-secondary">Rp</span>
              <input type="number" className="w-full bg-transparent text-sm text-on-surface py-2.5 pr-3 pl-9 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all" placeholder="14000" />
            </div>
          </div>
          <div className="pt-5 flex gap-3 justify-end border-t border-outline-variant/30 mt-2">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button icon="save" onClick={() => setIsModalOpen(false)}>Simpan Produk</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
