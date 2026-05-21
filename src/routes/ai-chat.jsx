import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppSidebar } from '../components/AppSidebar.jsx'
import { TopNavbar }  from '../components/TopNavbar.jsx'
import { Btn, Avatar } from '../components/ui.jsx'

const CONVERSATIONS = [
  { id:'1', title:'Lesson plan for mitosis',         time:'Just now'   },
  { id:'2', title:'Quiz ideas for Chapter 4',        time:'2h ago'     },
  { id:'3', title:'Differentiation strategies',      time:'Yesterday'  },
  { id:'4', title:'Essay rubric feedback',           time:'Yesterday'  },
  { id:'5', title:'Lab safety worksheet',            time:'3 days ago' },
  { id:'6', title:'PTM letter templates in Hindi',   time:'5 days ago' },
  { id:'7', title:'CBSE alignment help – Gr 9 Sci',  time:'1 week ago' },
]

const MESSAGES = [
  {
    id:'m1', role:'user',
    content:'I need help creating an engaging lesson plan for teaching mitosis to 10th grade biology students. The class is 55 minutes long.',
  },
  {
    id:'m2', role:'ai',
    content:`Here's a comprehensive 55-minute lesson plan for teaching mitosis to 10th grade biology using the **5E Instructional Model**:

**Engage (8 min)**
Show a time-lapse video of cell division under a microscope. Ask: "What do you think is happening? Why is this process important for living organisms?" Brief think-pair-share discussion.

**Explore (15 min)**
Students work in pairs with prepared microscope slides of onion root tips. They observe and sketch cells in different stages of division, guided by an observation sheet.

**Explain (12 min)**
Direct instruction on the four phases of mitosis (Prophase, Metaphase, Anaphase, Telophase). Students label their earlier sketches with correct phase names. Introduce the mnemonic: **PMAT**.

**Elaborate (12 min)**
Students create a "Mitosis Flipbook" — a small booklet showing the progression of cell division. Each page represents a phase with labeled drawings.

**Evaluate (8 min)**
Exit ticket with 3 questions: sequence the phases, identify a phase from an image, short answer on why mitosis is essential for survival.`,
  },
  {
    id:'m3', role:'user',
    content:'This is great! Can you also add some differentiation strategies for students who need extra support?',
  },
  {
    id:'m4', role:'ai',
    content:`Absolutely! Here are differentiation strategies you can layer into the lesson:

**For Students Needing Extra Support:**
- Provide a pre-filled graphic organiser with key vocabulary and partial diagrams
- Pair with a stronger student during the microscope exploration
- Offer a word bank for the exit ticket
- Use colour-coded phase labels (Prophase = red, Metaphase = blue, etc.)

**For Advanced Learners:**
- Compare and contrast mitosis with meiosis during the Elaborate phase
- Research a real-world application (cancer, wound healing, growth)
- Challenge: "What happens if mitosis goes wrong? Give a cellular-level explanation."

**For ELL / Hindi-medium Students:**
- Provide a bilingual vocabulary sheet (English + Hindi)
- Allow verbal or drawn responses on the exit ticket
- Use visual-heavy diagrams with minimal text

Would you like me to generate the actual worksheet or exit ticket for this lesson?`,
  },
]

const SUGGESTIONS = [
  { icon:'📖', text:'Create a lesson plan for Class 9 Maths – Polynomials (CBSE)' },
  { icon:'❓', text:'Generate 10 MCQs on the Mughal Empire for Class 8'           },
  { icon:'📄', text:'Make a differentiated worksheet on Acid-Base reactions'       },
  { icon:'📮', text:'Write a PTM invitation letter in Hindi and English'           },
]

function formatMsg(text) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
    part.startsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part.split('\n').map((line, j, arr) => (
          <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
        ))
  )
}

export default function AIChatPage() {
  const navigate    = useNavigate()
  const [input,     setInput]     = useState('')
  const [activeConv,setActiveConv]= useState('1')
  const [messages,  setMessages]  = useState(MESSAGES)
  const bottomRef   = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages(p => [
      ...p,
      { id:`u${Date.now()}`, role:'user', content:input },
      { id:`a${Date.now()}`, role:'ai',   content:'Generating your response… (connect to Claude API in production)' },
    ])
    setInput('')
  }

  const CONV_GROUPS = [
    { label:'TODAY',     items: CONVERSATIONS.slice(0,2) },
    { label:'YESTERDAY', items: CONVERSATIONS.slice(2,4) },
    { label:'PREVIOUS',  items: CONVERSATIONS.slice(4)   },
  ]

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#FAF9F7', fontFamily:"'Inter',sans-serif" }}>
      <AppSidebar />

      <div style={{ flex:1, display:'flex', overflow:'hidden' }}>

        {/* ── Conversation list sidebar ── */}
        <div style={{ width:260, background:'#fff', borderRight:'1px solid #E8E3DC', display:'flex', flexDirection:'column', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:14, borderBottom:'1px solid #E8E3DC' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontSize:16 }}>🤖</span>
              <span style={{ fontWeight:700, fontSize:13 }}>AI Assistant</span>
            </div>
            <button onClick={() => setMessages([])}
              style={{ background:'none', border:'none', cursor:'pointer', fontSize:20, color:'#6B6560', lineHeight:1 }}>+</button>
          </div>

          {/* Search */}
          <div style={{ padding:'10px 12px', borderBottom:'1px solid #E8E3DC' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, border:'1px solid #E8E3DC', borderRadius:12, padding:'6px 10px', background:'#F4F1ED' }}>
              <span style={{ fontSize:12, color:'#6B6560' }}>🔍</span>
              <input placeholder="Search conversations…" style={{ border:'none', outline:'none', fontSize:12, background:'transparent', fontFamily:"'Inter',sans-serif", flex:1, color:'#1A1613' }} />
            </div>
          </div>

          {/* Conversation list */}
          <div style={{ flex:1, overflowY:'auto', padding:'10px 8px' }}>
            {CONV_GROUPS.map(g => (
              <div key={g.label}>
                <div style={{ fontSize:9, fontWeight:700, color:'#6B656099', padding:'6px 10px 4px', letterSpacing:0.8 }}>{g.label}</div>
                {g.items.map(c => (
                  <div key={c.id} onClick={() => setActiveConv(c.id)}
                    style={{
                      display:'flex', alignItems:'center', gap:8,
                      padding:'9px 10px', borderRadius:12, cursor:'pointer', marginBottom:2,
                      background: activeConv === c.id ? '#FFF0E6' : 'transparent',
                      transition:'background .12s',
                    }}>
                    <span style={{ fontSize:14, color:'#6B6560', flexShrink:0 }}>💬</span>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, fontWeight: activeConv===c.id ? 700 : 500, color: activeConv===c.id ? '#C84B0C' : '#1A1613', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {c.title}
                      </div>
                      <div style={{ fontSize:10, color:'#6B6560' }}>{c.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Chat area ── */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
          <TopNavbar />

          {/* Messages */}
          <div style={{ flex:1, overflowY:'auto', padding:'28px 48px' }}>

            {/* Welcome screen */}
            {messages.length === 0 && (
              <div style={{ textAlign:'center', marginBottom:32 }}>
                <div style={{ width:52, height:52, background:'#C84B0C', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, margin:'0 auto 12px' }}>✨</div>
                <div style={{ fontSize:18, fontWeight:700, marginBottom:4 }}>Shiksha AI Assistant</div>
                <div style={{ fontSize:14, color:'#6B6560' }}>Your AI-powered teaching companion for Indian classrooms</div>
              </div>
            )}

            {/* Suggested prompts */}
            {messages.length === 0 && (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:32, maxWidth:580, margin:'0 auto 32px' }}>
                {SUGGESTIONS.map(s => (
                  <div key={s.text} onClick={() => setInput(s.text)}
                    style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', border:'1px solid #E8E3DC', borderRadius:14, cursor:'pointer', background:'#fff', transition:'all .15s' }}>
                    <span style={{ fontSize:18, flexShrink:0 }}>{s.icon}</span>
                    <span style={{ fontSize:12, color:'#1A1613', lineHeight:1.5 }}>{s.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Message bubbles */}
            {messages.map(m => (
              <div key={m.id}
                style={{ display:'flex', gap:12, marginBottom:20, flexDirection: m.role==='user' ? 'row-reverse' : 'row' }}>

                {/* Avatar */}
                <div style={{ flexShrink:0 }}>
                  {m.role === 'ai'
                    ? <div style={{ width:34, height:34, borderRadius:10, background:'#C84B0C', display:'flex', alignItems:'center', justifyContent:'center', fontSize:17 }}>✨</div>
                    : <Avatar name="Priya Sharma" size={34} color="#2A7A3B" />
                  }
                </div>

                <div style={{ maxWidth:'74%' }}>
                  <div style={{
                    background: m.role==='user' ? '#C84B0C' : '#fff',
                    color: m.role==='user' ? '#fff' : '#1A1613',
                    borderRadius: m.role==='user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                    padding:'12px 16px', fontSize:13, lineHeight:1.75,
                    border: m.role==='ai' ? '1px solid #E8E3DC' : 'none',
                  }}>
                    {formatMsg(m.content)}
                  </div>

                  {/* AI action bar */}
                  {m.role === 'ai' && (
                    <div style={{ display:'flex', gap:8, marginTop:8, alignItems:'center' }}>
                      {[
                        { icon:'👍', title:'Helpful'     },
                        { icon:'👎', title:'Not helpful' },
                        { icon:'📋', title:'Copy'        },
                        { icon:'↻',  title:'Regenerate'  },
                      ].map(a => (
                        <button key={a.title} title={a.title}
                          style={{ background:'none', border:'none', cursor:'pointer', fontSize:14, color:'#6B6560', padding:'2px 4px' }}>
                          {a.icon}
                        </button>
                      ))}
                      <div style={{ marginLeft:'auto', display:'flex', gap:6 }}>
                        <button onClick={() => navigate('/worksheet')}
                          style={{ background:'#D0EDD8', color:'#2A7A3B', border:'none', borderRadius:8, padding:'4px 10px', fontSize:11, fontWeight:700, cursor:'pointer' }}>
                          → Create Worksheet
                        </button>
                        <button style={{ background:'#FFF4EE', color:'#C84B0C', border:'none', borderRadius:8, padding:'4px 10px', fontSize:11, fontWeight:700, cursor:'pointer' }}>
                          💾 Save to Library
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div style={{ padding:'14px 24px', borderTop:'1px solid #E8E3DC', background:'#fff' }}>
            <div style={{ display:'flex', alignItems:'flex-end', gap:10, border:'1.5px solid #E8E3DC', borderRadius:14, padding:'10px 12px', background:'#fff' }}>
              <button title="Attach file"
                style={{ background:'none', border:'none', cursor:'pointer', fontSize:18, color:'#6B6560', flexShrink:0 }}>📎</button>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
                placeholder="Ask Shiksha AI anything — lesson plans, quizzes, worksheets, PTM letters, CBSE help…"
                rows={1}
                style={{ flex:1, border:'none', outline:'none', resize:'none', fontSize:13, fontFamily:"'Inter',sans-serif", color:'#1A1613', background:'transparent', lineHeight:1.6 }}
              />
              <button title="Voice input"
                style={{ background:'none', border:'none', cursor:'pointer', fontSize:18, color:'#6B6560', flexShrink:0 }}>🎤</button>
              <button onClick={sendMessage} title="Send"
                style={{ background:'#C84B0C', border:'none', cursor:'pointer', borderRadius:10, width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, color:'#fff', flexShrink:0 }}>→</button>
            </div>
            <div style={{ fontSize:10, color:'#6B6560', marginTop:7, textAlign:'center' }}>
              Shiksha AI can make mistakes. Always review generated content before sharing with students.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
