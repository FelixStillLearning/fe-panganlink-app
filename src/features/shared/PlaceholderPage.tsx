import { EmptyState } from '../../components/ui'
import { Link } from 'react-router-dom'

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <div className="opacity-0 animate-fadeUp">
        <h2 className="text-2xl font-bold text-on-surface">{title}</h2>
      </div>
      <div className="bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/20 opacity-0 animate-fadeUp stagger-1">
        <EmptyState
          icon="construction"
          title="Halaman sedang dikembangkan"
          description="Fitur ini akan segera tersedia. Terima kasih atas kesabaran Anda."
        />
      </div>
      <div className="opacity-0 animate-fadeUp stagger-2 text-center">
        <Link to="." className="text-sm text-primary hover:underline">
          ← Kembali
        </Link>
      </div>
    </div>
  )
}
