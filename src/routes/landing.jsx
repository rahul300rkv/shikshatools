// REBRANDED FOR CBSE TEACHERS
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Btn, Card } from '../components/ui.jsx'

const TOOLS = [
  { icon:'📖', label:'Lesson Planner',          desc:'Create structured, standards-aligned lesson plans with 5E, PBL, and differentiated instruction support.',           color:'#C84B0C', bg:'#FFE0CC', created:32,  trend:'+12%', tag:'Most Used', path:'/lesson'    },
  { icon:'📄', label:'Worksheet Generator',     desc:'Build custom printable worksheets with auto-generated answer keys and bilingual support for Indian classrooms.',    color:'#2A7A3B', bg:'#D0EDD8', created:61,  trend:'+18%', tag:'Popular',  path:'/worksheet' },
  { icon:'❓', label:'Quiz Builder',             desc:'Design auto-graded quizzes with MCQ, short-answer, True/False, and HOTS question types.',                          color:'#2563EB', bg:'#EFF6FF', created:48,  trend:'+9%',  tag:null,       path:'/quiz'      },
  { icon:'📋', label:'Rubric Creator',           desc:'Generate detailed scoring rubrics with customisable criteria aligned to CBSE/ICSE assessment standards.',           color:'#D97706', bg:'#FEF3C7', created:24,  trend:'+6%',  tag:null,       path:'/lesson'    },
  { icon:'🎞️', label:'Presentation Generator', desc:'Create visually engaging slide decks with speaker notes and curriculum-aligned content.',                            color:'#DB2777', bg:'#FCE7F3', created:19,  trend:'+15%', tag:'New',      path:'/lesson'    },
  { icon:'💬', label:'AI Assistant',             desc:'Chat with TeachTools AI to brainstorm, plan, draft letters, or get teaching ideas instantly.',                        color:'#C84B0C', bg:'#FFF4EE', created:156, trend:'+22%', tag:'Growing',  path:'/ai-chat'   },
]

const RECENT = [
  { icon:'📖', label:'AP Biology – Photosynthesis Lesson',   time:'2h ago',    path:'/lesson'    },
  { icon:'❓', label:'Algebra Quiz – Quadratics',             time:'5h ago',    path:'/quiz'      },
  { icon:'📋', label:'English Essay Rubric',                  time:'Yesterday', path:'/lesson'    },
  { icon:'📄', label:'Chemistry Worksheet – Acids & Bases',   time:'Yesterday', path:'/worksheet' },
]

function ToolCard({ tool, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:'relative', border:`1px solid ${hov ? tool.color+'55' : '#E8E3DC'}`,
        borderRadius:14, background:'#fff', padding:20, cursor:'pointer',
        transition:'all .25s',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov ? '0 8px 24px rgba(0,0,0,.08)' : '0 1px 3px rgba(0,0,0,.04)',
        overflow:'hidden',
      }}>
      {/* Gradient overlay */}
      <div style={{
        position:'absolute', inset:0, borderRadius:14,
        background:`linear-gradient(135deg,${tool.bg}88,transparent)`,
        opacity: hov ? 1 : 0, transition:'opacity .25s', pointerEvents:'none',
      }} />
      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
          <div style={{
            width:46, height:46, borderRadius:14, background:tool.bg,
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:22,
            transform: hov ? 'scale(1.08)' : 'scale(1)', transition:'transform .25s',
          }}>{tool.icon}</div>
          <div style={{ display:'flex', gap:6, alignItems:'center' }}>
            {tool.tag && <Badge variant="muted" style={{ fontSize:9 }}>{tool.tag}</Badge>}
            {hov && <div style={{ width:28, height:28, borderRadius:8, background:'#F4F1ED', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, color:'#6B6560' }}>↗</div>}
          </div>
        </div>
        <div style={{ fontWeight:700, fontSize:14, color:'#1A1613', marginBottom:6 }}>{tool.label}</div>
        <p style={{ fontSize:12, color:'#6B6560', lineHeight:1.6, marginBottom:14 }}>{tool.desc}</p>
        <div style={{ display:'flex', justifyContent:'space-between', borderTop:'1px solid #E8E3DC', paddingTop:12, fontSize:12 }}>
          <span style={{ color:'#6B6560' }}>{tool.created} created</span>
          <span style={{ color:'#2A7A3B', fontWeight:700 }}>↑ {tool.trend}</span>
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')

  return (
    <div style={{ background:'#FAF9F7', minHeight:'100vh', fontFamily:"'Inter',sans-serif" }}>
      {/* Minimal nav */}
      <header style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 40px', height:64, background:'rgba(255,255,255,.88)', backdropFilter:'blur(14px)', borderBottom:'1px solid #E8E3DC', position:'sticky', top:0, zIndex:100 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:32, height:32, borderRadius:9, background:'#C84B0C', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>✨</div>
          <span style={{ fontWeight:700, fontSize:15, color:'#1A1613' }}>Shiksha Tools</span>
        </div>
        <div style={{ display:'flex', gap:28, fontSize:13, fontWeight:500 }}>
          {['Tools','Boards','Pricing','About'].map(t => (
            <span key={t} onClick={() => t === 'Pricing' && navigate('/pricing')}
              style={{ cursor:'pointer', color:'#6B6560' }}>{t}</span>
          ))}
        </div>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <span style={{ fontSize:13, fontWeight:600, cursor:'pointer', color:'#1A1613' }}>Login</span>
          <Btn onClick={() => navigate('/dashboard')}>Start Creating →</Btn>
        </div>
      </header>

      <div style={{ maxWidth:1320, margin:'0 auto', padding:'48px 40px' }}>
        {/* ── Bento Hero ── */}
        <div style={{ position:'relative', overflow:'hidden' }}>
          {/* Blob */}
          <div style={{ pointerEvents:'none', position:'absolute', inset:0, zIndex:0 }}>
            <div style={{ position:'absolute', top:-60, right:'25%', width:420, height:420, borderRadius:'50%', background:'#C84B0C07', filter:'blur(60px)' }} />
            <div style={{ position:'absolute', bottom:-80, left:'20%', width:340, height:340, borderRadius:'50%', background:'#2A7A3B05', filter:'blur(60px)' }} />
          </div>

          <div style={{ position:'relative', zIndex:1, display:'grid', gridTemplateColumns:'3fr 2fr', gap:24, marginBottom:36 }}>
            {/* Left hero */}
            <div>
              <div style={{ marginBottom:20 }}>
                <Badge color="#C84B0C" bg="#FFF4EE" style={{ padding:'4px 14px', fontSize:11 }}>
                  ⚡ AI-powered teaching tools for India 🇮🇳
                </Badge>
              </div>
              <h1 style={{ fontSize:40, fontWeight:800, lineHeight:1.1, color:'#1A1613', marginBottom:14, letterSpacing:'-0.5px' }}>
                Create teaching materials{' '}
                <span style={{ background:'linear-gradient(90deg,#C84B0C,#C84B0Cbb)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  in minutes.
                </span>
              </h1>
              <p style={{ fontSize:15, color:'#6B6560', lineHeight:1.7, marginBottom:24, maxWidth:510 }}>
                Describe what you need and let AI generate lesson plans, worksheets, quizzes, rubrics, and presentations — tailored for CBSE, ICSE, and State Board classrooms.
              </p>

              {/* AI prompt input */}
              <div style={{ display:'flex', alignItems:'center', gap:10, border:'1.5px solid #E8E3DC', borderRadius:20, padding:'8px 8px 8px 16px', background:'#fff', marginBottom:16, boxShadow:'0 2px 12px rgba(0,0,0,.05)' }}>
                <div style={{ width:38, height:38, borderRadius:10, background:'#FFE0CC', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>✨</div>
                <input value={prompt} onChange={e=>setPrompt(e.target.value)} onKeyDown={e=>e.key==='Enter'&&navigate('/lesson')}
                  placeholder='Try "Create a 5E lesson plan on Mughal Empire for Class 8 CBSE"'
                  style={{ border:'none', outline:'none', fontSize:13, flex:1, background:'transparent', fontFamily:"'Inter',sans-serif", color:'#1A1613', minWidth:0 }} />
                <Btn onClick={() => navigate('/lesson')} style={{ borderRadius:12, flexShrink:0 }}>Generate →</Btn>
              </div>

              {/* Quick chips */}
              <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                <span style={{ fontSize:11, color:'#6B6560', fontWeight:600 }}>Quick:</span>
                {[
                  { icon:'📖', label:'Lesson Plan', path:'/lesson'    },
                  { icon:'📄', label:'Worksheet',   path:'/worksheet' },
                  { icon:'❓', label:'Quiz',         path:'/quiz'      },
                  { icon:'💬', label:'AI Chat',      path:'/ai-chat'   },
                ].map(a => (
                  <button key={a.label} onClick={() => navigate(a.path)}
                    style={{ display:'flex', alignItems:'center', gap:5, border:'1px solid #E8E3DC', borderRadius:14, padding:'5px 12px', fontSize:12, fontWeight:600, background:'#fff', cursor:'pointer', color:'#1A1613' }}>
                    <span>{a.icon}</span>{a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right bento */}
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                {[
                  { icon:'⚡', label:'Resources created', value:'2,48,000+', color:'#C84B0C', bg:'#FFE0CC' },
                  { icon:'🕐', label:'Hours saved',        value:'63,500h+',  color:'#2A7A3B', bg:'#D0EDD8' },
                ].map(s => (
                  <Card key={s.label} style={{ padding:16 }}>
                    <div style={{ width:34, height:34, borderRadius:14, background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, marginBottom:10 }}>{s.icon}</div>
                    <div style={{ fontSize:22, fontWeight:800, color:'#1A1613' }}>{s.value}</div>
                    <div style={{ fontSize:11, color:'#6B6560' }}>{s.label}</div>
                  </Card>
                ))}
              </div>
              <Card style={{ flex:1, padding:16 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                  <span style={{ fontWeight:700, fontSize:13 }}>Recent Activity</span>
                  <span style={{ fontSize:11, color:'#C84B0C', cursor:'pointer' }}>View all</span>
                </div>
                {RECENT.map(r => (
                  <div key={r.label} onClick={() => navigate(r.path)}
                    style={{ display:'flex', alignItems:'center', gap:10, padding:'7px 8px', borderRadius:14, cursor:'pointer', marginBottom:2 }}>
                    <div style={{ width:30, height:30, background:'#F4F1ED', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, flexShrink:0 }}>{r.icon}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:'#1A1613', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.label}</div>
                      <div style={{ fontSize:10, color:'#6B6560' }}>{r.time}</div>
                    </div>
                    <span style={{ fontSize:12, color:'#6B6560' }}>›</span>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </div>

        {/* Board chips */}
        <div style={{ display:'flex', justifyContent:'center', gap:10, marginBottom:48 }}>
          {['CBSE','ICSE','ISC','State Board'].map(b => (
            <span key={b} style={{ border:'1px solid #E8E3DC', borderRadius:8, padding:'5px 18px', fontSize:12, fontWeight:600, background:'#fff' }}>🇮🇳 {b}</span>
          ))}
        </div>

        {/* Tools section */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:18 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
              <span style={{ fontSize:18, color:'#C84B0C' }}>✨</span>
              <span style={{ fontWeight:700, fontSize:16, color:'#1A1613' }}>AI Teaching Tools</span>
            </div>
            <p style={{ fontSize:13, color:'#6B6560' }}>Choose a tool to start creating with AI</p>
          </div>
          <div style={{ fontSize:12, color:'#6B6560' }}>👥 1,247 educators using today</div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:18 }}>
          {TOOLS.map(t => <ToolCard key={t.label} tool={t} onClick={() => navigate(t.path)} />)}
        </div>

        {/* CTA banner */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', border:'1px solid rgba(200,75,12,.15)', background:'linear-gradient(90deg,#FFF4EE,rgba(238,248,241,.4))', borderRadius:14, padding:'18px 24px', marginBottom:48 }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ width:40, height:40, borderRadius:14, background:'#FFE0CC', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>✨</div>
            <div>
              <div style={{ fontWeight:700, fontSize:14, color:'#1A1613' }}>Can't find what you need?</div>
              <div style={{ fontSize:12, color:'#6B6560' }}>Describe any teaching resource and AI will create it for you.</div>
            </div>
          </div>
          <Btn onClick={() => navigate('/ai-chat')}>✨ Ask AI</Btn>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background:'#1A1613', textAlign:'center', padding:'22px 40px' }}>
        <span style={{ fontSize:14, color:'#fff', fontWeight:600 }}>No sign-up. No credit card. 100% free. Powered by Claude AI 🤖 · Made in India 🇮🇳</span>
      </div>
      <footer style={{ background:'#fff', padding:'28px 60px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #E8E3DC' }}>
        <div>
          <div style={{ fontWeight:700, fontSize:14, color:'#1A1613', marginBottom:4 }}>Shiksha Tools</div>
          <div style={{ fontSize:12, color:'#6B6560' }}>© 2024 Shiksha Tools. Powered by Claude AI. Made with ❤️ for Indian Educators.</div>
        </div>
        <div style={{ display:'flex', gap:24 }}>
          {['Privacy Policy','Terms of Service','Contact Us','Board Syllabus'].map(l => (
            <span key={l} style={{ fontSize:12, color:'#6B6560', cursor:'pointer' }}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  )
}
