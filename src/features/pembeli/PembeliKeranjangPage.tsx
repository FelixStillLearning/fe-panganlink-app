import { useNavigate } from 'react-router-dom'
import { SectionCard, Button, EmptyState } from '../../components/ui'
import { useCart } from '../../store/CartContext'
import { pembeliApi } from '../../lib/services'

declare global {
  interface Window {
    snap: any;
  }
}

export function PembeliKeranjangPage() {
  const navigate = useNavigate()
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems, clearCart } = useCart()

  const handleCheckout = async () => {
    try {
      const payload = {
        items: items.map(i => ({
          product_id: i.product_id,
          jumlah: i.jumlah,
          harga_unit: i.harga
        }))
      }
      
      const response: any = await pembeliApi.checkout(payload)
      const paymentToken = response.data?.payment_token;

      if (paymentToken && window.snap) {
        window.snap.pay(paymentToken, {
          onSuccess: async function (result: any) {
            try {
              // HACK LOKAL: Karena webhook midtrans tidak bisa mencapai localhost,
              // kita update statusnya secara manual dari frontend setelah pop-up sukses.
              if (result.order_id) {
                await pembeliApi.updateOrderStatus(result.order_id, 'paid')
              }
            } catch (e) {
              console.error("Gagal update status lokal", e);
            }
            clearCart()
            alert('Pembayaran berhasil!')
            navigate('/pembeli/pesanan')
          },
          onPending: function () {
            clearCart()
            alert('Menunggu pembayaran!')
            navigate('/pembeli/pesanan')
          },
          onError: function () {
            alert('Pembayaran gagal!')
          },
          onClose: function () {
            clearCart() // Menghapus keranjang walau close agar tidak double order karena di backend order sudah dibuat
            alert('Anda menutup popup sebelum menyelesaikan pembayaran. Lanjutkan pembayaran di menu Pesanan Saya.')
            navigate('/pembeli/pesanan')
          }
        });
      } else {
        clearCart()
        alert('Pesanan berhasil dibuat! Silakan selesaikan pembayaran di menu Pesanan Saya.')
        navigate('/pembeli/pesanan')
      }
    } catch (err: any) {
      alert(`Gagal checkout: ${err.message}`)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto animate-fadeIn">
        <h2 className="text-2xl font-bold text-on-surface mb-6">Keranjang Belanja</h2>
        <SectionCard>
          <EmptyState 
            icon="shopping_cart" 
            title="Keranjang Anda Kosong" 
            description="Belum ada produk segar yang Anda masukkan. Ayo mulai berbelanja!"
          />
          <div className="flex justify-center mt-6">
            <Button variant="primary" icon="storefront" onClick={() => navigate('/pembeli/browse')}>
              Mulai Belanja
            </Button>
          </div>
        </SectionCard>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-on-surface">Keranjang Belanja</h2>
        <span className="text-sm font-medium text-secondary">{totalItems} Produk</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/20 p-4 flex gap-4 opacity-0 animate-fadeUp">
              <div className="w-24 h-24 rounded-lg bg-surface-container overflow-hidden flex-shrink-0">
                {item.foto_url ? (
                  <img src={item.foto_url} alt={item.nama} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-3xl">image</span>
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-on-surface line-clamp-1">{item.nama}</h3>
                  <p className="text-xs text-secondary mt-1">{item.petani_name}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-primary">Rp {item.harga.toLocaleString('id-ID')}</span>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item.id, item.jumlah - 1)}
                      className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">remove</span>
                    </button>
                    <span className="font-medium text-sm w-4 text-center">{item.jumlah}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.jumlah + 1)}
                      className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors"
                      disabled={item.jumlah >= item.stok_maks}
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 w-8 h-8 rounded-full text-danger hover:bg-danger/10 flex items-center justify-center transition-colors"
                      title="Hapus dari keranjang"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Checkout Summary */}
        <div className="lg:col-span-1">
          <SectionCard className="sticky top-24">
            <h3 className="font-bold text-lg text-on-surface mb-4">Ringkasan Belanja</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Total Harga ({totalItems} barang)</span>
                <span className="text-on-surface font-medium">Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Ongkos Kirim</span>
                <span className="text-on-surface font-medium">Dihitung otomatis</span>
              </div>
            </div>

            <div className="border-t border-outline-variant/30 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-on-surface">Total Tagihan</span>
                <span className="text-xl font-bold text-primary">Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <Button variant="primary" className="w-full text-center justify-center" onClick={handleCheckout}>
              Beli Sekarang
            </Button>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
