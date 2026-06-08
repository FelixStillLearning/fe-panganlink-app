import { useState, useEffect, useRef } from 'react'
import { SectionCard, Badge, Button } from '../../components/ui'
import { pembeliApi } from '../../lib/services'
import { api } from '../../lib/api'

export function PembeliProfilPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savingAddress, setSavingAddress] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  })
  
  const [address, setAddress] = useState('')
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await pembeliApi.getProfile()
      const data = (res as any).data
      setProfile(data)
      setFormData({
        name: data.name || '',
        phone: data.phone || '',
      })
      setAddress(data.location || '')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    
    try {
      const res = await api.post('/v1/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      const url = (res as any).data.url
      await pembeliApi.updateProfile({ foto_url: url })
      fetchProfile()
    } catch (err) {
      console.error('Upload failed', err)
      alert('Gagal mengunggah foto. Pastikan backend mendukung endpoint /v1/upload')
    } finally {
      setUploading(false)
    }
  }

  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await pembeliApi.updateProfile({
        name: formData.name,
        phone: formData.phone
      })
      await fetchProfile()
      alert('Profil berhasil diperbarui!')
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleSaveAddress = async () => {
    setSavingAddress(true)
    try {
      await pembeliApi.updateProfile({ location: address })
      setIsEditingAddress(false)
      await fetchProfile()
    } catch (err) {
      console.error(err)
    } finally {
      setSavingAddress(false)
    }
  }

  if (loading) return <div className="p-8 text-center text-secondary">Memuat profil...</div>

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="opacity-0 animate-fadeUp">
        <h2 className="text-2xl font-bold text-on-surface">Profil Akun</h2>
        <p className="text-secondary text-sm mt-1">
          Kelola informasi data diri dan alamat pengiriman Anda.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/20 opacity-0 animate-fadeUp stagger-1">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-brand-green-light flex items-center justify-center text-white text-3xl font-bold shadow-soft overflow-hidden">
            {profile?.foto_url ? (
              <img src={profile.foto_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              profile?.name?.charAt(0).toUpperCase() || 'P'
            )}
          </div>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <span className="material-symbols-outlined text-white">photo_camera</span>
          </div>
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-on-surface">{profile?.name}</h3>
          <p className="text-secondary text-sm flex items-center justify-center sm:justify-start gap-1 mt-1">
            <span className="material-symbols-outlined text-[16px]">mail</span>
            {profile?.email}
          </p>
          <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
            <Badge variant="success">Pembeli Aktif</Badge>
            <Badge variant="default">Terdaftar 2026</Badge>
            {uploading && <Badge variant="warning">Mengunggah Foto...</Badge>}
          </div>
        </div>
      </div>

      <SectionCard title="Informasi Pribadi" icon="person" delay={2}>
        <form className="space-y-4" onSubmit={handleSaveInfo}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-secondary mb-1">Nama Lengkap</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg text-sm focus:outline-none focus:border-primary" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-secondary mb-1">Nomor Telepon</label>
              <input 
                type="text" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="Contoh: 081234567890"
                className="w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg text-sm focus:outline-none focus:border-primary" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-secondary mb-1">Email</label>
              <input type="email" value={profile?.email} disabled className="w-full px-3 py-2 bg-surface-container-highest border border-outline-variant/30 rounded-lg text-sm text-secondary cursor-not-allowed" />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button variant="primary" disabled={saving}>
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </div>
        </form>
      </SectionCard>

      <SectionCard title="Alamat Pengiriman Utama" icon="home" delay={3}>
        <div className="p-4 border border-outline-variant/30 rounded-xl bg-surface-container/30">
          <div className="flex justify-between items-start mb-2">
            <span className="font-semibold text-on-surface">Alamat</span>
            {!isEditingAddress && (
              <button onClick={() => setIsEditingAddress(true)} type="button" className="text-primary text-sm font-medium hover:underline">Ubah</button>
            )}
          </div>
          
          {isEditingAddress ? (
            <div className="mt-2 space-y-3">
              <textarea 
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Masukkan alamat lengkap pengiriman..."
                className="w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
              ></textarea>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => { setIsEditingAddress(false); setAddress(profile?.location || '') }}>Batal</Button>
                <Button variant="primary" size="sm" onClick={handleSaveAddress} disabled={savingAddress}>Simpan Alamat</Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-secondary leading-relaxed whitespace-pre-line">
              {profile?.location || 'Belum ada alamat pengiriman. Silakan tambahkan alamat Anda.'}
            </p>
          )}
        </div>
      </SectionCard>
    </div>
  )
}
