// Reusable UI components for PanganLink

import { type ReactNode } from 'react'

// ===== StatCard =====
type StatCardProps = {
  label: string
  value: string | number
  icon: string
  iconColor?: string
  trend?: string
  trendUp?: boolean
  highlight?: boolean
  delay?: number
}

export function StatCard({
  label, value, icon, iconColor = 'text-primary',
  trend, trendUp, highlight, delay = 0,
}: StatCardProps) {
  const stagger = delay ? `stagger-${delay}` : ''

  return (
    <div
      className={`rounded-xl p-5 shadow-card hover-lift interactive-card opacity-0 animate-fadeUp ${stagger}
        ${highlight ? 'stat-card-highlight' : 'bg-surface-container-lowest border border-outline-variant/20'}`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider leading-none">
          {label}
        </span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-opacity-10 ${iconColor.replace('text-', 'bg-')}/10`}>
          <span
            className={`material-symbols-outlined text-[18px] ${iconColor}`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {icon}
          </span>
        </div>
      </div>
      <p className="text-2xl font-bold text-on-surface font-mono tracking-tight">{value}</p>
      {trend && (
        <p className={`text-[12px] mt-1.5 font-medium ${trendUp ? 'text-success' : 'text-danger'}`}>
          <span className="material-symbols-outlined text-[14px] align-middle">
            {trendUp ? 'trending_up' : 'trending_down'}
          </span>{' '}
          {trend}
        </p>
      )}
    </div>
  )
}

// ===== Section Card =====
type SectionCardProps = {
  title?: string
  subtitle?: string
  icon?: string
  action?: ReactNode
  children: ReactNode
  className?: string
  delay?: number
}

export function SectionCard({
  title, subtitle, icon, action, children, className = '', delay = 0,
}: SectionCardProps) {
  const stagger = delay ? `stagger-${delay}` : ''
  const hasHeader = title || subtitle || icon || action;
  
  return (
    <section
      className={`bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/20 opacity-0 animate-fadeUp ${stagger} ${className}`}
    >
      {hasHeader && (
        <div className="flex items-start justify-between p-5 pb-4 border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            {icon && (
              <span className="material-symbols-outlined text-primary text-[20px]">
                {icon}
              </span>
            )}
            <div>
              {title && <h3 className="text-[15px] font-semibold text-on-surface">{title}</h3>}
              {subtitle && <p className="text-[12px] text-secondary mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      <div className={hasHeader ? "p-5" : ""}>{children}</div>
    </section>
  )
}

// ===== Badge =====
type BadgeProps = {
  children: ReactNode
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default'
}

const badgeVariants = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger:  'bg-danger/10 text-danger',
  info:    'bg-tertiary/10 text-tertiary',
  default: 'bg-secondary-container text-on-secondary-container',
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`badge text-[10px] font-semibold uppercase tracking-wider ${badgeVariants[variant]}`}>
      {children}
    </span>
  )
}

// ===== Button =====
type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  icon?: string
  className?: string
  disabled?: boolean
}

const btnVariants = {
  primary: 'bg-primary text-white hover:bg-brand-green-light shadow-soft',
  ghost:   'text-primary hover:bg-brand-green-muted',
  danger:  'bg-danger/10 text-danger hover:bg-danger hover:text-white',
  outline: 'border border-primary text-primary hover:bg-brand-green-muted',
}
const btnSizes = {
  sm: 'px-3 py-1.5 text-xs gap-1',
  md: 'px-4 py-2 text-sm gap-1.5',
  lg: 'px-5 py-2.5 text-sm gap-2',
}

export function Button({
  children, variant = 'primary', size = 'md',
  onClick, icon, className = '', disabled,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium rounded-lg
        transition-all duration-200 active:scale-[0.97]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${btnVariants[variant]} ${btnSizes[size]} ${className}`}
    >
      {icon && (
        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
          {icon}
        </span>
      )}
      {children}
    </button>
  )
}

// ===== Empty State =====
export function EmptyState({
  icon = 'inbox',
  title = 'Belum ada data',
  description = 'Data akan muncul di sini.',
}: {
  icon?: string
  title?: string
  description?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4">
        <span
          className="material-symbols-outlined text-4xl text-outline"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          {icon}
        </span>
      </div>
      <h4 className="font-semibold text-on-surface mb-1">{title}</h4>
      <p className="text-sm text-secondary max-w-[240px]">{description}</p>
    </div>
  )
}

// ===== Modal =====
type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity" onClick={onClose} />
      <div className="bg-surface-container-lowest rounded-2xl shadow-popup w-full max-w-lg z-10 p-6 animate-fadeUp mx-4 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between mb-5 flex-shrink-0">
          <h3 className="text-[17px] font-bold text-on-surface">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-container text-secondary transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div className="overflow-y-auto hide-scrollbar flex-1 -mx-2 px-2 pb-2">
          {children}
        </div>
      </div>
    </div>
  )
}
