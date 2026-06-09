import { useState, useEffect } from 'react'
import { SectionCard, Button, EmptyState } from '../../components/ui'
import { pembeliApi } from '../../lib/services'

const categories = ['Semua', 'Sayuran', 'Buah', 'Beras & Biji', 'Rempah', 'Madu & Olahan', 'Kopi & Teh']

export function PembeliBrowsePage() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await pembeliApi.getProducts()
      setProducts((res as any).data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(p => {
    const category = p.komoditas?.kategori || ''
    const matchCat = activeCategory === 'Semua' || category.toLowerCase() === activeCategory.toLowerCase()
    
    const name = p.nama || p.komoditas?.nama || ''
    const seller = p.petani?.farm_name || p.petani?.name || ''
    const matchSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || seller.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchCat && matchSearch
  })

  if (loading) {
    return <div className="p-8 text-center text-secondary">Memuat produk...</div>
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-0 animate-fadeUp">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Jelajahi Produk</h2>
          <p className="text-secondary text-sm mt-1">
            Temukan hasil tani segar dengan harga terbaik langsung dari sumbernya.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Cari produk atau petani..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-container border border-outline-variant/30 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 opacity-0 animate-fadeUp stagger-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border
              ${activeCategory === cat 
                ? 'bg-primary text-white border-primary shadow-soft' 
                : 'bg-surface-container border-outline-variant/30 text-secondary hover:bg-surface-container-highest'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 opacity-0 animate-fadeUp stagger-2">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl overflow-hidden hover-lift interactive-card group flex flex-col">
              <div className="h-40 bg-surface-container flex items-center justify-center overflow-hidden">
                {product.foto_url ? (
                  <img src={product.foto_url} alt={product.nama || product.komoditas?.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {product.komoditas?.kategori === 'Sayuran' ? '🥬' :
                     product.komoditas?.kategori === 'Buah' ? '🍎' :
                     product.komoditas?.kategori === 'Beras & Biji' ? '🌾' :
                     product.komoditas?.kategori === 'Madu & Olahan' ? '🍯' : '📦'}
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-on-surface line-clamp-2 leading-tight">{product.nama || product.komoditas?.nama}</h3>
                </div>
                <p className="text-xs text-secondary flex items-center gap-1 mb-3">
                  <span className="material-symbols-outlined text-[14px]">storefront</span>
                  {product.petani?.farm_name || product.petani?.name}
                </p>
                
                <div className="mt-auto">
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-lg font-bold text-primary">Rp {product.harga?.toLocaleString('id-ID')}</span>
                    <span className="text-xs text-secondary">/ {product.komoditas?.satuan || 'kg'}</span>
                  </div>
                  <Button variant="primary" className="w-full" icon="add_shopping_cart" disabled={product.stok <= 0}>
                    {product.stok > 0 ? 'Keranjang' : 'Stok Habis'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <SectionCard title="Hasil Pencarian" className="opacity-0 animate-fadeUp stagger-2">
          <EmptyState 
            icon="search_off" 
            title="Produk tidak ditemukan" 
            description={`Tidak ada produk yang cocok dengan pencarian "${searchQuery}" di kategori ${activeCategory}.`}
          />
        </SectionCard>
      )}
    </div>
  )
}
