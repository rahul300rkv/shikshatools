import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppSidebar } from '../components/AppSidebar.jsx'
import { TopNavbar }  from '../components/TopNavbar.jsx'
import { Badge, Btn, Card, StatCard, Avatar } from '../components/ui.jsx'

const STUDENTS = [
  { name:'Aarav Agarwal',  id:'#S1024', cls:'Grade 10-B', last:'2 hours ago',  score:94, status:'Excellence',   color:'#2A7A3B' },
  { name:'Ishaan Kapoor',  id:'#S1025', cls:'Grade 10-B', last:'Yesterday',    score:62, status:'Needs Support', color:'#C84B0C' },
  { name:'Meera Sharma',   id:'#S1026', cls:'Grade 10-B', last:'5 mins ago',   score:81, status:'Improving',     color:'#D97706' },
  { name:'Priya Patel',    id:'#S1027', cls:'Grade 10-B', last:'3 hours ago',  score:88, status:'Excellence',   color:'#2A7A3B' },
  { name:'Rohit Verma',    id:'#S1028', cls:'Grade 10-B', last:'2 days ago',   score:55, status:'Needs Support', color:'#C84B0C' },
  { name:'Ananya Singh',   id:'#S1029', cls:'Grade 10-B', last:'4 hours ago',  score:76, status:'Improving',     color:'#D97706' },
  { name:'Dev Malhotra',   id:'#S1030', cls:'Grade 10-A', last:'Yesterday',    score:91, status:'Excellence',   color:'#2A7A3B' },
  { name:'Sneha Iyer',     id:'#S1031', cls:'Grade 10-A', last:'3 days ago',   score:48, status:'Needs Support', color:'#C84B0C' },
]

const AI_INSIGHTS = [
  { tag:'CONCEPT STRUGGLE', color:'#C84B0C', bg:'#FFF4EE',
    text:'34% of the class is struggling with Quadratic Equations. AI suggests a visual geometry approach.', action:'Generate Lesson →' },
  { tag:'ATTENTION REQUIRED', color:'#C0392B', bg:'#FEE2E2',
    text:"Ishaan & Rohit's quiz scores dropped 15% this week. Consider a one-on-one session." },
  { tag:'RESOURCE RECOMMENDATION', color:'#2A7A3B', bg:'#EEF8F1',
    text:"Top worksheet for 'Ancient Civilizations' shared 42 times by peers — try it with your class." },
]

const BAR_DATA = [
  { label:'Week 1',   val:52, color:'#D4956A' },
  { label:'Week 2',   val:61, color:'#2A7A3B' },
  { label:'Week 3',   val:58, color:'#D4956A' },
  { label:'Week 4',   val:70, color:'#2A7A3B' },
  { label:'Current',  val:66, color:'#C84B0C' },
]

export default function StudentsPage() {
  const navigate = useNavigate()
  const [search,  setSearch]  = useState('')
  const [filter,  setFilter]  = useState('All')
  const [page,    setPage]    = useState(1)

  const filtered = STUDENTS.filter(s =>
    (filter === 'All' || s.status === filter) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search))
  )

  const STATUS_FILTERS = ['All','Excellence','Improving','Needs Support']

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#FAF9F7', fontFamily:"'Inter',sans-serif" }}>
      <AppSidebar />
      <div style={{ flex:1, overflow:'auto', display:'flex', flexDirection:'column' }}>
        <TopNavbar />
        <div style={{ maxWidth:1320, margin:'0 auto', padding:24, width:'100%' }}>

          {/* Page header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
            <div>
              <h1 style={{ fontSize:22, fontWeight:800, color:'#C84B0C', margin:'0 0 4px' }}>Student Progress</h1>
              <p style={{ fontSize:13, color:'#6B6560', margin:0 }}>Track class performance and identify students who need support</p>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <Btn variant="outline" size="sm">📥 Export Report</Btn>
              <Btn size="sm" onClick={() => navigate('/lesson')}>+ Create Remedial Plan</Btn>
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:22 }}>
            <StatCard icon="🎓" label="Avg. Class Performance" value="84.5%" delta="+4.2%" accentColor="#2A7A3B" />
            <StatCard icon="📚" label="Top Subject"            value="Mathematics"              accentColor="#C84B0C" />
            <StatCard icon="📋" label="Completion Rate"        value="92.1%"        delta="+1.8%" accentColor="#2A7A3B" />
            <StatCard icon="❓" label="Quizzes This Month"     value="24"                       accentColor="#2563EB" />
          </div>

          {/* Chart + AI Insights */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:18, marginBottom:22 }}>
            {/* Bar chart */}
            <Card>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:15, color:'#1A1613' }}>Class-wide Score Trends</div>
                  <div style={{ fontSize:12, color:'#6B6560' }}>Academic year performance tracking</div>
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  <Badge variant="muted">Last 30 Days</Badge>
                  <Badge variant="outline">Term View</Badge>
                </div>
              </div>

              {/* Bars */}
              <div style={{ display:'flex', alignItems:'flex-end', gap:16, height:150, paddingBottom:8 }}>
                {BAR_DATA.map((b, i) => (
                  <div key={b.label} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                    {i === BAR_DATA.length-1 && (
                      <div style={{ background:'#1A1613', color:'#fff', fontSize:9, fontWeight:700, padding:'2px 7px', borderRadius:10 }}>Today</div>
                    )}
                    <div style={{
                      width:'100%', height:`${b.val * 1.8}px`,
                      background: b.color,
                      borderRadius:'6px 6px 0 0',
                      opacity: i === BAR_DATA.length-1 ? 1 : 0.8,
                      transition:'height .3s ease',
                      cursor:'pointer',
                    }} title={`${b.val}%`} />
                    <div style={{ fontSize:10, color:'#6B6560', fontWeight:600, textAlign:'center' }}>{b.label}</div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div style={{ display:'flex', gap:16, marginTop:12, paddingTop:12, borderTop:'1px solid #E8E3DC' }}>
                {[{color:'#D4956A',label:'Below avg'},{color:'#2A7A3B',label:'Above avg'},{color:'#C84B0C',label:'Current week'}].map(l => (
                  <div key={l.label} style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'#6B6560' }}>
                    <div style={{ width:10, height:10, borderRadius:3, background:l.color }} />{l.label}
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Insights */}
            <Card>
              <div style={{ fontWeight:700, fontSize:14, marginBottom:14, display:'flex', alignItems:'center', gap:6 }}>
                ✦ AI Insights
              </div>
              {AI_INSIGHTS.map(ins => (
                <div key={ins.tag} style={{
                  background:ins.bg, border:`1px solid ${ins.color}33`,
                  borderRadius:10, padding:12, marginBottom:10,
                }}>
                  <div style={{ fontSize:10, fontWeight:800, color:ins.color, marginBottom:5, letterSpacing:0.3 }}>{ins.tag}</div>
                  <div style={{ fontSize:12, color:'#1A1613', lineHeight:1.6 }}>{ins.text}</div>
                  {ins.action && (
                    <div onClick={() => navigate('/lesson')}
                      style={{ fontSize:12, color:ins.color, fontWeight:700, marginTop:6, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
                      {ins.action}
                    </div>
                  )}
                </div>
              ))}
            </Card>
          </div>

          {/* Student Roster */}
          <Card>
            {/* Toolbar */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
              <div style={{ fontWeight:700, fontSize:15 }}>Student Roster</div>
              <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                {/* Status filters */}
                <div style={{ display:'flex', gap:6 }}>
                  {STATUS_FILTERS.map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                      style={{
                        border:`1px solid ${filter===f?'#C84B0C':'#E8E3DC'}`,
                        borderRadius:20, padding:'4px 12px', fontSize:11, fontWeight:600,
                        background: filter===f ? '#FFF4EE' : '#fff',
                        color: filter===f ? '#C84B0C' : '#6B6560', cursor:'pointer',
                      }}>{f}</button>
                  ))}
                </div>
                {/* Search */}
                <div style={{ display:'flex', alignItems:'center', gap:8, border:'1px solid #E8E3DC', borderRadius:14, padding:'7px 12px', background:'#fff' }}>
                  <span style={{ fontSize:13, color:'#6B6560' }}>🔍</span>
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search students..."
                    style={{ border:'none', outline:'none', fontSize:12, background:'transparent', fontFamily:"'Inter',sans-serif", width:140, color:'#1A1613' }} />
                </div>
              </div>
            </div>

            {/* Table header */}
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1.2fr 1fr 1fr 80px', padding:'8px 4px', borderBottom:'2px solid #E8E3DC', marginBottom:4 }}>
              {['STUDENT NAME','CLASS','LAST ACTIVITY','AVG. SCORE','STATUS','ACTION'].map(h => (
                <div key={h} style={{ fontSize:10, fontWeight:700, color:'#6B6560', letterSpacing:0.5 }}>{h}</div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ padding:'32px 0', textAlign:'center', color:'#6B6560', fontSize:13 }}>No students match your search.</div>
            )}

            {filtered.map(s => (
              <div key={s.id} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1.2fr 1fr 1fr 80px', padding:'12px 4px', borderBottom:'1px solid #E8E3DC', alignItems:'center' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <Avatar name={s.name} size={36} color={s.color} />
                  <div>
                    <div style={{ fontWeight:700, fontSize:13 }}>{s.name}</div>
                    <div style={{ fontSize:10, color:'#6B6560' }}>ID: {s.id}</div>
                  </div>
                </div>
                <div style={{ fontSize:13, color:'#1A1613' }}>{s.cls}</div>
                <div style={{ fontSize:12, color:'#6B6560' }}>{s.last}</div>
                <div style={{ fontSize:22, fontWeight:900, color:'#1A1613' }}>{s.score}%</div>
                <div>
                  <span style={{
                    fontSize:11, fontWeight:700, color:s.color,
                    background:`${s.color}18`, padding:'3px 10px', borderRadius:20,
                  }}>● {s.status}</span>
                </div>
                <div style={{ display:'flex', gap:6 }}>
                  <button style={{ background:'none', border:'none', cursor:'pointer', fontSize:14, color:'#6B6560' }} title="View profile">👁</button>
                  <button onClick={() => navigate('/lesson')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:14, color:'#6B6560' }} title="Create plan">📖</button>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:16 }}>
              <div style={{ fontSize:12, color:'#6B6560' }}>Showing {filtered.length} of {STUDENTS.length} students</div>
              <div style={{ display:'flex', gap:6 }}>
                {['‹','1','2','3','›'].map(p => (
                  <div key={p}
                    onClick={() => !isNaN(p) && setPage(Number(p))}
                    style={{
                      width:30, height:30, borderRadius:8,
                      border:`1px solid ${(p===String(page))?'#C84B0C':'#E8E3DC'}`,
                      background: (p===String(page)) ? '#C84B0C' : '#fff',
                      color: (p===String(page)) ? '#fff' : '#1A1613',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      cursor:'pointer', fontWeight:700, fontSize:12,
                    }}>{p}</div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
