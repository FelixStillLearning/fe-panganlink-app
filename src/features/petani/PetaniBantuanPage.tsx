import { SectionCard } from '../../components/ui'

export function PetaniBantuanPage() {
  return (
    <div className="space-y-6 max-w-4xl animate-fadeUp">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Bantuan & FAQ</h2>
        <p className="text-secondary text-sm mt-1">Pusat bantuan untuk menggunakan PanganLink.</p>
      </div>

      <SectionCard title="Pertanyaan yang Sering Diajukan">
        <div className="space-y-4">
          {[
            { q: 'Bagaimana cara menambah produk baru?', a: 'Buka menu "Produk Saya", kemudian klik tombol "Tambah Produk" di pojok kanan atas.' },
            { q: 'Bagaimana cara menerima pembayaran?', a: 'Pembayaran akan diteruskan ke rekening Anda setelah pembeli mengkonfirmasi pesanan telah diterima.' },
            { q: 'Bagaimana AI memberikan rekomendasi?', a: 'Model kami menggunakan Bayesian Ridge yang menganalisis riwayat harga komoditas di pasar untuk memprediksi tren masa depan.' }
          ].map((faq, i) => (
            <div key={i} className="bg-surface-container p-4 rounded-xl">
              <h4 className="font-bold text-sm text-on-surface mb-1">{faq.q}</h4>
              <p className="text-sm text-secondary">{faq.a}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
