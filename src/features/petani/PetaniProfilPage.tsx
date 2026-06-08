import { useState, useEffect, useRef } from 'react'
import { SectionCard, Button } from '../../components/ui'
import { petaniApi } from '../../lib/services'
import { api } from '../../lib/api'

export function PetaniProfilPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await petaniApi.getProfile()
      setProfile((res as any).data)
    } catch (err) {
      console.error('Failed to fetch profile', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await petaniApi.updateProfile({
        name: profile.name,
        location: profile.location,
        phone: profile.phone,
        farm_name: profile.farm_name,
        foto_url: profile.foto_url
      })
      alert('Profil berhasil diperbarui!')
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan profil')
    } finally {
      setSaving(false)
    }
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const form = new FormData()
      form.append('image', file)
      const res = await api.post<any>('/v1/upload', form)
      
      const newFotoUrl = res.url
      setProfile((prev: any) => ({ ...prev, foto_url: newFotoUrl }))
      
      // Auto save after upload
      await petaniApi.updateProfile({ ...profile, foto_url: newFotoUrl })
    } catch (err: any) {
      alert(err.message || 'Gagal mengunggah foto')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-secondary">Memuat profil...</div>
  }

  return (
    <div className="space-y-6 max-w-7xl animate-fadeUp">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Profil Akun</h2>
        <p className="text-secondary text-sm mt-1">Kelola informasi pribadi dan profil kebun/toko Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SectionCard title="Profil Utama" className="text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 overflow-hidden border-2 border-primary/20">
              {profile?.foto_url ? (
                <img src={profile.foto_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-4xl text-primary">person</span>
              )}
            </div>
            <h3 className="text-lg font-bold text-on-surface">{profile?.name || 'Petani'}</h3>
            <p className="text-sm text-secondary">{profile?.farm_name || 'Petani PanganLink'}</p>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handlePhotoUpload} 
            />
            <Button 
              variant="outline" 
              className="mt-4 w-full" 
              size="sm" 
              icon="photo_camera"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? 'Mengunggah...' : 'Ubah Foto'}
            </Button>
          </SectionCard>
        </div>
        
        <div className="lg:col-span-2">
          <SectionCard title="Informasi Pribadi">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                  <input type="text" name="name" value={profile?.name || ''} onChange={handleChange} className="w-full bg-transparent text-sm text-on-surface p-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Email</label>
                  <input type="email" value={profile?.email || ''} readOnly className="w-full bg-surface-container-high/50 text-sm text-secondary p-2.5 rounded-lg border border-outline-variant outline-none cursor-not-allowed" title="Email tidak dapat diubah" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Nomor Telepon</label>
                  <input type="tel" name="phone" value={profile?.phone || ''} onChange={handleChange} className="w-full bg-transparent text-sm text-on-surface p-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all" placeholder="Contoh: 081234567890" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Nama Kebun/Toko</label>
                  <input type="text" name="farm_name" value={profile?.farm_name || ''} onChange={handleChange} className="w-full bg-transparent text-sm text-on-surface p-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all" placeholder="Contoh: Kebun Subur Jaya" />
                </div>
              </div>
              <div className="mt-5">
                <label className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                <textarea name="location" value={profile?.location || ''} onChange={handleChange} className="w-full bg-transparent text-sm text-on-surface p-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all resize-none" rows={3} placeholder="Contoh: Jl. Pertanian No 12, Desa Makmur"></textarea>
              </div>
              <div className="pt-4 border-t border-outline-variant/30 mt-4 flex justify-end">
                <Button icon="save" onClick={handleSave} disabled={saving}>
                  {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
