import { useState } from 'react'
import { AppSidebar } from '../components/AppSidebar.jsx'
import { TopNavbar }  from '../components/TopNavbar.jsx'
import { Badge, Btn, Card, Toggle, Sel, Inp, Label, FormSection } from '../components/ui.jsx'

const QUESTION_TYPES = [
  { id:'mcq',    icon:'☰', label:'Multiple Choice' },
  { id:'short',  icon:'—', label:'Short Answer'    },
  { id:'tf',     icon:'⇄', label:'True / False'    },
  { id:'fill',   icon:'✏', label:'Fill in Blank'   },
  { id:'match',  icon:'⟺', label:'Matching'        },
  { id:'num',    icon:'#', label:'Numerical'       },
]

const PREVIEW_SECTIONS = [
  {
    title: 'Part A: Multiple Choice (10 points)',
    qs: [
      {
        n: 1,
        q: 'Which organelle is the primary site of photosynthesis in plant cells?',
        opts: ['A) Mitochondria', 'B) Chloroplast ✓', 'C) Nucleus', 'D) Ribosome'],
        answerIdx: 1,
      },
      {
        n: 2,
        q: 'What is the net equation for photosynthesis?',
        opts: [
          'A) 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ ✓',
          'B) C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O',
          'C) 6O₂ → 6CO₂ + 6H₂O',
          'D) None of the above',
        ],
        answerIdx: 0,
      },
    ],
  },
  {
    title: 'Part B: Short Answer (15 points)',
    qs: [
      {
        n: 3,
        q: 'Explain the difference between the light-dependent and light-independent reactions. Include where each occurs within the chloroplast.',
        lines: 5,
      },
      {
        n: 4,
        q: 'Describe how the rate of photosynthesis is affected by light intensity. Sketch a graph to support your answer.',
        lines: 4,
      },
    ],
  },
]

export default function WorksheetGeneratorPage() {
  const [activeTypes, setActiveTypes] = useState(['mcq', 'short'])
  const [subject,   setSubject]   = useState('Biology')
  const [grade,     setGrade]     = useState('Grade 10')
  const [board,     setBoard]     = useState('CBSE')
  const [difficulty,setDifficulty]= useState('Medium')
  const [lang,      setLang]      = useState('English')
  const [examType,  setExamType]  = useState('Unit Test')
  const [topic,     setTopic]     = useState('Photosynthesis')
  const [teacher,   setTeacher]   = useState('Mr. Rajesh Kumar')
  const [school,    setSchool]    = useState('Kendriya Vidyalaya No. 1')
  const [incAnswers,setIncAnswers]= useState(true)
  const [hots,      setHots]      = useState(false)
  const [bilingual, setBilingual] = useState(false)

  const toggleType = id =>
    setActiveTypes(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#FAF9F7', fontFamily:"'Inter',sans-serif" }}>
      <AppSidebar />
      <div style={{ flex:1, overflow:'auto', display:'flex', flexDirection:'column' }}>
        <TopNavbar />
        <div style={{ maxWidth:1320, margin:'0 auto', padding:24, width:'100%' }}>

          {/* Page header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:40, height:40, borderRadius:14, background:'#D0EDD8', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>📄</div>
              <div>
                <h1 style={{ fontSize:20, fontWeight:800, color:'#1A1613', margin:0 }}>Worksheet Generator</h1>
                <p style={{ fontSize:12, color:'#6B6560', margin:0 }}>Create custom printable worksheets with AI</p>
              </div>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <Btn variant="outline" size="sm">👁 Preview</Btn>
              <Btn size="sm">⬇ Export PDF</Btn>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'2fr 3fr', gap:24 }}>

            {/* ── Left: Config ── */}
            <div>
              <FormSection num="1" title="Configuration">
                <div style={{ marginBottom:12 }}><Label>Subject</Label>
                  <Sel value={subject} onChange={setSubject} options={['Biology','Chemistry','Physics','Mathematics','English','Social Studies','Hindi','Economics']} />
                </div>
                <div style={{ marginBottom:12 }}><Label>Topic</Label>
                  <Inp value={topic} onChange={setTopic} placeholder="e.g. Photosynthesis, Quadratic Equations, World War II" />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
                  <div><Label>Board</Label><Sel value={board} onChange={setBoard} options={['CBSE','ICSE','ISC','State Board']} /></div>
                  <div><Label>Grade Level</Label><Sel value={grade} onChange={setGrade} options={['Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12']} /></div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  <div><Label>Difficulty</Label><Sel value={difficulty} onChange={setDifficulty} options={['Easy','Medium','Hard','HOTS']} /></div>
                  <div><Label>Language</Label><Sel value={lang} onChange={setLang} options={['English','Hindi','Bilingual (EN+HI)','Marathi','Tamil','Telugu']} /></div>
                </div>
              </FormSection>

              <FormSection num="2" title="Question Types">
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:14 }}>
                  {QUESTION_TYPES.map(t => {
                    const on = activeTypes.includes(t.id)
                    return (
                      <button key={t.id} onClick={() => toggleType(t.id)}
                        style={{
                          display:'flex', alignItems:'center', gap:8,
                          border:`1.5px solid ${on ? '#C84B0C' : '#E8E3DC'}`,
                          borderRadius:12, padding:'8px 12px', cursor:'pointer',
                          background: on ? '#FFF4EE' : '#fff', position:'relative',
                          transition:'all .15s',
                        }}>
                        {on && (
                          <div style={{ position:'absolute', top:6, right:6, width:14, height:14, background:'#C84B0C', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, color:'#fff' }}>✓</div>
                        )}
                        <span style={{ fontSize:16, color: on ? '#C84B0C' : '#6B6560' }}>{t.icon}</span>
                        <span style={{ fontSize:12, fontWeight:600, color: on ? '#1A1613' : '#6B6560' }}>{t.label}</span>
                      </button>
                    )
                  })}
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {[
                    { l:'Include Answer Key',            v:incAnswers, set:setIncAnswers },
                    { l:'Include HOTS Questions',        v:hots,       set:setHots       },
                    { l:'Bilingual (Hindi + English)',   v:bilingual,  set:setBilingual  },
                  ].map(sw => (
                    <div key={sw.l} style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <span style={{ fontSize:13, color:'#1A1613' }}>{sw.l}</span>
                      <Toggle on={sw.v} set={sw.set} />
                    </div>
                  ))}
                </div>
              </FormSection>

              <FormSection num="3" title="Exam Setup">
                <div style={{ marginBottom:10 }}>
                  <Label>Exam Type</Label>
                  <Sel value={examType} onChange={setExamType} options={['Unit Test','Half Yearly','Annual Exam','Practice','Board Prep']} />
                </div>
              </FormSection>

              <FormSection num="4" title="Personalization">
                <div style={{ marginBottom:10 }}><Label>Teacher Name</Label><Inp value={teacher} onChange={setTeacher} /></div>
                <div style={{ marginBottom:10 }}><Label>School Name</Label><Inp value={school} onChange={setSchool} /></div>
                <div>
                  <Label>Special Instructions</Label>
                  <Inp placeholder="Add any specific requirements, standards alignment, or focus areas..." rows={3} />
                </div>
              </FormSection>

              <Btn style={{ width:'100%', justifyContent:'center', padding:'13px', fontSize:15 }}>✨ Generate Worksheet</Btn>
            </div>

            {/* ── Right: Live Preview ── */}
            <div>
              <Card style={{ padding:0, overflow:'hidden', position:'sticky', top:80 }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 18px', borderBottom:'1px solid #E8E3DC' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:14, color:'#6B6560' }}>👁</span>
                    <span style={{ fontWeight:700, fontSize:13 }}>Live Preview</span>
                    <Badge variant="secondary" style={{ fontSize:9 }}>Real-time</Badge>
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    <Btn variant="outline" size="sm" style={{ fontSize:11 }}>📋 Copy</Btn>
                    <Btn size="sm" style={{ fontSize:11 }}>⬇ Export</Btn>
                  </div>
                </div>

                {/* Worksheet document preview */}
                <div style={{ padding:'20px 24px', background:'#FAFAFA', maxHeight:580, overflowY:'auto' }}>
                  {/* Document header */}
                  <div style={{ textAlign:'center', marginBottom:16, paddingBottom:14, borderBottom:'2px solid #E8E3DC' }}>
                    <div style={{ fontWeight:800, fontSize:15, color:'#1A1613' }}>Photosynthesis – Biology Worksheet</div>
                    <div style={{ fontSize:11, color:'#6B6560', marginTop:2 }}>{school} · {teacher}</div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginTop:10 }}>
                      {['Name: _______________','Date: _______________','Period: ____'].map(f => (
                        <div key={f} style={{ fontSize:11, color:'#6B6560', border:'1px solid #E8E3DC', borderRadius:6, padding:'5px 8px' }}>{f}</div>
                      ))}
                    </div>
                  </div>

                  {PREVIEW_SECTIONS.map(sec => (
                    <div key={sec.title} style={{ marginBottom:18 }}>
                      <div style={{ fontWeight:700, fontSize:13, color:'#1A1613', marginBottom:10, paddingBottom:4, borderBottom:'1px solid #E8E3DC' }}>
                        {sec.title}
                      </div>
                      {sec.qs.map(q => (
                        <div key={q.n} style={{ marginBottom:14 }}>
                          <div style={{ fontSize:13, color:'#1A1613', marginBottom:6, lineHeight:1.6 }}>
                            <strong>{q.n}.</strong> {q.q}
                          </div>
                          {q.opts ? (
                            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4, paddingLeft:12 }}>
                              {q.opts.map((o, i) => (
                                <div key={i} style={{ fontSize:12, color: o.includes('✓') ? '#2A7A3B' : '#6B6560', fontWeight: o.includes('✓') ? 700 : 400 }}>{o}</div>
                              ))}
                            </div>
                          ) : (
                            <div style={{ paddingLeft:12 }}>
                              {Array.from({ length: q.lines }).map((_, i) => (
                                <div key={i} style={{ borderBottom:'1px solid #E8E3DC', height:24, marginBottom:4 }} />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
