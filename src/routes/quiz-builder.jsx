import { useState } from 'react'
import { AppSidebar } from '../components/AppSidebar.jsx'
import { TopNavbar }  from '../components/TopNavbar.jsx'
import { Badge, Btn, Card, Toggle, Sel, Inp, Label, StatCard } from '../components/ui.jsx'

const QUESTION_TYPES = [
  { id:'mcq',   icon:'☰', label:'MCQs'         },
  { id:'tf',    icon:'👍', label:'True/False'   },
  { id:'short', icon:'—',  label:'Short Answer' },
  { id:'hots',  icon:'🧠', label:'HOTS'         },
]

const QUESTIONS = [
  {
    id:'q1', text:'Which organelle is the primary site of photosynthesis in plant cells?',
    pts:2, diff:'Easy',
    options:[
      { t:'Mitochondria',          c:false },
      { t:'Chloroplast',           c:true  },
      { t:'Nucleus',               c:false },
      { t:'Endoplasmic Reticulum', c:false },
    ],
  },
  {
    id:'q2', text:'What are the products of the light-dependent reactions?',
    pts:2, diff:'Medium',
    options:[
      { t:'Glucose and O₂',    c:false },
      { t:'ATP, NADPH, and O₂',c:true  },
      { t:'CO₂ and H₂O',       c:false },
      { t:'ATP and Glucose',   c:false },
    ],
  },
  {
    id:'q3', text:'The Calvin Cycle occurs in which part of the chloroplast?',
    pts:2, diff:'Medium',
    options:[
      { t:'Thylakoid membrane', c:false },
      { t:'Inner membrane',     c:false },
      { t:'Stroma',             c:true  },
      { t:'Outer membrane',     c:false },
    ],
  },
  {
    id:'q4', text:'Which pigment is primarily responsible for absorbing light energy during photosynthesis?',
    pts:2, diff:'Easy',
    options:[
      { t:'Xanthophyll',  c:false },
      { t:'Carotenoid',   c:false },
      { t:'Chlorophyll a',c:true  },
      { t:'Phycocyanin',  c:false },
    ],
  },
  {
    id:'q5', text:'If CO₂ concentration is reduced, what is the most likely effect on the Calvin Cycle?',
    pts:3, diff:'Hard',
    options:[
      { t:'Rate of glucose production increases', c:false },
      { t:'Rate of glucose production decreases', c:true  },
      { t:'O₂ production increases',              c:false },
      { t:'No effect on the cycle',               c:false },
    ],
  },
]

const DIFF_COLOR = { Easy:'#2A7A3B', Medium:'#D97706', Hard:'#C0392B' }
const DIFF_BG    = { Easy:'#D0EDD8', Medium:'#FEF3C7', Hard:'#FEE2E2' }

export default function QuizBuilderPage() {
  const [selectedQ,     setSelectedQ]     = useState('q1')
  const [selectedTypes, setSelectedTypes] = useState(['mcq','short'])
  const [answerKey,     setAnswerKey]     = useState(true)
  const [shuffle,       setShuffle]       = useState(true)
  const [timer,         setTimer]         = useState('15 minutes')
  const [difficulty,    setDifficulty]    = useState('Mixed')

  const toggleType = id =>
    setSelectedTypes(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#FAF9F7', fontFamily:"'Inter',sans-serif" }}>
      <AppSidebar />
      <div style={{ flex:1, overflow:'auto', display:'flex', flexDirection:'column' }}>
        <TopNavbar />
        <div style={{ maxWidth:1320, margin:'0 auto', padding:24, width:'100%' }}>

          {/* Header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:40, height:40, borderRadius:14, background:'#EFF6FF', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>❓</div>
              <div>
                <h1 style={{ fontSize:20, fontWeight:800, color:'#1A1613', margin:0 }}>Quiz Builder</h1>
                <p style={{ fontSize:12, color:'#6B6560', margin:0 }}>Design auto-graded quizzes with multiple question types</p>
              </div>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <Btn variant="outline" size="sm">👁 Preview</Btn>
              <Btn variant="outline" size="sm">⬇ Export</Btn>
              <Btn size="sm">🚀 Publish Quiz</Btn>
            </div>
          </div>

          {/* Stat bar */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 }}>
            {[
              { icon:'❓', label:'Total Questions', value:'5',      color:'#2563EB' },
              { icon:'🏆', label:'Total Points',    value:'11 pts', color:'#C84B0C' },
              { icon:'⏱', label:'Est. Duration',   value:'18 min', color:'#D97706' },
              { icon:'🎯', label:'Avg. Difficulty', value:'Medium', color:'#2A7A3B' },
            ].map(s => (
              <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} accentColor={s.color} style={{ padding:14 }} />
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:24 }}>

            {/* ── Left: Questions ── */}
            <div>
              {/* Settings bar */}
              <Card style={{ padding:14, marginBottom:14, display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
                <div><Label>Timer</Label>
                  <Sel value={timer} onChange={setTimer} options={['No timer','10 minutes','15 minutes','20 minutes','30 minutes']} style={{ width:130 }} />
                </div>
                <div style={{ width:1, height:32, background:'#E8E3DC' }} />
                <div><Label>Difficulty Mix</Label>
                  <Sel value={difficulty} onChange={setDifficulty} options={['Easy','Medium','Hard','Mixed']} style={{ width:110 }} />
                </div>
                <div style={{ width:1, height:32, background:'#E8E3DC' }} />
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <Toggle on={shuffle} set={setShuffle} />
                  <span style={{ fontSize:13, color:'#1A1613' }}>Shuffle questions</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <Toggle on={answerKey} set={setAnswerKey} />
                  <span style={{ fontSize:13, color:'#1A1613' }}>Include answer key</span>
                </div>
              </Card>

              {/* Question types */}
              <Card style={{ padding:16, marginBottom:14 }}>
                <div style={{ fontWeight:700, fontSize:13, marginBottom:12 }}>Question Types</div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
                  {QUESTION_TYPES.map(t => {
                    const on = selectedTypes.includes(t.id)
                    return (
                      <button key={t.id} onClick={() => toggleType(t.id)}
                        style={{
                          display:'flex', flexDirection:'column', alignItems:'center', gap:6,
                          border:`1.5px solid ${on ? '#C84B0C' : '#E8E3DC'}`,
                          borderRadius:12, padding:'12px 8px', cursor:'pointer',
                          background: on ? '#FFF4EE' : '#fff',
                          position:'relative', transition:'all .15s',
                        }}>
                        {on && <div style={{ position:'absolute', top:7, right:7, width:14, height:14, background:'#C84B0C', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, color:'#fff' }}>✓</div>}
                        <span style={{ fontSize:20, color: on ? '#C84B0C' : '#6B6560' }}>{t.icon}</span>
                        <span style={{ fontSize:11, fontWeight:700, color: on ? '#1A1613' : '#6B6560' }}>{t.label}</span>
                      </button>
                    )
                  })}
                </div>
              </Card>

              {/* Question list */}
              {QUESTIONS.map((q, idx) => (
                <div key={q.id} onClick={() => setSelectedQ(q.id)}
                  style={{
                    border:`1.5px solid ${selectedQ === q.id ? '#C84B0C' : '#E8E3DC'}`,
                    borderRadius:14, background:'#fff', padding:18, marginBottom:12,
                    cursor:'pointer', position:'relative',
                    boxShadow: selectedQ === q.id ? '0 0 0 3px #FFF4EE' : 'none',
                    transition:'all .15s',
                  }}>
                  {/* Drag handle */}
                  <span style={{ position:'absolute', left:-14, top:'50%', transform:'translateY(-50%)', fontSize:14, color:'#6B6560', background:'#fff', padding:2, cursor:'grab' }}>⠿</span>

                  <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                    {/* Number */}
                    <div style={{ width:30, height:30, background:'#F4F1ED', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13, flexShrink:0 }}>{idx + 1}</div>

                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:13, fontWeight:600, color:'#1A1613', marginBottom:10, lineHeight:1.6 }}>{q.text}</p>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
                        {q.options.map((o, oi) => (
                          <div key={oi} style={{
                            display:'flex', alignItems:'center', gap:8,
                            border:`1px solid ${o.c ? '#2A7A3B44' : '#E8E3DC'}`,
                            borderRadius:10, padding:'7px 10px',
                            background: o.c ? '#EEF8F1' : '#fff',
                          }}>
                            {o.c
                              ? <span style={{ color:'#2A7A3B', fontSize:13 }}>✓</span>
                              : <span style={{ color:'#6B656066', fontSize:13 }}>○</span>
                            }
                            <span style={{ fontSize:12, color: o.c ? '#1A1613' : '#6B6560', fontWeight: o.c ? 600 : 400 }}>{o.t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6, flexShrink:0 }}>
                      <Badge color={DIFF_COLOR[q.diff]} bg={DIFF_BG[q.diff]} style={{ fontSize:9 }}>{q.diff}</Badge>
                      <span style={{ fontSize:11, color:'#6B6560' }}>{q.pts} pts</span>
                      <div style={{ display:'flex', gap:4 }}>
                        <button style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#6B6560' }} title="Duplicate">📋</button>
                        <button style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#C0392B' }} title="Delete">🗑</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add question buttons */}
              <div style={{ display:'flex', gap:12, marginTop:4 }}>
                <button style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8, border:'2px dashed #E8E3DC', borderRadius:14, padding:14, fontSize:13, color:'#6B6560', cursor:'pointer', background:'none' }}>
                  + Add question manually
                </button>
                <button style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8, border:'2px dashed rgba(200,75,12,.3)', borderRadius:14, padding:14, fontSize:13, color:'#C84B0C', cursor:'pointer', background:'#FFF4EE' }}>
                  ✨ Generate with AI
                </button>
              </div>
            </div>

            {/* ── Right: Analytics + Export ── */}
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>

              {/* Analytics */}
              <Card style={{ padding:18 }}>
                <div style={{ fontWeight:700, fontSize:13, marginBottom:14, display:'flex', alignItems:'center', gap:6 }}>📊 Quiz Analytics</div>
                {[
                  { l:'Est. Completion',        v:'~18 min' },
                  { l:'Total Points',           v:'11 pts'  },
                  { l:'Avg. Score (predicted)', v:'74%'     },
                  { l:'Board Alignment',        v:'CBSE ✓'  },
                ].map(s => (
                  <div key={s.l} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid #E8E3DC' }}>
                    <span style={{ fontSize:12, color:'#6B6560' }}>{s.l}</span>
                    <span style={{ fontSize:13, fontWeight:700, color:'#1A1613' }}>{s.v}</span>
                  </div>
                ))}

                {/* Difficulty distribution */}
                <div style={{ marginTop:14 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:'#6B6560', marginBottom:8, textTransform:'uppercase', letterSpacing:0.5 }}>Difficulty Mix</div>
                  {[
                    { l:'Easy',   pct:40, c:'#2A7A3B' },
                    { l:'Medium', pct:40, c:'#D97706'  },
                    { l:'Hard',   pct:20, c:'#C0392B'  },
                  ].map(d => (
                    <div key={d.l} style={{ marginBottom:8 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:4 }}>
                        <span style={{ color:'#6B6560' }}>{d.l}</span>
                        <span style={{ fontWeight:700, color:d.c }}>{d.pct}%</span>
                      </div>
                      <div style={{ height:5, background:'#F4F1ED', borderRadius:99 }}>
                        <div style={{ width:`${d.pct}%`, height:'100%', background:d.c, borderRadius:99 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Export formats */}
              <Card style={{ padding:18 }}>
                <div style={{ fontWeight:700, fontSize:13, marginBottom:12 }}>📤 Export Formats</div>
                {['PDF','Google Forms','Word (.docx)','Kahoot!','CSV'].map(f => (
                  <div key={f} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #E8E3DC' }}>
                    <span style={{ fontSize:13, color:'#1A1613' }}>{f}</span>
                    <button style={{ background:'none', border:'none', cursor:'pointer', color:'#C84B0C', fontSize:14, fontWeight:700 }}>↓</button>
                  </div>
                ))}
              </Card>

              {/* Question bank */}
              <Card style={{ padding:18, background:'linear-gradient(135deg,#FFF4EE,#EEF8F1)', border:'1px solid rgba(200,75,12,.15)' }}>
                <div style={{ fontWeight:700, fontSize:13, marginBottom:6 }}>🗃️ Question Bank</div>
                <div style={{ fontSize:12, color:'#6B6560', marginBottom:12 }}>Browse 2,400+ curated CBSE/ICSE questions organised by chapter and difficulty.</div>
                <Btn variant="outline" size="sm" style={{ width:'100%', justifyContent:'center' }}>Browse Question Bank →</Btn>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
