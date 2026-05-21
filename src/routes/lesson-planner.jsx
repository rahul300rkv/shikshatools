import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppSidebar } from '../components/AppSidebar.jsx'
import { TopNavbar }  from '../components/TopNavbar.jsx'
import { Badge, Btn, Card, Toggle, Sel, Inp, Label, Sep, AccordionItem, BloomChip, FormSection } from '../components/ui.jsx'

const BLOOM_LEVELS = [
  { id:'remember',   label:'Remember',   color:'#DB2777', bg:'#FCE7F3' },
  { id:'understand', label:'Understand', color:'#2563EB', bg:'#EFF6FF' },
  { id:'apply',      label:'Apply',      color:'#C84B0C', bg:'#FFE0CC' },
  { id:'analyze',    label:'Analyze',    color:'#D97706', bg:'#FEF3C7' },
  { id:'evaluate',   label:'Evaluate',   color:'#DB2777', bg:'#FCE7F3' },
  { id:'create',     label:'Create',     color:'#2A7A3B', bg:'#D0EDD8' },
]

const LESSON_MODELS = ['5E Instructional Model','Direct Instruction','Inquiry-Based Learning','Flipped Classroom','Project-Based Learning']

const SECTIONS_DATA = [
  { id:'objectives', icon:'🎯', title:'Learning Objectives', items:[
    'Students will explain the process of photosynthesis and identify its reactants and products.',
    'Students will compare and contrast light-dependent and light-independent reactions.',
    'Students will analyze factors that affect the rate of photosynthesis.',
  ]},
  { id:'engage', icon:'💡', title:'Engage (10 min)',
    content:'Show a time-lapse video of a plant growing toward light. Ask: "What does this plant need to survive that it cannot get from the soil?" Lead into a brief think-pair-share discussion. Essential question: How do plants convert sunlight into food?'
  },
  { id:'explore', icon:'🔭', title:'Explore (15 min)',
    content:'Students work in groups of 3–4 to complete a virtual lab simulation on photosynthesis. They manipulate variables (light intensity, CO₂ concentration, temperature) and observe effects on oxygen production. Each group records observations in their lab notebooks.'
  },
  { id:'explain', icon:'🎓', title:'Explain (12 min)',
    content:'Direct instruction using annotated diagrams of the chloroplast. Walk through light-dependent reactions (thylakoid membrane) and the Calvin Cycle (stroma). Use an interactive whiteboard to build the photosynthesis equation step by step. Students take Cornell notes.'
  },
  { id:'elaborate', icon:'👥', title:'Elaborate (10 min)',
    content:'Students apply understanding by designing a simple experiment to test one factor affecting photosynthesis rate. Groups create a hypothesis, identify variables, and outline their experimental procedure on poster paper.'
  },
  { id:'evaluate', icon:'✅', title:'Evaluate (8 min)',
    content:'Exit ticket: Students complete a 5-question formative assessment including one diagram labeling task, two MCQs, and two short-answer questions. Results inform next day's differentiation groups.'
  },
]

export default function LessonPlannerPage() {
  const navigate = useNavigate()
  const [subject,   setSubject]   = useState('Science')
  const [grade,     setGrade]     = useState('Class 8')
  const [board,     setBoard]     = useState('CBSE')
  const [topic,     setTopic]     = useState('Photosynthesis')
  const [model,     setModel]     = useState('5E Instructional Model')
  const [duration,  setDuration]  = useState('55 min')
  const [blooms,    setBlooms]    = useState(['understand','apply','analyze'])
  const [objectives,setObjectives]= useState('')
  const [incDiff,   setIncDiff]   = useState(false)
  const [incHindi,  setIncHindi]  = useState(false)

  const toggleBloom = id => setBlooms(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id])

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#FAF9F7', fontFamily:"'Inter',sans-serif" }}>
      <AppSidebar />
      <div style={{ flex:1, overflow:'auto', display:'flex', flexDirection:'column' }}>
        <TopNavbar />
        <div style={{ maxWidth:1320, margin:'0 auto', padding:24, width:'100%' }}>
          {/* Header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:40, height:40, borderRadius:14, background:'#FFE0CC', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>📖</div>
              <div>
                <h1 style={{ fontSize:20, fontWeight:800, color:'#1A1613', margin:0 }}>Lesson Planner</h1>
                <p style={{ fontSize:12, color:'#6B6560', margin:0 }}>Design standards-aligned lesson plans with AI</p>
              </div>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <Btn variant="outline" size="sm">↗ Share</Btn>
              <Btn variant="outline" size="sm">🖨️ Print</Btn>
              <Btn size="sm">⬇ Export PDF</Btn>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'2fr 3fr', gap:24 }}>
            {/* ── Left config ── */}
            <div>
              <FormSection num="1" title="Lesson Details">
                <div style={{ marginBottom:12 }}><Label>Topic</Label><Inp value={topic} onChange={setTopic} placeholder="e.g. Photosynthesis, Mughal Empire, Quadratic Equations" /></div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
                  <div><Label>Subject</Label><Sel value={subject} onChange={setSubject} options={['Science','Mathematics','Social Studies','English','Hindi','Physics','Chemistry','Biology']} /></div>
                  <div><Label>Class / Grade</Label><Sel value={grade} onChange={setGrade} options={['Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12']} /></div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  <div><Label>Board</Label><Sel value={board} onChange={setBoard} options={['CBSE','ICSE','ISC','State Board']} /></div>
                  <div><Label>Lesson Model</Label><Sel value={model} onChange={setModel} options={LESSON_MODELS} /></div>
                </div>
              </FormSection>

              {/* Duration */}
              <FormSection num="2" title="Duration">
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {['30 min','45 min','55 min','90 min','Custom'].map(d => (
                    <button key={d} onClick={() => setDuration(d)}
                      style={{
                        border:`1px solid ${duration===d?'#C84B0C':'#E8E3DC'}`, borderRadius:14,
                        padding:'6px 14px', fontSize:12, fontWeight:600,
                        background: duration===d ? '#FFF4EE' : '#fff',
                        color: duration===d ? '#C84B0C' : '#6B6560', cursor:'pointer',
                      }}>{d}</button>
                  ))}
                </div>
              </FormSection>

              {/* Bloom's */}
              <FormSection num="3" title="Bloom's Taxonomy Levels">
                <p style={{ fontSize:12, color:'#6B6560', marginBottom:10 }}>Select the cognitive levels this lesson targets.</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {BLOOM_LEVELS.map(b => (
                    <BloomChip key={b.id} label={b.label} color={b.color} bg={b.bg}
                      selected={blooms.includes(b.id)} onToggle={() => toggleBloom(b.id)} />
                  ))}
                </div>
              </FormSection>

              {/* Options */}
              <FormSection num="4" title="Additional Options">
                {[
                  { l:'Include differentiation strategies', v:incDiff, set:setIncDiff },
                  { l:'Generate Hindi bilingual version',   v:incHindi, set:setIncHindi },
                ].map(sw => (
                  <div key={sw.l} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                    <span style={{ fontSize:13, color:'#1A1613' }}>{sw.l}</span>
                    <Toggle on={sw.v} set={sw.set} />
                  </div>
                ))}
                <div style={{ marginTop:4 }}>
                  <Label>Custom Objectives (optional)</Label>
                  <Inp value={objectives} onChange={setObjectives} placeholder="Add custom learning objectives or leave blank for AI-generated ones..." rows={3} />
                </div>
              </FormSection>

              <Btn style={{ width:'100%', justifyContent:'center', padding:'13px', fontSize:15 }}>✨ Generate Lesson Plan</Btn>
            </div>

            {/* ── Right: Generated output ── */}
            <div>
              <Card style={{ padding:0, overflow:'hidden', position:'sticky', top:80 }}>
                {/* Output header */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px', borderBottom:'1px solid #E8E3DC' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ color:'#C84B0C' }}>📖</span>
                    <span style={{ fontWeight:700, fontSize:13 }}>Lesson Plan Output</span>
                    <Badge variant="secondary" style={{ fontSize:9 }}>5E Model</Badge>
                    <Badge color="#2A7A3B" bg="#D0EDD8" style={{ fontSize:9 }}>AI Generated</Badge>
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    <Btn variant="ghost" size="sm" style={{ fontSize:11 }}>📋 Copy</Btn>
                    <Btn variant="outline" size="sm" style={{ fontSize:11 }}>⬇ DOCX</Btn>
                    <Btn size="sm" style={{ fontSize:11 }}>⬇ PDF</Btn>
                  </div>
                </div>

                {/* Meta row */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:10, padding:'12px 18px', borderBottom:'1px solid #E8E3DC' }}>
                  {[
                    { v:'Class 8', l:'CBSE Science' },
                    { v:'55 min',  l:'Duration'     },
                    { v:'5E',      l:'Model'        },
                    { v:'Medium',  l:'Difficulty'   },
                  ].map(m => (
                    <div key={m.l} style={{ background:'#F4F1ED', borderRadius:10, padding:'8px 10px', textAlign:'center' }}>
                      <div style={{ fontSize:15, fontWeight:800, color:'#1A1613' }}>{m.v}</div>
                      <div style={{ fontSize:10, color:'#6B6560' }}>{m.l}</div>
                    </div>
                  ))}
                </div>

                {/* Accordion sections */}
                <div style={{ padding:'14px 18px', maxHeight:480, overflowY:'auto' }}>
                  {SECTIONS_DATA.map((s, i) => (
                    <AccordionItem key={s.id} icon={s.icon} title={s.title} defaultOpen={i < 3}
                      accentColor="#C84B0C" accentBg="#FFF4EE">
                      {s.items
                        ? <ul style={{ margin:0, paddingLeft:0, listStyle:'none' }}>
                            {s.items.map((item, j) => (
                              <li key={j} style={{ display:'flex', alignItems:'flex-start', gap:8, fontSize:13, color:'#6B6560', lineHeight:1.7, marginBottom:6 }}>
                                <span style={{ color:'#2A7A3B', flexShrink:0, marginTop:2 }}>✓</span>{item}
                              </li>
                            ))}
                          </ul>
                        : <p style={{ fontSize:13, color:'#6B6560', lineHeight:1.8, margin:0 }}>{s.content}</p>
                      }
                      <div style={{ display:'flex', gap:12, marginTop:10 }}>
                        {['📋 Copy','↻ Regenerate','🗑 Remove'].map(a => (
                          <button key={a} style={{ fontSize:11, color:'#6B6560', background:'none', border:'none', cursor:'pointer' }}>{a}</button>
                        ))}
                      </div>
                    </AccordionItem>
                  ))}
                </div>

                {/* Export bar */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', border:'1px solid rgba(200,75,12,.15)', background:'#FFF4EE', borderRadius:14, padding:14, margin:'0 18px 18px' }}>
                  <div>
                    <div style={{ fontWeight:700, fontSize:13, color:'#1A1613' }}>Ready to use</div>
                    <div style={{ fontSize:11, color:'#6B6560' }}>Export in multiple formats</div>
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    <Btn variant="outline" size="sm">⬇ DOCX</Btn>
                    <Btn variant="outline" size="sm">⬇ PDF</Btn>
                    <Btn size="sm">⬇ Google Docs</Btn>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
