import { SectionCard, Button } from '../../components/ui'

const faqs = [
  { q: "Bagaimana cara memesan produk?", a: "Pilih produk yang Anda inginkan di halaman Jelajahi Produk, masukkan ke keranjang, lalu lanjutkan ke pembayaran." },
  { q: "Metode pembayaran apa saja yang didukung?", a: "Kami mendukung transfer bank, e-wallet (OVO, GoPay, Dana), dan pembayaran instan melalui QRIS." },
  { q: "Berapa lama waktu pengiriman?", a: "Waktu pengiriman bervariasi tergantung lokasi Anda dan petani. Rata-rata memakan waktu 1-3 hari kerja." },
  { q: "Apakah saya bisa membatalkan pesanan?", a: "Pesanan dapat dibatalkan sebelum statusnya berubah menjadi 'Diproses'. Silakan cek halaman Pesanan Saya." },
]

export function PembeliBantuanPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="opacity-0 animate-fadeUp">
        <h2 className="text-2xl font-bold text-on-surface">Pusat Bantuan</h2>
        <p className="text-secondary text-sm mt-1">
          Temukan jawaban atas pertanyaan Anda atau hubungi dukungan pelanggan kami.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-0 animate-fadeUp stagger-1">
        <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col items-center text-center">
          <span className="material-symbols-outlined text-4xl text-primary mb-3">support_agent</span>
          <h3 className="font-bold text-on-surface mb-1">Live Chat</h3>
          <p className="text-xs text-secondary mb-4">Hubungi tim support kami secara langsung untuk bantuan cepat.</p>
          <Button variant="primary" icon="chat">Mulai Chat</Button>
        </div>
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 flex flex-col items-center text-center">
          <span className="material-symbols-outlined text-4xl text-secondary mb-3">mail</span>
          <h3 className="font-bold text-on-surface mb-1">Email Support</h3>
          <p className="text-xs text-secondary mb-4">Kirimkan pertanyaan detail Anda melalui email.</p>
          <Button variant="outline" icon="send">Kirim Email</Button>
        </div>
      </div>

      <SectionCard title="Pertanyaan yang Sering Diajukan (FAQ)" icon="help" delay={2}>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="pb-4 border-b border-outline-variant/10 last:border-0 last:pb-0">
              <h4 className="font-semibold text-on-surface mb-1 flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">help_outline</span>
                {faq.q}
              </h4>
              <p className="text-sm text-secondary pl-6 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
