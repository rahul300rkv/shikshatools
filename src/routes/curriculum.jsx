import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppSidebar } from '../components/AppSidebar.jsx'
import { TopNavbar }  from '../components/TopNavbar.jsx'
import { Badge, Btn, Card, Sel } from '../components/ui.jsx'

const CHAPTERS = {
  Mathematics: [
    { num:1, name:'Real Numbers',          topics:["Euclid's Division Lemma","Rational numbers revisited"],            icon:'📊', trending:false },
    { num:2, name:'Polynomials',           topics:['Division algorithm','Geometrical meaning of zeroes'],              icon:'📐', trending:false },
    { num:3, name:'Triangles',             topics:['AAA & SSS Similarity','Pythagoras Theorem Proof'],                 icon:'📐', trending:true  },
    { num:4, name:'Coordinate Geometry',   topics:['Section Formula','Area of a Triangle'],                           icon:'📏', trending:false },
    { num:5, name:'Trigonometry',          topics:['Trigonometric Identities','Heights and Distances'],                icon:'📐', trending:false },
    { num:6, name:'Statistics',            topics:['Measures of central tendency','Probability basics'],               icon:'📊', trending:false },
  ],
  Science: [
    { num:1, name:'Chemical Reactions',    topics:['Types of reactions','Oxidation & Reduction'],                     icon:'🧪', trending:false },
    { num:2, name:'Acids, Bases & Salts',  topics:['pH scale','Neutralisation reactions'],                            icon:'⚗️', trending:true  },
    { num:3, name:'Metals & Non-Metals',   topics:['Reactivity series','Extraction of metals'],                       icon:'🔩', trending:false },
    { num:4, name:'Life Processes',        topics:['Nutrition & Respiration','Photosynthesis'],                       icon:'🌿', trending:false },
    { num:5, name:'Light – Reflection',    topics:['Laws of reflection','Spherical mirrors'],                         icon:'💡', trending:false },
    { num:6, name:'Electricity',           topics:["Ohm's Law","Kirchhoff's Laws"],                                   icon:'⚡', trending:false },
  ],
  'Social Studies': [
    { num:1, name:'The Rise of Nationalism',topics:['French Revolution','Indian Nationalism'],                        icon:'🌏', trending:false },
    { num:2, name:'Mughal Empire',          topics:['Akbar to Aurangzeb','Administration'],                          icon:'🕌', trending:true  },
    { num:3, name:'Resources & Development',topics:['Types of resources','Land use'],                                icon:'🌱', trending:false },
    { num:4, name:'Democratic Politics',    topics:['Federalism','Political parties'],                                icon:'🗳️', trending:false },
    { num:5, name:'Money & Credit',         topics:['Formal & informal credit','Banking'],                            icon:'💰', trending:false },
    { num:6, name:'Globalisation',          topics:['MNCs','Fair globalisation'],                                    icon:'🌐', trending:false },
  ],
  English: [
    { num:1, name:'The Hundred Dresses',   topics:['Character analysis','Themes of belonging'],                      icon:'📖', trending:false },
    { num:2, name:'The Hack Driver',       topics:['Humour & irony','Character sketch'],                            icon:'📖', trending:false },
    { num:3, name:'Letter Writing',        topics:['Formal letters','Complaint & request'],                         icon:'✉️', trending:true  },
    { num:4, name:'Grammar – Tenses',     topics:['Perfect tenses','Reported speech'],                              icon:'📝', trending:false },
    { num:5, name:'Essay Writing',         topics:['Argumentative essays','Descriptive writing'],                   icon:'📝', trending:false },
    { num:6, name:'Poetry Analysis',       topics:['Figures of speech','Poem appreciation'],                        icon:'📜', trending:false },
  ],
  Hindi: [
    { num:1, name:'सूरदास के पद',           topics:['भक्ति भावना','काव्य सौन्दर्य'],                                   icon:'📜', trending:false },
    { num:2, name:'तुलसीदास',              topics:['रामभक्ति','अवधी भाषा'],                                          icon:'📜', trending:false },
    { num:3, name:'देव',                    topics:['रीतिकाल','श्रृंगार रस'],                                          icon:'📜', trending:true  },
    { num:4, name:'निबंध लेखन',            topics:['वर्णनात्मक निबंध','विचारात्मक निबंध'],                            icon:'📝', trending:false },
    { num:5, name:'पत्र लेखन',             topics:['औपचारिक पत्र','अनौपचारिक पत्र'],                                  icon:'✉️', trending:false },
    { num:6, name:'अपठित गद्यांश',          topics:['बोध प्रश्न','भाषा कार्य'],                                        icon:'📖', trending:false },
  ],
}

const BOARD_COLORS = { CBSE:'#C84B0C', ICSE:'#2563EB', ISC:'#2A7A3B', 'State Board':'#D97706' }
const SUBJECT_COLORS = {
  Mathematics:   { color:'#C84B0C', bg:'#FFE0CC' },
  Science:       { color:'#2A7A3B', bg:'#D0EDD8' },
  'Social Studies':{ color:'#2563EB', bg:'#EFF6FF' },
  English:       { color:'#D97706', bg:'#FEF3C7' },
  Hindi:         { color:'#DB2777', bg:'#FCE7F3' },
}

export default function CurriculumPage() {
  const navigate = useNavigate()
  const [board,   setBoard]   = useState('CBSE')
  const [grade,   setGrade]   = useState('Grade 10')
  const [subject, setSubject] = useState('Mathematics')
  const [search,  setSearch]  = useState('')

  const chapters = CHAPTERS[subject] || []
  const filtered = chapters.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.topics.some(t => t.toLowerCase().includes(search.toLowerCase()))
  )

  const sc = SUBJECT_COLORS[subject] || SUBJECT_COLORS.Mathematics

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#FAF9F7', fontFamily:"'Inter',sans-serif" }}>
      <AppSidebar />
      <div style={{ flex:1, overflow:'auto', display:'flex', flexDirection:'column' }}>
        {/* Custom top bar with search centred */}
        <header style={{ position:'sticky', top:0, zIndex:100, display:'flex', alignItems:'center', justifyContent:'space-between', height:64, padding:'0 24px', background:'rgba(255,255,255,.88)', backdropFilter:'blur(14px)', borderBottom:'1px solid #E8E3DC', gap:16 }}>
          <div style={{ fontWeight:700, fontSize:14, color:'#1A1613', flexShrink:0 }}>Shiksha Tools</div>
          <div style={{ flex:1, maxWidth:480, display:'flex', alignItems:'center', gap:8, border:'1px solid #E8E3DC', borderRadius:20, padding:'7px 16px', background:'#F4F1ED' }}>
            <span style={{ fontSize:14, color:'#6B6560' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search syllabus topics, chapters, concepts..."
              style={{ border:'none', outline:'none', fontSize:13, flex:1, background:'transparent', fontFamily:"'Inter',sans-serif", color:'#1A1613' }} />
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
            <span style={{ fontSize:18, cursor:'pointer' }}>🔔</span>
            <span style={{ fontSize:18, cursor:'pointer' }}>❓</span>
            <div style={{ width:32, height:32, borderRadius:'50%', background:'#C84B0C', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:'#fff', cursor:'pointer' }}>PS</div>
          </div>
        </header>

        <div style={{ maxWidth:1320, margin:'0 auto', padding:24, width:'100%' }}>
          {/* Page header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:22 }}>
            <div>
              <h1 style={{ fontSize:22, fontWeight:800, color:'#1A1613', margin:'0 0 4px' }}>Curriculum Explorer</h1>
              <p style={{ fontSize:13, color:'#6B6560', margin:0 }}>Browse official Indian board syllabi and instantly generate classroom materials with AI precision.</p>
            </div>
            <Badge color="#2A7A3B" bg="#D0EDD8" style={{ fontSize:11, padding:'5px 14px' }}>✓ Official Syllabus 2024-25</Badge>
          </div>

          {/* Filters card */}
          <Card style={{ marginBottom:22, display:'flex', alignItems:'flex-end', gap:24, flexWrap:'wrap', padding:18 }}>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:'#C84B0C', marginBottom:6, textTransform:'uppercase', letterSpacing:0.5 }}>Education Board</div>
              <div style={{ display:'flex', gap:8 }}>
                {['CBSE','ICSE','ISC','State Board'].map(b => (
                  <button key={b} onClick={() => setBoard(b)}
                    style={{
                      border:`1.5px solid ${board===b ? BOARD_COLORS[b] : '#E8E3DC'}`,
                      borderRadius:10, padding:'7px 14px', fontSize:12, fontWeight:600,
                      background: board===b ? `${BOARD_COLORS[b]}15` : '#fff',
                      color: board===b ? BOARD_COLORS[b] : '#6B6560', cursor:'pointer',
                      transition:'all .15s',
                    }}>{b}</button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize:11, fontWeight:700, color:'#C84B0C', marginBottom:6, textTransform:'uppercase', letterSpacing:0.5 }}>Grade / Class</div>
              <Sel value={grade} onChange={setGrade}
                options={['Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12']}
                style={{ width:150 }} />
            </div>

            <div>
              <div style={{ fontSize:11, fontWeight:700, color:'#C84B0C', marginBottom:6, textTransform:'uppercase', letterSpacing:0.5 }}>Subject Filter</div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {Object.keys(SUBJECT_COLORS).map(s => (
                  <button key={s} onClick={() => setSubject(s)}
                    style={{
                      border:`1.5px solid ${subject===s ? SUBJECT_COLORS[s].color : '#E8E3DC'}`,
                      borderRadius:20, padding:'6px 14px', fontSize:12, fontWeight:600,
                      background: subject===s ? SUBJECT_COLORS[s].bg : '#fff',
                      color: subject===s ? SUBJECT_COLORS[s].color : '#6B6560',
                      cursor:'pointer', transition:'all .15s',
                    }}>{s}</button>
                ))}
              </div>
            </div>
          </Card>

          {/* Results header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <div style={{ fontWeight:700, fontSize:15, color:'#1A1613' }}>
              {subject}: {grade} Chapters
            </div>
            <div style={{ fontSize:13, color:'#6B6560' }}>{filtered.length} Topics Found</div>
          </div>

          {/* Chapter cards grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:28 }}>
            {filtered.map((ch, i) => (
              <Card key={ch.name} style={{
                borderTop:`3px solid ${i%2===0 ? sc.color : '#2A7A3B'}`,
                position:'relative', padding:18,
              }}>
                {ch.trending && (
                  <span style={{
                    position:'absolute', top:10, right:10,
                    fontSize:10, fontWeight:700, color:'#FF9800',
                    background:'#FFF3E0', padding:'2px 8px', borderRadius:10,
                  }}>🔥 TRENDING</span>
                )}

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                  <div style={{
                    width:36, height:36, borderRadius:10,
                    background: i%2===0 ? sc.bg : '#D0EDD8',
                    display:'flex', alignItems:'center', justifyContent:'center', fontSize:18,
                  }}>{ch.icon}</div>
                  <Badge variant="muted" style={{ fontSize:9 }}>UNIT {ch.num}</Badge>
                </div>

                <div style={{ fontWeight:700, fontSize:14, color:'#1A1613', marginBottom:8 }}>{ch.name}</div>

                {ch.topics.map(t => (
                  <div key={t} style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#6B6560', marginBottom:4 }}>
                    <span style={{ color:'#2A7A3B', flexShrink:0 }}>✓</span>{t}
                  </div>
                ))}

                <div style={{ display:'flex', gap:8, marginTop:14 }}>
                  <Btn variant="outline" size="sm"
                    style={{ flex:1, justifyContent:'center', fontSize:11 }}
                    onClick={() => navigate('/worksheet')}>
                    📄 Worksheet
                  </Btn>
                  <Btn variant="secondary" size="sm"
                    style={{ flex:1, justifyContent:'center', fontSize:11 }}
                    onClick={() => navigate('/quiz')}>
                    ❓ Quiz
                  </Btn>
                  <Btn size="sm"
                    style={{ flex:1, justifyContent:'center', fontSize:11 }}
                    onClick={() => navigate('/lesson')}>
                    📖 Lesson
                  </Btn>
                </div>
              </Card>
            ))}

            {filtered.length === 0 && (
              <div style={{ gridColumn:'1/-1', padding:'48px 0', textAlign:'center', color:'#6B6560' }}>
                <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
                <div style={{ fontSize:14, fontWeight:600 }}>No chapters found for "{search}"</div>
                <div style={{ fontSize:12, marginTop:4 }}>Try a different search term or subject</div>
              </div>
            )}
          </div>

          {/* Custom curriculum CTA */}
          <Card style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            background:'linear-gradient(135deg,#FAF9F7,#F4F1ED)',
            border:'1.5px dashed #E8E3DC', padding:24,
          }}>
            <div style={{ maxWidth:500 }}>
              <div style={{ fontWeight:800, fontSize:16, color:'#1A1613', marginBottom:8 }}>Need a custom curriculum?</div>
              <div style={{ fontSize:13, color:'#6B6560', lineHeight:1.7 }}>
                Our AI can ingest your school's private syllabus documents to create customised learning paths for your specific academic year goals. Upload your syllabus PDF and we'll map it automatically.
              </div>
              <Btn style={{ marginTop:14, background:'#2A7A3B' }}>📄 Upload Your Syllabus</Btn>
            </div>
            <div style={{ fontSize:72, opacity:0.6 }}>📚</div>
          </Card>
        </div>
      </div>
    </div>
  )
}
