import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
  id: string
  product_id: string
  nama: string
  petani_name: string
  harga: number
  jumlah: number
  foto_url: string
  stok_maks: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, jumlah: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('panganlink_cart')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) { return [] }
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('panganlink_cart', JSON.stringify(items))
  }, [items])

  const addToCart = (newItem: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.product_id === newItem.product_id)
      if (existing) {
        // Update quantity, but respect max stock
        const newQty = Math.min(existing.jumlah + newItem.jumlah, existing.stok_maks)
        return prev.map(i => i.product_id === newItem.product_id ? { ...i, jumlah: newQty } : i)
      }
      return [...prev, newItem]
    })
    
    // Show custom toast instead of alert
    setToastMessage('✅ Produk ditambahkan ke keranjang!')
    setTimeout(() => setToastMessage(null), 3000)
  }

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const updateQuantity = (id: string, jumlah: number) => {
    setItems(prev => prev.map(i => {
      if (i.id === id) {
        return { ...i, jumlah: Math.min(Math.max(1, jumlah), i.stok_maks) }
      }
      return i
    }))
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, i) => sum + i.jumlah, 0)
  const totalPrice = items.reduce((sum, i) => sum + (i.harga * i.jumlah), 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
      
      {/* Custom Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 animate-fadeUp">
          <div className="bg-surface-container-highest text-on-surface px-6 py-3 rounded-xl shadow-card border border-outline-variant/30 flex items-center gap-2">
            <span className="font-medium text-sm">{toastMessage}</span>
          </div>
        </div>
      )}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
