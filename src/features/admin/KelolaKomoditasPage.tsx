import { useState } from 'react'

export function KelolaKomoditasPage() {
  const [modalType, setModalType] = useState<'none' | 'add' | 'edit' | 'delete'>('none')
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const [komoditas, setKomoditas] = useState([
    { id: 'KMD-001', name: 'Beras Pandan Wangi', icon: 'rice_bowl', unit: 'kg', category: 'Pangan Pokok', color: 'warning' },
    { id: 'KMD-002', name: 'Cabai Merah Keriting', icon: 'local_fire_department', unit: 'kg', category: 'Hortikultura', color: 'danger' },
    { id: 'KMD-004', name: 'Tomat Sayur', icon: 'spa', unit: 'kg', category: 'Sayuran', color: 'success' },
  ])

  const handleDelete = () => {
    if (selectedItem) {
      setKomoditas(prev => prev.filter(k => k.id !== selectedItem.id))
    }
    setModalType('none')
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // For a real app, we'd grab form data. Here we just close the modal.
    setModalType('none')
    alert(modalType === 'add' ? 'Komoditas ditambahkan!' : 'Komoditas diperbarui!')
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Master Komoditas</h2>
          <p className="text-sm text-secondary mt-1">Kelola data referensi komoditas pertanian sistem.</p>
        </div>
        <button 
          onClick={() => setModalType('add')}
          className="bg-primary-container text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary shadow-sm hover:shadow-soft transition-all duration-200 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Tambah Komoditas
        </button>
      </div>

      {/* Main Data Table Area */}
      <div className="bg-surface-container-lowest rounded-xl shadow-soft border border-outline-variant/30 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 md:p-6 border-b border-secondary-container bg-surface-container-lowest flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[20px]">search</span>
            <input 
              className="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-muted transition-all" 
              placeholder="Cari komoditas..." 
              type="text"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-outline-variant rounded-lg text-secondary text-sm hover:bg-surface-container-low transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filter
            </button>
          </div>
        </div>

        {/* Table Wrapper */}
        <div className="overflow-x-auto hide-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-secondary-container/20 text-secondary text-xs font-mono uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold w-24">ID</th>
                <th className="px-6 py-4 font-semibold">Nama Komoditas</th>
                <th className="px-6 py-4 font-semibold w-32">Satuan</th>
                <th className="px-6 py-4 font-semibold w-48">Kategori</th>
                <th className="px-6 py-4 font-semibold text-right w-32">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-sm text-on-surface">
              {komoditas.map((item) => (
                <tr key={item.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-4 font-mono font-bold text-primary">{item.id}</td>
                  <td className="px-6 py-4 font-medium flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                    </div>
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-secondary">{item.unit}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md bg-${item.color}/10 text-${item.color} text-xs font-mono uppercase`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 transition-opacity">
                      <button 
                        onClick={() => { setSelectedItem(item); setModalType('edit') }} 
                        className="p-1.5 text-secondary hover:text-primary hover:bg-primary-muted rounded-md transition-colors" 
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button 
                        onClick={() => { setSelectedItem(item); setModalType('delete') }} 
                        className="p-1.5 text-secondary hover:text-danger hover:bg-danger/10 rounded-md transition-colors" 
                        title="Hapus"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-outline-variant/20 flex items-center justify-between text-secondary text-sm bg-surface-container-lowest">
          <span>Menampilkan 1-3 dari 42 komoditas</span>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-surface-container-low transition-colors disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-md bg-primary-container text-white flex items-center justify-center font-medium">1</button>
            <button className="w-8 h-8 rounded-md hover:bg-surface-container-low flex items-center justify-center font-medium transition-colors">2</button>
            <button className="w-8 h-8 rounded-md hover:bg-surface-container-low flex items-center justify-center font-medium transition-colors">3</button>
            <button className="p-1 rounded hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {(modalType === 'add' || modalType === 'edit') && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={() => setModalType('none')}></div>
          <div className="relative bg-surface-container-lowest rounded-xl shadow-popup w-full max-w-md animate-fadeIn">
            <div className="flex items-center justify-between p-6 border-b border-outline-variant/30">
              <h3 className="text-xl font-bold text-on-surface">
                {modalType === 'add' ? 'Tambah Komoditas Baru' : 'Edit Komoditas'}
              </h3>
              <button className="text-secondary hover:text-on-surface p-1 rounded-full hover:bg-surface-container-low transition-colors" onClick={() => setModalType('none')}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-on-surface-variant mb-1">Nama Komoditas</label>
                <input 
                  required
                  className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all" 
                  placeholder="Cth: Beras Rojo Lele" 
                  type="text"
                  defaultValue={modalType === 'edit' ? selectedItem?.name : ''}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-on-surface-variant mb-1">Kategori</label>
                  <select required className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all">
                    <option value="">Pilih Kategori</option>
                    <option value="pangan">Pangan Pokok</option>
                    <option value="hortikultura">Hortikultura</option>
                    <option value="sayuran">Sayuran</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-on-surface-variant mb-1">Satuan Dasar</label>
                  <select className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all">
                    <option value="kg">Kilogram (kg)</option>
                    <option value="ton">Ton</option>
                    <option value="ikat">Ikat</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-on-surface-variant mb-1">Deskripsi Opsional</label>
                <textarea 
                  className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary-muted transition-all resize-none" 
                  placeholder="Keterangan tambahan komoditas..." 
                  rows={3}
                ></textarea>
              </div>
              <div className="pt-4 border-t border-outline-variant/30 flex justify-end gap-3 mt-4">
                <button type="button" className="px-4 py-2 rounded-lg text-sm font-medium border border-outline-variant hover:bg-surface-container-low transition-colors" onClick={() => setModalType('none')}>
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary-container text-white shadow-sm hover:shadow-soft transition-all">
                  Simpan Komoditas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalType === 'delete' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={() => setModalType('none')}></div>
          <div className="relative bg-surface-container-lowest rounded-xl shadow-popup w-full max-w-sm p-6 text-center animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-danger/10 text-danger flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[24px]">warning</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">Hapus Komoditas?</h3>
            <p className="text-sm text-secondary mb-6">Tindakan ini tidak dapat dibatalkan. Data komoditas <strong>{selectedItem?.name}</strong> akan dihapus secara permanen dari sistem.</p>
            <div className="flex justify-center gap-3 w-full">
              <button className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border border-outline-variant hover:bg-surface-container-low transition-colors" onClick={() => setModalType('none')}>
                Batal
              </button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold bg-danger text-white shadow-sm hover:bg-danger/90 transition-all">
                Hapus Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
