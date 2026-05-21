import { useState } from 'react'
import { AppSidebar } from '../components/AppSidebar.jsx'
import { TopNavbar }  from '../components/TopNavbar.jsx'
import { Badge, Btn, Card, Sel } from '../components/ui.jsx'

const FOLDERS = [
  { name:'AP Biology',    count:24, color:'#C84B0C', bg:'#FFE0CC' },
  { name:'Algebra II',    count:18, color:'#2A7A3B', bg:'#D0EDD8' },
  { name:'World History', count:12, color:'#2563EB', bg:'#EFF6FF' },
  { name:'English Lit',   count:15, color:'#D97706', bg:'#FEF3C7' },
  { name:'Chemistry',     count:9,  color:'#DB2777', bg:'#FCE7F3' },
  { name:'Shared with me',count:7,  color:'#6B6560', bg:'#F4F1ED' },
]

const FILES = [
  { id:'1', name:'Photosynthesis Lesson Plan',      type:'Lesson Plan',  icon:'📖', color:'#FFE0CC', fg:'#C84B0C', date:'2h ago',     size:'2.4 MB',  starred:true,  subject:'Biology'  },
  { id:'2', name:'Quadratic Equations Worksheet',   type:'Worksheet',    icon:'📄', color:'#D0EDD8', fg:'#2A7A3B', date:'5h ago',     size:'1.8 MB',  starred:true,  subject:'Maths'    },
  { id:'3', name:'Chapter 4 Quiz – Cell Division',  type:'Quiz',         icon:'❓', color:'#EFF6FF', fg:'#2563EB', date:'Yesterday',  size:'892 KB',  starred:false, subject:'Biology'  },
  { id:'4', name:'Essay Writing Rubric',            type:'Rubric',       icon:'📋', color:'#FEF3C7', fg:'#D97706', date:'Yesterday',  size:'456 KB',  starred:false, subject:'English'  },
  { id:'5', name:'Ancient Rome Presentation',       type:'Presentation', icon:'🎞️', color:'#FCE7F3', fg:'#DB2777', date:'2 days ago', size:'8.2 MB',  starred:false, subject:'History'  },
  { id:'6', name:'Lab Safety Guidelines',           type:'Document',     icon:'📁', color:'#F4F1ED', fg:'#6B6560', date:'3 days ago', size:'1.1 MB',  starred:false, subject:'Chemistry'},
  { id:'7', name:'Periodic Table Reference',        type:'Image',        icon:'🖼️', color:'#EFF6FF', fg:'#2563EB', date:'4 days ago', size:'3.6 MB',  starred:true,  subject:'Chemistry'},
  { id:'8', name:'Mitosis Animation',               type:'Video',        icon:'🎬', color:'#FFE0CC', fg:'#C84B0C', date:'5 days ago', size:'24.8 MB', starred:false, subject:'Biology'  },
  { id:'9', name:'Mughal Empire Lesson Plan',       type:'Lesson Plan',  icon:'📖', color:'#FFE0CC', fg:'#C84B0C', date:'1 week ago', size:'1.9 MB',  starred:false, subject:'History'  },
]

const FILTER_TYPES = ['All Types','Lesson Plans','Worksheets','Quizzes','Rubrics','Presentations','Documents']

export default function ResourceLibraryPage() {
  const [activeFolder, setActiveFolder] = useState('AP Biology')
  const [viewMode,     setViewMode]     = useState('grid')
  const [filterType,   setFilterType]   = useState('All Types')
  const [sortBy,       setSortBy]       = useState('Most Recent')
  const [search,       setSearch]       = useState('')
  const [openMenu,     setOpenMenu]     = useState(null)

  const filtered = FILES.filter(f =>
    (filterType === 'All Types' || f.type.includes(filterType.slice(0,-1))) &&
    f.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#FAF9F7', fontFamily:"'Inter',sans-serif" }}>
      <AppSidebar />
      <div style={{ flex:1, overflow:'auto', display:'flex', flexDirection:'column' }}>
        <TopNavbar />
        <div style={{ maxWidth:1320, margin:'0 auto', padding:24, width:'100%' }}>

          {/* Header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:22 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:40, height:40, borderRadius:14, background:'#FEF3C7', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>📁</div>
              <div>
                <h1 style={{ fontSize:20, fontWeight:800, color:'#1A1613', margin:0 }}>Resource Library</h1>
                <p style={{ fontSize:12, color:'#6B6560', margin:0 }}>Manage all your teaching resources in one place</p>
              </div>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <Btn variant="outline" size="sm">📂 New Folder</Btn>
              <Btn size="sm">↑ Upload</Btn>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap:20 }}>

            {/* ── Folder sidebar ── */}
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <Card style={{ padding:16 }}>
                <div style={{ fontWeight:700, fontSize:13, marginBottom:12 }}>📁 Folders</div>
                {FOLDERS.map(f => (
                  <div key={f.name} onClick={() => setActiveFolder(f.name)}
                    style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:12, cursor:'pointer', marginBottom:2, background: activeFolder===f.name ? f.bg : 'transparent', transition:'background .12s' }}>
                    <div style={{ width:30, height:30, borderRadius:8, background:f.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>📁</div>
                    <span style={{ flex:1, fontSize:13, fontWeight:500, color: activeFolder===f.name ? f.color : '#1A1613', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.name}</span>
                    <span style={{ fontSize:11, color:'#6B6560' }}>{f.count}</span>
                  </div>
                ))}
                <div style={{ borderTop:'1px solid #E8E3DC', marginTop:10, paddingTop:10 }}>
                  <button style={{ width:'100%', border:'1px dashed #E8E3DC', borderRadius:10, padding:'8px', fontSize:12, color:'#6B6560', cursor:'pointer', background:'none' }}>+ New Folder</button>
                </div>
              </Card>

              {/* Recent */}
              <Card style={{ padding:16 }}>
                <div style={{ fontWeight:700, fontSize:13, marginBottom:10 }}>🕐 Recent</div>
                {FILES.slice(0,3).map(r => (
                  <div key={r.id} style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 0', borderBottom:'1px solid #E8E3DC' }}>
                    <span style={{ fontSize:14 }}>{r.icon}</span>
                    <div style={{ minWidth:0, flex:1 }}>
                      <div style={{ fontSize:11, fontWeight:600, color:'#1A1613', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.name}</div>
                      <div style={{ fontSize:10, color:'#6B6560' }}>{r.type} · {r.date}</div>
                    </div>
                  </div>
                ))}
              </Card>

              {/* Drop zone */}
              <div style={{ border:'2px dashed #E8E3DC', borderRadius:14, padding:'20px 16px', textAlign:'center' }}>
                <div style={{ fontSize:28, marginBottom:6 }}>📤</div>
                <div style={{ fontSize:12, fontWeight:600, color:'#1A1613', marginBottom:3 }}>Drop files here</div>
                <div style={{ fontSize:11, color:'#6B6560' }}>PDF, DOCX, PPTX up to 50 MB</div>
              </div>
            </div>

            {/* ── Main content ── */}
            <div>
              {/* Toolbar */}
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                <div style={{ flex:1, display:'flex', alignItems:'center', gap:8, border:'1px solid #E8E3DC', borderRadius:12, padding:'7px 12px', background:'#fff' }}>
                  <span style={{ color:'#6B6560' }}>🔍</span>
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources…"
                    style={{ border:'none', outline:'none', fontSize:13, background:'transparent', fontFamily:"'Inter',sans-serif", flex:1, color:'#1A1613' }} />
                </div>
                <Sel value={filterType} onChange={setFilterType} options={FILTER_TYPES} style={{ width:140 }} />
                <Sel value={sortBy} onChange={setSortBy} options={['Most Recent','Name A–Z','File Size','Type']} style={{ width:140 }} />
                {/* View toggle */}
                <div style={{ display:'flex', border:'1px solid #E8E3DC', borderRadius:10, overflow:'hidden' }}>
                  <button onClick={() => setViewMode('grid')}
                    style={{ padding:'7px 11px', cursor:'pointer', background: viewMode==='grid' ? '#FFF4EE' : '#fff', color: viewMode==='grid' ? '#C84B0C' : '#6B6560', border:'none', fontSize:16 }}>⊞</button>
                  <button onClick={() => setViewMode('list')}
                    style={{ padding:'7px 11px', cursor:'pointer', background: viewMode==='list' ? '#FFF4EE' : '#fff', color: viewMode==='list' ? '#C84B0C' : '#6B6560', border:'none', fontSize:16 }}>☰</button>
                </div>
              </div>

              {/* ── Grid view ── */}
              {viewMode === 'grid' && (
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
                  {filtered.map(f => (
                    <Card key={f.id} style={{ padding:16, cursor:'pointer', position:'relative' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                        <div style={{ width:40, height:40, borderRadius:12, background:f.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{f.icon}</div>
                        <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                          {f.starred && <span style={{ color:'#D97706', fontSize:14 }}>⭐</span>}
                          {/* More menu */}
                          <div style={{ position:'relative' }}>
                            <button onClick={() => setOpenMenu(openMenu===f.id ? null : f.id)}
                              style={{ background:'none', border:'none', cursor:'pointer', fontSize:18, color:'#6B6560', padding:'2px 4px' }}>⋯</button>
                            {openMenu === f.id && (
                              <div style={{ position:'absolute', right:0, top:26, width:150, background:'#fff', border:'1px solid #E8E3DC', borderRadius:12, boxShadow:'0 4px 16px rgba(0,0,0,.1)', zIndex:50, padding:6 }}>
                                {['↓ Download','↗ Share','⭐ Star','✏ Rename','🗑 Delete'].map(a => (
                                  <div key={a} onClick={() => setOpenMenu(null)}
                                    style={{ padding:'7px 10px', borderRadius:8, cursor:'pointer', fontSize:12, color: a.includes('Delete') ? '#C0392B' : '#1A1613', fontWeight:500 }}>{a}</div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <Badge color={f.fg} bg={f.color} style={{ marginBottom:8 }}>{f.type}</Badge>
                      <div style={{ fontWeight:700, fontSize:13, color:'#1A1613', marginBottom:4, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.name}</div>
                      <div style={{ fontSize:11, color:'#6B6560', marginBottom:12 }}>{f.date} · {f.size} · {f.subject}</div>
                      <div style={{ display:'flex', gap:8 }}>
                        <Btn variant="outline" size="sm" style={{ flex:1, justifyContent:'center', fontSize:11 }}>↗ Share</Btn>
                        <Btn size="sm" style={{ flex:1, justifyContent:'center', fontSize:11 }}>↓ Download</Btn>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* ── List view ── */}
              {viewMode === 'list' && (
                <Card style={{ padding:0, overflow:'hidden' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr 130px', padding:'10px 16px', borderBottom:'2px solid #E8E3DC', background:'#F4F1ED' }}>
                    {['NAME','TYPE','SUBJECT','DATE','SIZE','ACTIONS'].map(h => (
                      <div key={h} style={{ fontSize:10, fontWeight:700, color:'#6B6560', letterSpacing:0.5 }}>{h}</div>
                    ))}
                  </div>
                  {filtered.map((f, idx) => (
                    <div key={f.id} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr 130px', padding:'11px 16px', borderBottom:'1px solid #E8E3DC', alignItems:'center', background: idx%2===0 ? '#fff' : '#FAF9F7' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:34, height:34, borderRadius:10, background:f.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, flexShrink:0 }}>{f.icon}</div>
                        <div style={{ minWidth:0 }}>
                          <div style={{ fontSize:13, fontWeight:600, color:'#1A1613', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.name}</div>
                          {f.starred && <span style={{ fontSize:10, color:'#D97706' }}>⭐ Starred</span>}
                        </div>
                      </div>
                      <Badge color={f.fg} bg={f.color} style={{ fontSize:9 }}>{f.type}</Badge>
                      <div style={{ fontSize:12, color:'#6B6560' }}>{f.subject}</div>
                      <div style={{ fontSize:12, color:'#6B6560' }}>{f.date}</div>
                      <div style={{ fontSize:12, color:'#6B6560' }}>{f.size}</div>
                      <div style={{ display:'flex', gap:6 }}>
                        <button style={{ background:'#F4F1ED', border:'1px solid #E8E3DC', borderRadius:8, padding:'5px 9px', cursor:'pointer', fontSize:12 }}>↗</button>
                        <button style={{ background:'#FFF4EE', border:'1px solid rgba(200,75,12,.2)', borderRadius:8, padding:'5px 9px', cursor:'pointer', fontSize:12 }}>↓</button>
                        <button onClick={() => setOpenMenu(openMenu===f.id?null:f.id)}
                          style={{ background:'#F4F1ED', border:'1px solid #E8E3DC', borderRadius:8, padding:'5px 9px', cursor:'pointer', fontSize:12 }}>⋯</button>
                      </div>
                    </div>
                  ))}
                </Card>
              )}

              {/* Footer */}
              <div style={{ textAlign:'center', marginTop:20, fontSize:12, color:'#6B6560' }}>
                Showing {filtered.length} of {FILES.length} resources
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
