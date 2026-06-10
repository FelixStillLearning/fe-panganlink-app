import { useState, useEffect } from 'react'
import { SectionCard, Button, Badge, Modal } from '../../components/ui'
import { petaniApi, publicApi } from '../../lib/services'
import { api } from '../../lib/api'

export function PetaniProdukPage() {
  const [products, setProducts] = useState<any[]>([])
  const [commodities, setCommodities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    id: '',
    komoditas_id: '',
    nama: '',
    deskripsi: '',
    stok: 0,
    harga: 0,
    foto_url: '',
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [prodRes, comRes] = await Promise.all([
        petaniApi.getProducts(),
        publicApi.getCommodities()
      ])
      setProducts((prodRes as any).data || [])
      setCommodities((comRes as any).data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (mode: 'add' | 'edit', product?: any) => {
    setModalMode(mode)
    if (mode === 'edit' && product) {
      setFormData({
        id: product.id,
        komoditas_id: product.komoditas_id,
        nama: product.nama || '',
        deskripsi: product.deskripsi || '',
        stok: product.stok,
        harga: product.harga,
        foto_url: product.foto_url,
      })
    } else {
      setFormData({
        id: '',
        komoditas_id: commodities.length > 0 ? commodities[0].id : '',
        nama: '',
        deskripsi: '',
        stok: 0,
        harga: 0,
        foto_url: '',
      })
    }
    setIsModalOpen(true)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const form = new FormData()
    form.append('image', file)
    try {
      // Direct call to upload endpoint
      const res = await api.post<any>('/v1/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (res.url) {
        setFormData({ ...formData, foto_url: res.url })
      }
    } catch (err) {
      console.error('Upload failed', err)
      alert('Gagal mengunggah foto.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      const payload = {
        komoditas_id: formData.komoditas_id,
        nama: formData.nama,
        deskripsi: formData.deskripsi,
        stok: Number(formData.stok),
        harga: Number(formData.harga),
        foto_url: formData.foto_url,
      }

      if (modalMode === 'add') {
        await petaniApi.addProduct(payload)
      } else {
        await petaniApi.updateProduct(formData.id, payload)
      }
      setIsModalOpen(false)
      fetchData()
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan produk')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return
    try {
      await petaniApi.deleteProduct(id)
      fetchData()
    } catch (err: any) {
      alert(err.message || 'Gagal menghapus produk')
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-secondary">Memuat data produk...</div>
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
                <th className="text-left py-2 px-2">Komoditas</th>
                <th className="text-left py-2 px-2">Kategori</th>
                <th className="text-left py-2 px-2">Stok</th>
                <th className="text-left py-2 px-2">Harga</th>
                <th className="text-left py-2 px-2">Status</th>
                <th className="text-right py-2 px-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan={6} className="py-8 text-center text-secondary">Belum ada produk</td></tr>
              ) : products.map((p) => (
                <tr key={p.id} className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors">
                  <td className="py-3 px-2 font-medium text-on-surface flex items-center gap-3">
                    {p.foto_url ? (
                      <img src={p.foto_url} alt={p.nama || p.komoditas?.nama} className="w-10 h-10 rounded object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded bg-surface-container-high flex items-center justify-center">
                         <span className="material-symbols-outlined text-secondary text-[16px]">image</span>
                      </div>
                    )}
                    {p.nama || p.komoditas?.nama || p.komoditas_id}
                  </td>
                  <td className="py-3 px-2 text-secondary">{p.komoditas?.kategori || '-'}</td>
                  <td className="py-3 px-2 font-mono text-[12px] text-secondary">{p.stok} kg</td>
                  <td className="py-3 px-2 font-mono text-primary font-semibold text-[12px]">Rp {p.harga.toLocaleString('id-ID')}</td>
                  <td className="py-3 px-2">
                    <Badge variant={p.status === 'approved' ? 'success' : p.status === 'rejected' ? 'danger' : 'warning'}>
                      {p.status === 'approved' ? 'Aktif' : p.status === 'rejected' ? 'Ditolak' : 'Menunggu Review'}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" icon="edit" onClick={() => handleOpenModal('edit', p)}>Edit</Button>
                      <Button variant="ghost" size="sm" icon="delete" className="!text-danger" onClick={() => handleDelete(p.id)}>Hapus</Button>
                    </div>
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
            <label className="block border-2 border-dashed border-outline-variant/60 rounded-xl p-6 text-center hover:border-primary/50 hover:bg-brand-green-muted transition-colors cursor-pointer group relative overflow-hidden">
              {formData.foto_url ? (
                 <img src={formData.foto_url} alt="Preview" className="mx-auto h-20 object-contain mb-2 rounded" />
              ) : (
                <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-secondary group-hover:text-primary">
                    {uploading ? 'hourglass_empty' : 'add_photo_alternate'}
                  </span>
                </div>
              )}
              <p className="text-sm font-medium text-on-surface">
                {uploading ? 'Mengunggah...' : formData.foto_url ? 'Klik untuk mengganti foto' : 'Klik untuk unggah foto'}
              </p>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
            </label>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Nama Produk / Merk</label>
            <input 
              type="text" 
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              className="w-full bg-transparent text-sm text-on-surface p-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all" 
              placeholder="Cth: Beras Premium Maknyus 5kg" 
              required
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Kategori Komoditas</label>
            <select 
              value={formData.komoditas_id}
              onChange={(e) => setFormData({ ...formData, komoditas_id: e.target.value })}
              className="w-full bg-transparent text-sm text-on-surface p-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all"
            >
              <option value="" disabled>-- Pilih Komoditas --</option>
              {commodities.map((c) => (
                <option key={c.id} value={c.id}>{c.nama} ({c.kategori})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Deskripsi Produk</label>
            <textarea 
              value={formData.deskripsi}
              onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
              className="w-full bg-transparent text-sm text-on-surface p-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all resize-none" 
              placeholder="Ceritakan tentang produk Anda..." 
              rows={3}
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Stok (kg)</label>
              <input 
                type="number" 
                value={formData.stok || ''}
                onChange={(e) => setFormData({ ...formData, stok: Number(e.target.value) })}
                className="w-full bg-transparent text-sm text-on-surface p-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Harga per Kg</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-sm font-bold text-secondary">Rp</span>
                <input 
                  type="number" 
                  value={formData.harga || ''}
                  onChange={(e) => setFormData({ ...formData, harga: Number(e.target.value) })}
                  className="w-full bg-transparent text-sm text-on-surface py-2.5 pr-3 pl-9 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all" 
                  placeholder="14000" 
                />
              </div>
            </div>
          </div>
          <div className="pt-5 flex gap-3 justify-end border-t border-outline-variant/30 mt-2">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button icon="save" onClick={handleSubmit} disabled={!formData.komoditas_id || uploading}>Simpan Produk</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
