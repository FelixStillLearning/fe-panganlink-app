import { useState } from 'react'

export function ModerasiProdukPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const [products, setProducts] = useState([
    {
      id: 'PRD-001',
      name: 'Beras Merah Organik Premium',
      category: 'Biji-bijian',
      farmer: 'Pak Budi Santoso',
      location: 'Subang, Jawa Barat',
      price: '18.500',
      stock: 500,
      status: 'pending',
      date: '24 Okt 2026',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7xmgTKmaBzP10pSL-fFseIL2uckh5J61WKrrOTwfIQPOfM1LM9XOWkKwgAUlAq_u3b1AsoKV8L-sILAQjS5AC-aUdz3IxBHHWgMG7BJvMfpLkde9b1Gniqg-AvO4bvDRYHRZxao9DNh0loNuugmN1rV8quljGeki-A0fIesfiQH4gvp3WxBemeQBf2R-2UBf2HacnLVXqCcix-j0wUGUVQY4O41ssVAB-jd0_gF64IZgCwYb4XWkcEItD6Lx0mIVAqT1kSxTWeDg',
    },
    {
      id: 'PRD-002',
      name: 'Jagung Manis Super',
      category: 'Sayuran',
      farmer: 'Koperasi Tani Makmur',
      location: 'Malang, Jawa Timur',
      price: '6.500',
      stock: 2000,
      status: 'approved',
      date: '23 Okt 2026',
      image: '',
    }
  ])

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: action } : p))
    setIsModalOpen(false)
  }

  const openModal = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Moderasi Produk</h2>
          <p className="text-base text-on-surface-variant mt-1">Review dan setujui produk komoditas yang didaftarkan oleh petani.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">search</span>
            <input 
              className="pl-10 pr-3 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-brand-green focus:ring-2 focus:ring-brand-green-muted transition-all text-sm text-on-surface w-full md:w-64" 
              placeholder="Cari produk..." 
              type="text"
            />
          </div>
          <button className="bg-surface-container-lowest border border-outline-variant text-on-surface px-4 py-2 rounded-lg text-sm hover:bg-surface-container-low transition-colors shadow-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filter
          </button>
        </div>
      </div>

      {/* Tab System */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 border-b border-outline-variant/30 pb-1">
        <button className="px-4 py-2 font-bold text-base text-primary border-b-2 border-primary whitespace-nowrap">
          Semua Produk
        </button>
        <button className="px-4 py-2 font-semibold text-base text-secondary hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1">
          Menunggu Review
          <span className="bg-danger/10 text-danger text-xs px-2 py-0.5 rounded-full">5</span>
        </button>
        <button className="px-4 py-2 font-semibold text-base text-secondary hover:text-primary transition-colors whitespace-nowrap">
          Disetujui
        </button>
        <button className="px-4 py-2 font-semibold text-base text-secondary hover:text-primary transition-colors whitespace-nowrap">
          Ditolak
        </button>
      </div>

      {/* Bento Grid Layout for Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-soft border border-outline-variant/20 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-on-surface-variant">Total Produk</span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            </div>
          </div>
          <div className="text-xl font-bold font-mono text-on-surface">1,248</div>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-soft border border-outline-variant/20 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-surface to-warning/5 pointer-events-none"></div>
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-sm text-on-surface-variant">Menunggu</span>
            <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center text-warning">
              <span className="material-symbols-outlined text-[18px]">pending_actions</span>
            </div>
          </div>
          <div className="text-xl font-bold font-mono text-on-surface relative z-10">12</div>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-soft border border-outline-variant/20 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-on-surface-variant">Disetujui (Bulan ini)</span>
            <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
            </div>
          </div>
          <div className="text-xl font-bold font-mono text-on-surface">342</div>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-soft border border-outline-variant/20 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-on-surface-variant">Ditolak</span>
            <div className="w-8 h-8 rounded-full bg-danger/10 flex items-center justify-center text-danger">
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </div>
          </div>
          <div className="text-xl font-bold font-mono text-on-surface">8</div>
        </div>
      </div>

      {/* Product Table Canvas */}
      <div className="bg-surface-container-lowest rounded-xl shadow-soft border border-outline-variant/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary-container/20 border-b border-outline-variant/30">
                <th className="px-4 py-3 text-sm text-secondary font-semibold">Produk</th>
                <th className="px-4 py-3 text-sm text-secondary font-semibold">Petani</th>
                <th className="px-4 py-3 text-sm text-secondary font-semibold">Harga / Stok</th>
                <th className="px-4 py-3 text-sm text-secondary font-semibold">Status</th>
                <th className="px-4 py-3 text-sm text-secondary font-semibold">Tanggal</th>
                <th className="px-4 py-3 text-sm text-secondary font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-surface-variant flex-shrink-0 border border-outline-variant/30 flex items-center justify-center text-secondary/50">
                        {product.image ? (
                          <img alt={product.name} className="w-full h-full object-cover" src={product.image} />
                        ) : (
                          <span className="material-symbols-outlined">image</span>
                        )}
                      </div>
                      <div>
                        <button className="text-sm text-on-surface font-semibold hover:text-primary transition-colors text-left" onClick={() => openModal(product)}>
                          {product.name}
                        </button>
                        <div className="text-xs font-mono text-on-surface-variant mt-1">{product.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-on-surface">{product.farmer}</div>
                    <div className="text-xs text-on-surface-variant mt-1">{product.location}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-mono font-semibold text-on-surface">Rp {product.price}<span className="text-xs text-on-surface-variant font-normal">/kg</span></div>
                    <div className="text-xs font-mono text-on-surface-variant mt-1">Stok: {product.stock} kg</div>
                  </td>
                  <td className="px-4 py-4">
                    {product.status === 'pending' && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono uppercase bg-warning/10 text-warning">Pending</span>
                    )}
                    {product.status === 'approved' && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono uppercase bg-success/10 text-success">Disetujui</span>
                    )}
                    {product.status === 'rejected' && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono uppercase bg-danger/10 text-danger">Ditolak</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-on-surface-variant">
                    {product.date}
                  </td>
                  <td className="px-4 py-4 text-right">
                    {product.status === 'pending' ? (
                      <div className="flex items-center justify-end gap-1 transition-opacity">
                        <button onClick={() => handleAction(product.id, 'approved')} className="p-1.5 rounded-md bg-success/10 text-success hover:bg-success hover:text-white transition-colors" title="Setujui">
                          <span className="material-symbols-outlined text-[20px]">check</span>
                        </button>
                        <button onClick={() => handleAction(product.id, 'rejected')} className="p-1.5 rounded-md bg-danger/10 text-danger hover:bg-danger hover:text-white transition-colors" title="Tolak">
                          <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                      </div>
                    ) : (
                      <button className="text-secondary hover:text-primary transition-colors p-1" title="Lihat Detail" onClick={() => openModal(product)}>
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest">
          <span className="text-sm text-on-surface-variant">Menampilkan 1-12 dari 1,248</span>
          <div className="flex gap-1">
            <button className="p-1 rounded text-secondary hover:bg-surface-container-high transition-colors disabled:opacity-50" disabled><span className="material-symbols-outlined">chevron_left</span></button>
            <button className="p-1 rounded text-secondary hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
      </div>

      {/* Modal Backdrop & Container */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-outline-variant/30">
              <h3 className="text-xl font-bold text-on-surface">Detail Produk</h3>
              <button className="text-secondary hover:text-on-surface p-1 rounded-full hover:bg-surface-container-high transition-colors" onClick={() => setIsModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto flex-1 bg-surface flex flex-col md:flex-row gap-6">
              {/* Left: Image & Quick Stats */}
              <div className="w-full md:w-1/3 flex flex-col gap-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-surface-variant border border-outline-variant/30 flex items-center justify-center text-secondary/50">
                  {selectedProduct?.image ? (
                    <img alt={selectedProduct?.name} className="w-full h-full object-cover" src={selectedProduct.image} />
                  ) : (
                    <span className="material-symbols-outlined text-4xl">image</span>
                  )}
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/30 flex flex-col gap-2">
                  <div className="text-xs font-mono text-on-surface-variant uppercase tracking-wider">Status Moderasi</div>
                  {selectedProduct?.status === 'pending' && (
                    <span className="inline-flex items-center self-start px-2.5 py-1 rounded-full text-xs font-mono uppercase bg-warning/10 text-warning">Menunggu Review</span>
                  )}
                  {selectedProduct?.status === 'approved' && (
                    <span className="inline-flex items-center self-start px-2.5 py-1 rounded-full text-xs font-mono uppercase bg-success/10 text-success">Disetujui</span>
                  )}
                  {selectedProduct?.status === 'rejected' && (
                    <span className="inline-flex items-center self-start px-2.5 py-1 rounded-full text-xs font-mono uppercase bg-danger/10 text-danger">Ditolak</span>
                  )}
                  <div className="text-xs text-on-surface-variant mt-1">Didaftarkan: {selectedProduct?.date}</div>
                </div>
              </div>
              
              {/* Right: Details */}
              <div className="w-full md:w-2/3 flex flex-col gap-6">
                <div>
                  <div className="text-xs font-mono text-primary mb-1">Kategori: {selectedProduct?.category}</div>
                  <h2 className="text-2xl font-bold text-on-surface leading-tight">{selectedProduct?.name}</h2>
                  <div className="flex gap-6 mt-4">
                    <div>
                      <div className="text-sm text-on-surface-variant mb-1">Harga Diajukan</div>
                      <div className="text-lg font-mono font-bold text-on-surface">Rp {selectedProduct?.price}<span className="text-sm font-normal text-on-surface-variant">/kg</span></div>
                    </div>
                    <div>
                      <div className="text-sm text-on-surface-variant mb-1">Ketersediaan Stok</div>
                      <div className="text-lg font-mono font-bold text-on-surface">{selectedProduct?.stock}<span className="text-sm font-normal text-on-surface-variant"> kg</span></div>
                    </div>
                  </div>
                </div>
                
                <div className="h-px w-full bg-outline-variant/30"></div>
                
                <div>
                  <h4 className="text-lg font-semibold text-on-surface mb-2">Deskripsi Produk</h4>
                  <p className="text-base text-on-surface-variant leading-relaxed">
                    Produk komoditas unggul yang ditanam oleh petani lokal. Kualitas terjamin dan dapat dicek langsung ketersediaannya.
                  </p>
                </div>
                
                <div className="h-px w-full bg-outline-variant/30"></div>
                
                <div>
                  <h4 className="text-lg font-semibold text-on-surface mb-2">Informasi Petani</h4>
                  <div className="bg-surface-container-low p-4 rounded-lg flex items-center gap-4 border border-outline-variant/20">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-on-surface">{selectedProduct?.farmer}</div>
                      <div className="flex items-center gap-1 text-xs text-on-surface-variant mt-0.5">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                        {selectedProduct?.location}
                      </div>
                    </div>
                    <button className="text-primary hover:text-brand-green font-semibold underline text-sm">Lihat Profil</button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer / Actions */}
            <div className="p-4 md:px-6 border-t border-outline-variant/30 bg-surface-container-lowest flex justify-end gap-2">
              <button className="px-6 py-2 rounded-lg text-sm border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors" onClick={() => setIsModalOpen(false)}>
                Tutup
              </button>
              {selectedProduct?.status === 'pending' && (
                <>
                  <button className="px-6 py-2 rounded-lg text-sm bg-danger text-white hover:bg-danger/90 transition-colors flex items-center gap-1 shadow-sm" onClick={() => handleAction(selectedProduct.id, 'rejected')}>
                    <span className="material-symbols-outlined text-[18px]">close</span>
                    Tolak
                  </button>
                  <button className="px-6 py-2 rounded-lg text-sm bg-success text-white hover:bg-success/90 transition-colors flex items-center gap-1 shadow-sm" onClick={() => handleAction(selectedProduct.id, 'approved')}>
                    <span className="material-symbols-outlined text-[18px]">check</span>
                    Setujui
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
