import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AppSidebar } from '../components/AppSidebar.jsx'
import { TopNavbar }  from '../components/TopNavbar.jsx'
import { Badge, Btn, Card } from '../components/ui.jsx'

const TOOLS = [
  { icon:'📖', label:'Lesson Planner',        desc:'Create structured, standards-aligned lesson plans with 5E, PBL, and differentiated instruction support.', color:'#C84B0C', bg:'#FFE0CC', created:32,  trend:'+12%', tag:'Most Used', path:'/lesson'    },
  { icon:'📄', label:'Worksheet Generator',   desc:'Build custom printable worksheets with auto-generated answer keys and bilingual support.',                color:'#2A7A3B', bg:'#D0EDD8', created:61,  trend:'+18%', tag:'Popular',  path:'/worksheet' },
  { icon:'❓', label:'Quiz Builder',           desc:'Design auto-graded quizzes with MCQ, short-answer, True/False, and HOTS question types.',                color:'#2563EB', bg:'#EFF6FF', created:48,  trend:'+9%',  tag:null,       path:'/quiz'      },
  { icon:'📋', label:'Rubric Creator',         desc:'Generate detailed scoring rubrics with customisable criteria aligned to CBSE/ICSE standards.',           color:'#D97706', bg:'#FEF3C7', created:24,  trend:'+6%',  tag:null,       path:'/lesson'    },
  { icon:'🎞️', label:'Presentation Gen',      desc:'Create visually engaging slide decks with speaker notes and curriculum-aligned content.',                 color:'#DB2777', bg:'#FCE7F3', created:19,  trend:'+15%', tag:'New',      path:'/lesson'    },
  { icon:'💬', label:'AI Assistant',           desc:'Chat with Shiksha AI to brainstorm, draft letters, plan lessons, or get teaching ideas instantly.',      color:'#C84B0C', bg:'#FFF4EE', created:156, trend:'+22%', tag:'Growing',  path:'/ai-chat'   },
]

const RECENT = [
  { title:'Mughal Empire – Class 8 CBSE',       type:'Lesson Plan',  time:'2 hours ago',  icon:'📖', bg:'#FFE0CC' },
  { title:'Algebra Quiz – Quadratic Equations',  type:'Quiz',         time:'5 hours ago',  icon:'❓', bg:'#EFF6FF' },
  { title:'English Essay Rubric – Grade 10',     type:'Rubric',       time:'Yesterday',    icon:'📋', bg:'#FEF3C7' },
  { title:'Chemistry Worksheet – Acids & Bases', type:'Worksheet',    time:'Yesterday',    icon:'📄', bg:'#D0EDD8' },
  { title:'Ancient Rome Presentation',           type:'Presentation', time:'2 days ago',   icon:'🎞️', bg:'#FCE7F3' },
]

const TRENDING = [
  { title:'5E Model Lesson Plan',      uses:'2.4k uses', rating:4.9, tag:'Science'    },
  { title:"Bloom's Taxonomy Quiz",     uses:'1.8k uses', rating:4.8, tag:'Assessment' },
  { title:'CBSE Board Prep Sheet',     uses:'1.5k uses', rating:4.7, tag:'Revision'   },
  { title:'Socratic Discussion Guide', uses:'1.2k uses', rating:4.6, tag:'ELA'        },
]

function ToolCard({ tool, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position:'relative', border:`1px solid ${hov ? tool.color+'55':'#E8E3DC'}`,
        borderRadius:14, background:'#fff', padding:18, cursor:'pointer',
        transition:'all .2s',
        transform: hov ? 'translateY(-2px)':'none',
        boxShadow: hov ? '0 8px 24px rgba(0,0,0,.08)':'0 1px 3px rgba(0,0,0,.04)',
        overflow:'hidden',
      }}>
      <div style={{ position:'absolute', inset:0, borderRadius:14, background:`linear-gradient(135deg,${tool.bg}88,transparent)`, opacity:hov?1:0, transition:'opacity .2s', pointerEvents:'none' }} />
      <div style={{ position:'relative', zIndex:1 }}>
        {tool.tag && <Badge variant="muted" style={{ position:'absolute', top:0, right:0, fontSize:9 }}>{tool.tag}</Badge>}
        <div style={{ width:44, height:44, borderRadius:14, background:tool.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, marginBottom:14 }}>{tool.icon}</div>
        <div style={{ fontWeight:700, fontSize:14, color:'#1A1613', marginBottom:5 }}>{tool.label}</div>
        <p style={{ fontSize:12, color:'#6B6560', lineHeight:1.6, marginBottom:12 }}>{tool.desc}</p>
        <div style={{ display:'flex', justifyContent:'space-between', borderTop:'1px solid #E8E3DC', paddingTop:10, fontSize:12 }}>
          <span style={{ color:'#6B6560' }}>{tool.created} created</span>
          <span style={{ color:'#2A7A3B', fontWeight:700 }}>↑ {tool.trend}</span>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#FAF9F7', fontFamily:"'Inter',sans-serif" }}>
      <AppSidebar />
      <div style={{ flex:1, overflow:'auto', display:'flex', flexDirection:'column' }}>
        <TopNavbar />
        <div style={{ maxWidth:1320, margin:'0 auto', padding:24, width:'100%' }}>
          {/* Header */}
          <div style={{ marginBottom:6 }}><Badge variant="outline" color="#C84B0C">✨ AI-Powered Educational Assistant</Badge></div>
          <h1 style={{ fontSize:28, fontWeight:800, color:'#1A1613', margin:'10px 0 4px' }}>Namaste, Teacher! 🙏</h1>
          <p style={{ color:'#6B6560', fontSize:14, marginBottom:24 }}>What would you like to create today?</p>

          {/* Tools */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontSize:17, color:'#C84B0C' }}>✨</span>
              <span style={{ fontWeight:700, fontSize:15, color:'#1A1613' }}>AI Teaching Tools</span>
            </div>
            <span style={{ fontSize:12, color:'#6B6560' }}>👥 1,247 educators using today</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:16 }}>
            {TOOLS.map(t => <ToolCard key={t.label} tool={t} onClick={() => navigate(t.path)} />)}
          </div>

          {/* CTA */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', border:'1px solid rgba(200,75,12,.15)', background:'linear-gradient(90deg,#FFF4EE,rgba(238,248,241,.4))', borderRadius:14, padding:'16px 20px', marginBottom:24 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:38, height:38, borderRadius:14, background:'#FFE0CC', display:'flex', alignItems:'center', justifyContent:'center', fontSize:19 }}>✨</div>
              <div>
                <div style={{ fontWeight:700, fontSize:13, color:'#1A1613' }}>Can't find what you need?</div>
                <div style={{ fontSize:12, color:'#6B6560' }}>Describe any teaching resource and AI will create it for you.</div>
              </div>
            </div>
            <Btn onClick={() => navigate('/ai-chat')}>✨ Ask AI</Btn>
          </div>

          {/* Bottom grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:20 }}>
            {/* Recent */}
            <Card>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:'#1A1613' }}>Recent Activity</div>
                  <div style={{ fontSize:12, color:'#6B6560' }}>Your latest generated resources</div>
                </div>
                <Btn variant="ghost" size="sm" style={{ color:'#6B6560' }}>See all →</Btn>
              </div>
              {RECENT.map(r => (
                <div key={r.title} style={{ display:'flex', alignItems:'center', gap:12, padding:'9px 8px', borderRadius:14, marginBottom:2, cursor:'pointer' }}>
                  <div style={{ width:40, height:40, background:r.bg, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{r.icon}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:'#1A1613', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.title}</div>
                    <div style={{ fontSize:11, color:'#6B6560' }}>{r.type}</div>
                  </div>
                  <span style={{ fontSize:11, color:'#6B6560', flexShrink:0 }}>{r.time}</span>
                  <span style={{ fontSize:14, color:'#6B6560' }}>↗</span>
                </div>
              ))}
            </Card>

            {/* Right col */}
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {/* Credits */}
              <Card>
                <div style={{ fontWeight:700, fontSize:14, marginBottom:3 }}>Usage This Month</div>
                <div style={{ fontSize:12, color:'#6B6560', marginBottom:16 }}>AI generation credits</div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:6 }}>
                  <span style={{ color:'#6B6560' }}>Credits Used</span>
                  <span style={{ fontWeight:700 }}>720 / 1,000</span>
                </div>
                <div style={{ height:9, background:'#F4F1ED', borderRadius:99, marginBottom:16 }}>
                  <div style={{ width:'72%', height:'100%', background:'#C84B0C', borderRadius:99 }} />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 }}>
                  {[{label:'Lessons',n:32},{label:'Quizzes',n:48},{label:'Worksheets',n:61},{label:'Others',n:19}].map(s => (
                    <div key={s.label} style={{ background:'#F4F1ED', borderRadius:14, padding:'10px 12px' }}>
                      <div style={{ fontSize:20, fontWeight:800, color:'#1A1613' }}>{s.n}</div>
                      <div style={{ fontSize:11, color:'#6B6560' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <Btn onClick={() => navigate('/pricing')} style={{ width:'100%', justifyContent:'center' }}>⚡ Upgrade Plan</Btn>
              </Card>

              {/* Trending */}
              <Card>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                  <div style={{ fontWeight:700, fontSize:14 }}>Trending Templates</div>
                  <Badge variant="green">↑ Popular</Badge>
                </div>
                {TRENDING.map(t => (
                  <div key={t.title} style={{ display:'flex', alignItems:'center', gap:10, border:'1px solid #E8E3DC', borderRadius:14, padding:10, marginBottom:8, cursor:'pointer' }}>
                    <div style={{ width:34, height:34, borderRadius:10, background:'#FFE0CC', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>▶</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, fontWeight:700, color:'#1A1613', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{t.title}</div>
                      <div style={{ fontSize:11, color:'#6B6560' }}>{t.uses} · ⭐ {t.rating}</div>
                    </div>
                    <Badge variant="muted" style={{ fontSize:9 }}>{t.tag}</Badge>
                  </div>
                ))}
                <Btn variant="outline" style={{ width:'100%', justifyContent:'center', fontSize:12, marginTop:4 }}>Browse All Templates →</Btn>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
