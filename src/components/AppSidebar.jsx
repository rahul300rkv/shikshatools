import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Avatar } from './ui.jsx'

const NAV_GROUPS = [
  {
    label: 'OVERVIEW',
    items: [{ id: '/dashboard', icon: '⊞', label: 'Dashboard' }],
  },
  {
    label: 'AI TOOLS',
    items: [
      { id: '/lesson',    icon: '📖', label: 'Lesson Planner'       },
      { id: '/worksheet', icon: '📄', label: 'Worksheet Generator'  },
      { id: '/quiz',      icon: '❓', label: 'Quiz Builder'          },
      { id: '/lesson',    icon: '📋', label: 'Rubric Creator'        },
      { id: '/lesson',    icon: '🎞️', label: 'Presentation Gen'      },
    ],
  },
  {
    label: 'LIBRARY',
    items: [
      { id: '/library',    icon: '🗃️', label: 'Question Bank'      },
      { id: '/library',    icon: '📁', label: 'Resource Library'   },
      { id: '/ai-chat',    icon: '💬', label: 'AI Assistant'       },
    ],
  },
  {
    label: 'STUDENTS',
    items: [
      { id: '/students',   icon: '👥', label: 'Student Progress'   },
      { id: '/curriculum', icon: '🗺️', label: 'Curriculum Explorer' },
    ],
  },
]

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate  = useNavigate()
  const { pathname } = useLocation()
  const w = collapsed ? 68 : 260

  return (
    <aside style={{
      width: w, minWidth: w,
      background: 'var(--sidebar)',
      borderRight: '1px solid var(--sidebar-border)',
      display: 'flex', flexDirection: 'column',
      transition: 'width .25s ease',
      overflow: 'hidden', flexShrink: 0,
      minHeight: '100vh',
    }}>
      {/* ── Logo row ─────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        height: 64, padding: '0 14px',
        borderBottom: '1px solid var(--sidebar-border)',
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'var(--primary)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: 18, flexShrink: 0,
        }}>✨</div>

        {!collapsed && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Shiksha Tools
            </div>
            <div style={{ fontSize: 10, color: 'var(--muted-fg)' }}>AI Teaching Assistant</div>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand' : 'Collapse'}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 15, color: 'var(--muted-fg)', padding: 4,
            borderRadius: 6, display: 'flex', alignItems: 'center',
            marginLeft: collapsed ? 0 : 'auto', flexShrink: 0,
          }}>
          <span style={{ display: 'inline-block', transition: 'transform .3s', transform: collapsed ? 'rotate(180deg)' : 'none' }}>‹</span>
        </button>
      </div>

      {/* ── Nav groups ───────────────────────────────────── */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        {NAV_GROUPS.map(g => (
          <div key={g.label} style={{ marginBottom: 18 }}>
            {!collapsed && (
              <div style={{
                fontSize: 10, fontWeight: 700,
                color: 'var(--muted-fg)', opacity: 0.6,
                padding: '0 10px 6px', letterSpacing: 0.8,
              }}>{g.label}</div>
            )}

            {g.items.map((l, idx) => {
              const active = pathname === l.id
              return (
                <div
                  key={l.label + idx}
                  title={collapsed ? l.label : ''}
                  className="nav-item"
                  onClick={() => navigate(l.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: collapsed ? 0 : 10,
                    padding: collapsed ? '9px' : '9px 12px',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    borderRadius: 10, marginBottom: 2,
                    cursor: 'pointer', fontWeight: 500, fontSize: 13,
                    background: active ? 'var(--sidebar-accent)' : 'transparent',
                    color: active ? 'var(--primary)' : 'var(--muted-fg)',
                    position: 'relative',
                  }}>
                  {active && (
                    <div style={{
                      position: 'absolute', left: 0, top: '50%',
                      transform: 'translateY(-50%)',
                      width: 3, height: 18,
                      background: 'var(--primary)',
                      borderRadius: '0 3px 3px 0',
                    }} />
                  )}
                  <span style={{ fontSize: 17 }}>{l.icon}</span>
                  {!collapsed && l.label}
                </div>
              )
            })}
          </div>
        ))}

        {/* Bottom links */}
        <div style={{ borderTop: '1px solid var(--sidebar-border)', paddingTop: 10 }}>
          {[
            { id: '/settings', icon: '⚙️', label: 'Settings' },
            { id: '/pricing',  icon: '💎', label: 'Pricing'  },
          ].map(l => (
            <div
              key={l.id}
              title={collapsed ? l.label : ''}
              className="nav-item"
              onClick={() => navigate(l.id)}
              style={{
                display: 'flex', alignItems: 'center',
                gap: collapsed ? 0 : 10,
                padding: collapsed ? '9px' : '9px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 10, marginBottom: 2,
                cursor: 'pointer', fontWeight: 500, fontSize: 13,
                color: 'var(--muted-fg)',
              }}>
              <span style={{ fontSize: 17 }}>{l.icon}</span>
              {!collapsed && l.label}
            </div>
          ))}
        </div>
      </nav>

      {/* ── Credits + user footer ────────────────────────── */}
      {!collapsed && (
        <div style={{ padding: '0 10px 12px' }}>
          <div style={{
            padding: '10px 12px', background: 'var(--muted)',
            borderRadius: 12, border: '1px solid var(--border)', marginBottom: 8,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 5 }}>
              <span style={{ fontWeight: 600, color: 'var(--muted-fg)' }}>PRO PLAN</span>
              <span style={{ fontWeight: 700, color: 'var(--primary)' }}>720/1000</span>
            </div>
            <div style={{ height: 5, background: 'var(--border)', borderRadius: 99 }}>
              <div style={{ width: '72%', height: '100%', background: 'var(--primary)', borderRadius: 99 }} />
            </div>
            <div
              onClick={() => navigate('/pricing')}
              style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', marginTop: 6 }}>
              Upgrade Plan →
            </div>
          </div>

          <div
            onClick={() => navigate('/settings')}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px', borderRadius: 12,
              background: 'var(--muted)', cursor: 'pointer',
              border: '1px solid var(--border)',
            }}>
            <Avatar name="Priya Sharma" size={28} color="var(--primary)" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Priya Sharma
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted-fg)' }}>Pro Plan</div>
            </div>
            <span style={{ fontSize: 11, color: 'var(--muted-fg)' }}>⌄</span>
          </div>
        </div>
      )}
    </aside>
  )
}
