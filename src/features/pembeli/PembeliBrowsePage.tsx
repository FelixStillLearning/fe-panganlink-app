import { useState } from 'react'
import { SectionCard, Badge, Button, EmptyState } from '../../components/ui'

const mockProducts = [
  { id: 1, name: 'Beras Organik Mentik Wangi', price: 'Rp 18.000', unit: '/ kg', seller: 'Kelompok Tani Makmur', category: 'Beras & Biji', image: '🌾', stock: 50 },
  { id: 2, name: 'Cabai Merah Keriting', price: 'Rp 45.000', unit: '/ kg', seller: 'Budi Santoso', category: 'Sayuran', image: '🌶️', stock: 15 },
  { id: 3, name: 'Tomat Cherry Hidroponik', price: 'Rp 22.000', unit: '/ kg', seller: 'Kebun Ceria', category: 'Sayuran', image: '🍅', stock: 8 },
  { id: 4, name: 'Madu Hutan Asli', price: 'Rp 85.000', unit: '/ btl', seller: 'Desa Wangi', category: 'Madu & Olahan', image: '🍯', stock: 20 },
  { id: 5, name: 'Kopi Arabika Gayo', price: 'Rp 65.000', unit: '/ 250g', seller: 'Kopi Nusantara', category: 'Kopi & Teh', image: '☕', stock: 30 },
  { id: 6, name: 'Bawang Merah Brebes', price: 'Rp 35.000', unit: '/ kg', seller: 'Tani Jaya', category: 'Rempah', image: '🧅', stock: 100 },
]

const categories = ['Semua', 'Sayuran', 'Buah', 'Beras & Biji', 'Rempah', 'Madu & Olahan', 'Kopi & Teh']

export function PembeliBrowsePage() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = mockProducts.filter(p => {
    const matchCat = activeCategory === 'Semua' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.seller.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

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
              <div className="h-40 bg-surface-container flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                {product.image}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-on-surface line-clamp-2 leading-tight">{product.name}</h3>
                </div>
                <p className="text-xs text-secondary flex items-center gap-1 mb-3">
                  <span className="material-symbols-outlined text-[14px]">storefront</span>
                  {product.seller}
                </p>
                
                <div className="mt-auto">
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-lg font-bold text-primary">{product.price}</span>
                    <span className="text-xs text-secondary">{product.unit}</span>
                  </div>
                  <Button variant="primary" className="w-full" icon="add_shopping_cart">
                    Keranjang
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
