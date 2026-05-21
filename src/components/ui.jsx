import { useState } from 'react'

/* ─── BADGE ─────────────────────────────────────────────────────────────────── */
export function Badge({ children, variant = 'default', color, bg, style: s = {} }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    fontSize: 10, fontWeight: 600, padding: '2px 8px',
    borderRadius: 20, whiteSpace: 'nowrap', letterSpacing: 0.3,
  }
  if (color && bg) return <span style={{ ...base, background: bg, color, border: `1px solid ${color}44`, ...s }}>{children}</span>
  const vs = {
    default:   { background: 'var(--primary)',       color: '#fff' },
    outline:   { background: 'transparent',          color: 'var(--muted-fg)', border: '1px solid var(--border)' },
    secondary: { background: 'var(--secondary-10)',  color: 'var(--secondary)' },
    muted:     { background: 'var(--muted)',         color: 'var(--muted-fg)' },
    green:     { background: 'var(--secondary-10)',  color: 'var(--secondary)', border: '1px solid #2A7A3B44' },
    primary:   { background: 'var(--primary-10)',    color: 'var(--primary)',   border: '1px solid #C84B0C44' },
  }
  return <span style={{ ...base, ...vs[variant], ...s }}>{children}</span>
}

/* ─── BUTTON ─────────────────────────────────────────────────────────────────── */
export function Btn({ children, variant = 'default', size = 'md', onClick, style: s = {}, disabled, title, type = 'button' }) {
  const sizes = {
    sm:   { padding: '5px 12px',  fontSize: 12, borderRadius: 'var(--r)'  },
    md:   { padding: '9px 18px',  fontSize: 13, borderRadius: 'var(--r2)' },
    lg:   { padding: '12px 24px', fontSize: 15, borderRadius: 'var(--r2)' },
    icon: { padding: '7px',       fontSize: 14, borderRadius: 'var(--r)'  },
  }
  const vs = {
    default:     { background: 'var(--primary)',      color: '#fff',               boxShadow: '0 1px 3px rgba(200,75,12,.2)' },
    outline:     { background: 'transparent',         color: 'var(--fg)',          border: '1px solid var(--border)' },
    ghost:       { background: 'transparent',         color: 'var(--muted-fg)' },
    secondary:   { background: 'var(--secondary-10)', color: 'var(--secondary)' },
    destructive: { background: 'var(--destructive-bg)',color: 'var(--destructive)' },
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} title={title}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1,
        fontFamily: "'Inter',sans-serif", fontWeight: 600, border: 'none',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: 6, transition: 'all .15s', flexShrink: 0, lineHeight: 1.3,
        ...sizes[size], ...vs[variant], ...s,
      }}>
      {children}
    </button>
  )
}

/* ─── AVATAR ─────────────────────────────────────────────────────────────────── */
export function Avatar({ name = '?', size = 32, color = 'var(--primary)' }) {
  const initials = (name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, color: '#fff', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: size * 0.36,
      flexShrink: 0, border: '2px solid var(--border)',
    }}>{initials}</div>
  )
}

/* ─── CARD ───────────────────────────────────────────────────────────────────── */
export function Card({ children, style: s = {}, onClick, className = '' }) {
  return (
    <div onClick={onClick} className={className} style={{
      background: 'var(--card)', borderRadius: 'var(--r2)',
      border: '1px solid var(--border)',
      boxShadow: '0 1px 3px rgba(0,0,0,.04)', padding: 20, ...s,
    }}>{children}</div>
  )
}

/* ─── TOGGLE (Switch) ────────────────────────────────────────────────────────── */
export function Toggle({ on, set }) {
  return (
    <div onClick={() => set && set(!on)} style={{
      width: 40, height: 22,
      background: on ? 'var(--secondary)' : 'var(--muted)',
      borderRadius: 11, cursor: 'pointer', position: 'relative',
      transition: 'all .2s', flexShrink: 0,
      border: `1px solid ${on ? 'var(--secondary)' : 'var(--border)'}`,
    }}>
      <div style={{
        width: 16, height: 16, background: '#fff', borderRadius: '50%',
        position: 'absolute', top: 2, left: on ? 20 : 2,
        transition: 'all .2s', boxShadow: '0 1px 3px rgba(0,0,0,.2)',
      }} />
    </div>
  )
}

/* ─── SELECT ─────────────────────────────────────────────────────────────────── */
export function Sel({ value, onChange, options, style: s = {} }) {
  return (
    <select value={value} onChange={e => onChange && onChange(e.target.value)} style={{
      border: '1px solid var(--border)', borderRadius: 'var(--r)',
      padding: '8px 12px', fontSize: 13,
      background: 'var(--card)', color: 'var(--fg)',
      fontFamily: "'Inter',sans-serif", outline: 'none',
      cursor: 'pointer', width: '100%', ...s,
    }}>
      {options.map(o =>
        typeof o === 'string'
          ? <option key={o}>{o}</option>
          : <option key={o.v} value={o.v}>{o.l}</option>
      )}
    </select>
  )
}

/* ─── INPUT / TEXTAREA ───────────────────────────────────────────────────────── */
export function Inp({ value, onChange, placeholder, type = 'text', rows, defaultValue, style: s = {} }) {
  const base = {
    border: '1px solid var(--border)', borderRadius: 'var(--r)',
    padding: '9px 12px', fontSize: 13,
    background: 'var(--card)', color: 'var(--fg)',
    fontFamily: "'Inter',sans-serif", outline: 'none',
    width: '100%', boxSizing: 'border-box',
    transition: 'border .15s', ...s,
  }
  return rows
    ? <textarea value={value} defaultValue={defaultValue}
        onChange={e => onChange && onChange(e.target.value)}
        placeholder={placeholder} rows={rows}
        style={{ ...base, resize: 'vertical', lineHeight: 1.6 }} />
    : <input value={value} defaultValue={defaultValue}
        onChange={e => onChange && onChange(e.target.value)}
        placeholder={placeholder} type={type} style={base} />
}

/* ─── LABEL ──────────────────────────────────────────────────────────────────── */
export function Label({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 600, color: 'var(--muted-fg)',
      marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.4,
    }}>{children}</div>
  )
}

/* ─── SEPARATOR ──────────────────────────────────────────────────────────────── */
export function Sep({ style: s = {} }) {
  return <div style={{ height: 1, background: 'var(--border)', ...s }} />
}

/* ─── ACCORDION ITEM ─────────────────────────────────────────────────────────── */
export function AccordionItem({ icon, title, children, defaultOpen = false, accentColor = 'var(--primary)', accentBg = 'var(--primary-5)' }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--r2)', marginBottom: 10, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '11px 14px', width: '100%', cursor: 'pointer',
          background: open ? accentBg : 'var(--card)', border: 'none', textAlign: 'left',
          transition: 'background .15s',
        }}>
        <div style={{
          width: 32, height: 32, borderRadius: 'var(--r)',
          background: open ? accentBg : 'var(--muted)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, flexShrink: 0, transition: 'all .15s',
        }}>{icon}</div>
        <span style={{ flex: 1, fontWeight: 700, fontSize: 13, color: 'var(--fg)', textAlign: 'left' }}>{title}</span>
        <span style={{
          color: 'var(--muted-fg)', fontSize: 14,
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform .25s',
          display: 'inline-block',
        }}>↓</span>
      </button>
      {open && (
        <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border)', background: 'var(--card)' }}>
          {children}
        </div>
      )}
    </div>
  )
}

/* ─── BLOOM CHIP ─────────────────────────────────────────────────────────────── */
export function BloomChip({ label, color, bg, selected, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        display: 'flex', alignItems: 'center', gap: 5,
        border: `1.5px solid ${selected ? color : 'var(--border)'}`,
        borderRadius: 20, padding: '5px 12px',
        fontSize: 12, fontWeight: 600,
        background: selected ? bg : 'var(--card)',
        color: selected ? color : 'var(--muted-fg)',
        cursor: 'pointer', transition: 'all .15s',
      }}>
      {selected && '✓ '}{label}
    </button>
  )
}

/* ─── FORM SECTION CARD ──────────────────────────────────────────────────────── */
export function FormSection({ num, title, children }) {
  return (
    <div style={{
      background: 'var(--card)', borderRadius: 'var(--r2)',
      border: '1px solid var(--border)', padding: 18, marginBottom: 14,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{
          width: 24, height: 24, background: 'var(--primary)', color: '#fff',
          borderRadius: '50%', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontWeight: 800, fontSize: 12,
        }}>{num}</div>
        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--fg)' }}>{title}</div>
      </div>
      {children}
    </div>
  )
}

/* ─── STAT CARD ──────────────────────────────────────────────────────────────── */
export function StatCard({ icon, label, value, delta, accentColor, style: s = {} }) {
  return (
    <div style={{
      background: 'var(--card)', borderRadius: 'var(--r2)',
      border: '1px solid var(--border)', padding: 16,
      borderTop: `3px solid ${accentColor || 'var(--primary)'}`,
      ...s,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        {delta && <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--secondary)' }}>↑ {delta}</span>}
      </div>
      <div style={{ fontSize: 11, color: 'var(--muted-fg)', margin: '8px 0 3px' }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--fg)' }}>{value}</div>
    </div>
  )
}
