import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Badge, Btn, Avatar } from './ui.jsx'

const NOTIFS = [
  { title: 'Quiz graded successfully',    desc: 'Science Ch.4 Quiz is ready to share',        time: '2m ago',  unread: true  },
  { title: 'New CBSE template available', desc: '5E Model updated for latest NCERT syllabus',  time: '1h ago',  unread: true  },
  { title: 'Credits refreshed',           desc: 'Your monthly 1000 credits have been renewed', time: '3h ago',  unread: false },
]

const WORKSPACES = [
  { name: 'DPS R.K. Puram',  plan: 'Pro',  init: 'DPS' },
  { name: 'AP Biology Team', plan: 'Team', init: 'AB'  },
  { name: 'Personal',        plan: 'Free', init: 'PS'  },
]

const TABS = [
  { label: 'Dashboard',        path: '/dashboard' },
  { label: 'Resource Library', path: '/library'   },
  { label: 'My Tools',         path: '/lesson'    },
]

export function TopNavbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [search,   setSearch]   = useState('')
  const [focused,  setFocused]  = useState(false)
  const [notifOpen,setNotifOpen]= useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [wsOpen,   setWsOpen]   = useState(false)
  const [dark,     setDark]     = useState(false)

  const closeAll = () => { setNotifOpen(false); setUserOpen(false); setWsOpen(false) }
  const activeTab = TABS.find(t => pathname.startsWith(t.path))?.label || ''

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      display: 'flex', alignItems: 'center',
      height: 64, gap: 12, padding: '0 20px',
      background: 'rgba(255,255,255,.88)',
      backdropFilter: 'blur(14px) saturate(160%)',
      borderBottom: '1px solid var(--border)',
    }}>
      {/* Logo */}
      <div onClick={() => { closeAll(); navigate('/') }}
        style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', flexShrink:0 }}>
        <div style={{
          width:32, height:32, borderRadius:9,
          background:'var(--primary)', display:'flex',
          alignItems:'center', justifyContent:'center', fontSize:16,
        }}>✨</div>
        <span style={{ fontWeight:700, fontSize:14, color:'var(--fg)' }}>Shiksha Tools</span>
      </div>

      <div style={{ width:1, height:24, background:'var(--border)', flexShrink:0 }} />

      {/* Workspace switcher */}
      <div style={{ position:'relative', flexShrink:0 }}>
        <button onClick={() => { setWsOpen(!wsOpen); setNotifOpen(false); setUserOpen(false) }}
          style={{
            display:'flex', alignItems:'center', gap:8,
            padding:'5px 10px', borderRadius:12,
            background:'var(--muted)', border:'1px solid var(--border)', cursor:'pointer',
          }}>
          <div style={{
            width:22, height:22, borderRadius:6,
            background:'var(--primary-10)', display:'flex',
            alignItems:'center', justifyContent:'center',
            fontSize:9, fontWeight:800, color:'var(--primary)',
          }}>DPS</div>
          <span style={{ fontSize:12, fontWeight:600, color:'var(--fg)', maxWidth:120, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>DPS R.K. Puram</span>
          <Badge color="var(--primary)" bg="var(--primary-5)" style={{ fontSize:9 }}>Pro</Badge>
          <span style={{ fontSize:11, color:'var(--muted-fg)' }}>⌄</span>
        </button>
        {wsOpen && (
          <div style={{
            position:'absolute', left:0, top:46, width:240,
            background:'var(--card)', border:'1px solid var(--border)',
            borderRadius:14, boxShadow:'0 8px 24px rgba(0,0,0,.1)', zIndex:200, padding:8,
          }}>
            <div style={{ fontSize:10, fontWeight:700, color:'var(--muted-fg)', padding:'4px 8px 8px', letterSpacing:0.5 }}>WORKSPACES</div>
            {WORKSPACES.map(ws => (
              <div key={ws.name} onClick={closeAll}
                style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 10px', borderRadius:10, cursor:'pointer' }}>
                <div style={{ width:32, height:32, borderRadius:8, background:'var(--secondary-10)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, color:'var(--secondary)' }}>
                  {ws.init}
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:'var(--fg)' }}>{ws.name}</div>
                  <div style={{ fontSize:11, color:'var(--muted-fg)' }}>{ws.plan} plan</div>
                </div>
              </div>
            ))}
            <div style={{ borderTop:'1px solid var(--border)', margin:'6px 0' }} />
            <div style={{ display:'flex', gap:8, padding:'8px 10px', fontSize:13, color:'var(--muted-fg)', cursor:'pointer', borderRadius:10 }}>+ Create workspace</div>
          </div>
        )}
      </div>

      {/* Centre tabs */}
      <div style={{ display:'flex', gap:22, flex:1, justifyContent:'center' }}>
        {TABS.map(t => (
          <span key={t.path} onClick={() => { closeAll(); navigate(t.path) }}
            style={{
              cursor:'pointer', fontWeight:500, fontSize:13,
              color: activeTab === t.label ? 'var(--primary)' : 'var(--muted-fg)',
              borderBottom: activeTab === t.label ? '2px solid var(--primary)' : '2px solid transparent',
              paddingBottom:2, whiteSpace:'nowrap',
            }}>{t.label}</span>
        ))}
      </div>

      {/* Search */}
      <div style={{
        display:'flex', alignItems:'center', gap:8,
        border: `1px solid ${focused ? 'rgba(200,75,12,.4)' : 'var(--border)'}`,
        borderRadius:20, padding:'6px 14px',
        background:'var(--muted)',
        width: focused ? 280 : 220, transition:'all .2s',
        boxShadow: focused ? '0 0 0 3px var(--primary-5)' : 'none',
        flex:'0 0 auto',
      }}>
        <span style={{ fontSize:13, color:'var(--muted-fg)' }}>🔍</span>
        <input value={search} onChange={e=>setSearch(e.target.value)}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          placeholder="Search tools, resources…"
          style={{ border:'none', outline:'none', fontSize:12, background:'transparent', fontFamily:"'Inter',sans-serif", flex:1, minWidth:0, color:'var(--fg)' }} />
        <kbd style={{ fontSize:9, color:'var(--muted-fg)', background:'var(--card)', padding:'1px 5px', borderRadius:4, border:'1px solid var(--border)', flexShrink:0 }}>⌘K</kbd>
      </div>

      {/* Right actions */}
      <div style={{ display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
        <Btn size="sm" onClick={() => { closeAll(); navigate('/lesson') }} style={{ gap:5 }}>+ Create</Btn>

        <button onClick={()=>setDark(!dark)} title="Toggle theme"
          style={{ background:'none', border:'none', cursor:'pointer', fontSize:17, padding:5, borderRadius:8, color:'var(--muted-fg)' }}>
          {dark ? '☀️' : '🌙'}
        </button>

        {/* Notifications */}
        <div style={{ position:'relative' }}>
          <button onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false); setWsOpen(false) }}
            style={{ background:'none', border:'none', cursor:'pointer', fontSize:17, padding:5, borderRadius:8, position:'relative', color:'var(--muted-fg)' }}>
            🔔
            <span style={{ position:'absolute', top:4, right:4, width:7, height:7, background:'var(--primary)', borderRadius:'50%', border:'2px solid white' }} />
          </button>
          {notifOpen && (
            <div style={{ position:'absolute', right:0, top:46, width:320, background:'var(--card)', border:'1px solid var(--border)', borderRadius:14, boxShadow:'0 8px 24px rgba(0,0,0,.1)', zIndex:200 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 16px', borderBottom:'1px solid var(--border)' }}>
                <span style={{ fontWeight:700, fontSize:13 }}>Notifications</span>
                <Badge variant="default">3 new</Badge>
              </div>
              <div style={{ padding:8 }}>
                {NOTIFS.map(n => (
                  <div key={n.title} style={{ display:'flex', gap:10, padding:'10px 8px', borderRadius:10, alignItems:'flex-start' }}>
                    {n.unread ? <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--primary)', marginTop:5, flexShrink:0 }} /> : <div style={{ width:7, flexShrink:0 }} />}
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:12, fontWeight:700, color:'var(--fg)', marginBottom:2 }}>{n.title}</div>
                      <div style={{ fontSize:11, color:'var(--muted-fg)' }}>{n.desc}</div>
                    </div>
                    <div style={{ fontSize:10, color:'var(--muted-fg)', flexShrink:0 }}>{n.time}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop:'1px solid var(--border)', padding:'10px 16px', textAlign:'center', fontSize:12, color:'var(--primary)', fontWeight:600, cursor:'pointer' }}>View all notifications</div>
            </div>
          )}
        </div>

        <div style={{ width:1, height:22, background:'var(--border)' }} />

        {/* User */}
        <div style={{ position:'relative' }}>
          <div onClick={() => { setUserOpen(!userOpen); setNotifOpen(false); setWsOpen(false) }}
            style={{ display:'flex', alignItems:'center', gap:6, cursor:'pointer', padding:'3px 6px', borderRadius:12 }}>
            <Avatar name="Priya Sharma" size={30} color="var(--primary)" />
            <span style={{ fontSize:11, color:'var(--muted-fg)' }}>⌄</span>
          </div>
          {userOpen && (
            <div style={{ position:'absolute', right:0, top:44, width:210, background:'var(--card)', border:'1px solid var(--border)', borderRadius:14, boxShadow:'0 8px 24px rgba(0,0,0,.1)', zIndex:200, padding:8 }}>
              <div style={{ padding:'8px 10px 12px', borderBottom:'1px solid var(--border)', marginBottom:6 }}>
                <div style={{ fontSize:13, fontWeight:700, color:'var(--fg)' }}>Priya Sharma</div>
                <div style={{ fontSize:11, color:'var(--muted-fg)' }}>priya.sharma@dps.edu.in</div>
              </div>
              {[
                { l:'Profile',   p:'/settings' },
                { l:'Workspace', p:'/settings' },
                { l:'Billing',   p:'/pricing'  },
                { l:'Settings',  p:'/settings' },
              ].map(i => (
                <div key={i.l} onClick={() => { navigate(i.p); closeAll() }}
                  style={{ padding:'8px 10px', borderRadius:8, cursor:'pointer', fontSize:13, color:'var(--fg)', fontWeight:500 }}>
                  {i.l}
                </div>
              ))}
              <div style={{ borderTop:'1px solid var(--border)', margin:'6px 0' }} />
              <div style={{ padding:'8px 10px', borderRadius:8, cursor:'pointer', fontSize:13, color:'var(--destructive)', fontWeight:500 }}>Log out</div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
