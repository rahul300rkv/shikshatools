import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Btn, Card, Toggle, Sep } from '../components/ui.jsx'

const PLANS = [
  {
    name:'Free', icon:'🎓',
    desc:'For individual teachers getting started',
    monthly:'₹0', annual:'₹0', period:'forever',
    cta:'Get Started Free', variant:'outline', popular:false,
    features:['5 AI generations per month','Basic lesson plan templates','Worksheet generator','Quiz builder (10 questions max)','Export to PDF','Community templates'],
    limits:['No custom branding','No collaboration','No priority support'],
  },
  {
    name:'Pro Teacher', icon:'⚡',
    desc:'For educators who want the full AI toolkit',
    monthly:'₹999', annual:'₹799', period:'/month',
    cta:'Start 14-Day Free Trial', variant:'default', popular:true,
    features:['Unlimited AI generations','All 6 AI teaching tools','Advanced lesson plan models (5E, PBL, etc.)','Unlimited quiz questions','Export to PDF, DOCX, Google Docs','Custom rubric templates','AI teaching assistant chat','Question bank access (2,400+ questions)','Priority email support','Custom branding','CBSE + ICSE + State Board support','Hindi bilingual generation'],
    limits:[],
  },
  {
    name:'School Team', icon:'🏫',
    desc:'For departments and entire schools',
    monthly:'₹749', annual:'₹599', period:'/teacher/month',
    cta:'Contact Sales', variant:'outline', popular:false,
    features:['Everything in Pro, plus:','Team workspace & collaboration','Shared resource library','Admin dashboard & analytics','SSO / SAML authentication','LMS integration (Canvas, Schoology)','Custom template library','Dedicated account manager','Phone & chat support','SLA guarantee','Bulk content generation'],
    limits:[],
  },
]

const COMPARISON = [
  { feature:'AI Generations',  free:'5/month',       pro:'Unlimited',     team:'Unlimited'     },
  { feature:'Teaching Tools',  free:'3 basic',       pro:'All 6 tools',   team:'All 6 tools'   },
  { feature:'Lesson Models',   free:'Basic only',    pro:'All models',    team:'All + custom'  },
  { feature:'Quiz Questions',  free:'10 per quiz',   pro:'Unlimited',     team:'Unlimited'     },
  { feature:'Export Formats',  free:'PDF only',      pro:'PDF, DOCX, GDocs', team:'All + LMS'  },
  { feature:'AI Chat',         free:'—',             pro:'✓',             team:'✓'             },
  { feature:'Question Bank',   free:'—',             pro:'2,400+ Qs',     team:'2,400+ Qs'    },
  { feature:'Admin Dashboard', free:'—',             pro:'—',             team:'✓'             },
  { feature:'Support',         free:'Community',     pro:'Email (priority)', team:'Phone + chat'},
]

const TESTIMONIALS = [
  { text:'Shiksha Tools cut my lesson prep time by 70%. The CBSE-aligned worksheets are exactly what my students need every week.', name:'Mrs. Sunita Verma', school:'DAV School, Pune', rating:5 },
  { text:'The quiz builder alone is worth the subscription. Auto-grading with difficulty analysis has completely transformed how I assess students.', name:'Mr. Amit Sharma', school:'Kendriya Vidyalaya, Delhi', rating:5 },
  { text:'Finally an AI tool made for Indian teachers! The Hindi bilingual option has been invaluable for my Hindi-medium students in rural Maharashtra.', name:'Ms. Priya Nair', school:'Government School, Kerala', rating:5 },
]

const FAQS = [
  {
    q: "Can I try Pro features before committing?",
    a: "Yes! We offer a 14-day free trial of Pro with no credit card required."
  },
  {
    q: "Which boards are supported?",
    a: "We fully support CBSE, ICSE, ISC, and all major State Boards including Maharashtra."
  },
  {
    q: "Can I generate content in Hindi?",
    a: "Absolutely. Pro and School Team plans support bilingual content generation in Hindi."
  },
  {
    q: "What happens to my content if I downgrade?",
    a: "All your created content remains accessible and exportable forever."
  } ]


export default function PricingPage() {
  const navigate   = useNavigate()
  const [annual,   setAnnual]   = useState(true)
  const [openFaq,  setOpenFaq]  = useState(0)

  return (
    <div style={{ background:'#FAF9F7', minHeight:'100vh', fontFamily:"'Inter',sans-serif" }}>
      {/* Minimal nav */}
      <header style={{ position:'sticky', top:0, zIndex:100, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 40px', height:64, background:'rgba(255,255,255,.88)', backdropFilter:'blur(14px)', borderBottom:'1px solid #E8E3DC' }}>
        <div onClick={() => navigate('/')} style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}>
          <div style={{ width:30, height:30, borderRadius:8, background:'#C84B0C', display:'flex', alignItems:'center', justifyContent:'center', fontSize:15 }}>✨</div>
          <span style={{ fontWeight:700, fontSize:14, color:'#1A1613' }}>Shiksha Tools</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <span onClick={() => navigate('/dashboard')} style={{ fontSize:13, color:'#6B6560', cursor:'pointer' }}>Dashboard</span>
          <Btn size="sm" onClick={() => navigate('/dashboard')}>Start Free Trial →</Btn>
        </div>
      </header>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'56px 40px' }}>

        {/* ── Hero ── */}
        <div style={{ textAlign:'center', marginBottom:44 }}>
          <Badge color="#C84B0C" bg="#FFF4EE" style={{ marginBottom:16, display:'inline-flex', padding:'4px 14px', fontSize:11 }}>⚡ Simple, transparent pricing</Badge>
          <h1 style={{ fontSize:38, fontWeight:800, color:'#1A1613', marginBottom:12 }}>
            Plans that scale with your{' '}
            <span style={{ background:'linear-gradient(90deg,#C84B0C,#C84B0Caa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>teaching</span>
          </h1>
          <p style={{ fontSize:15, color:'#6B6560', marginBottom:24 }}>Start free, upgrade when you're ready. Made for Indian educators 🇮🇳</p>

          {/* Annual toggle */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:12, background:'#fff', border:'1px solid #E8E3DC', borderRadius:20, padding:'8px 16px' }}>
            <span style={{ fontSize:13, fontWeight:600, color: annual ? '#6B6560' : '#1A1613' }}>Monthly</span>
            <Toggle on={annual} set={setAnnual} />
            <span style={{ fontSize:13, fontWeight:600, color: annual ? '#1A1613' : '#6B6560' }}>Annual</span>
            {annual && <Badge variant="green" style={{ fontSize:10 }}>Save 20%</Badge>}
          </div>
        </div>

        {/* ── Plan cards ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:56 }}>
          {PLANS.map(p => (
            <div key={p.name} style={{
              background:'#fff', borderRadius:20,
              border: p.popular ? '2px solid #C84B0C' : '1px solid #E8E3DC',
              padding:26, position:'relative',
              boxShadow: p.popular ? '0 8px 32px rgba(200,75,12,.12)' : 'none',
            }}>
              {p.popular && (
                <div style={{ position:'absolute', top:-12, left:'50%', transform:'translateX(-50%)', background:'#C84B0C', color:'#fff', fontSize:11, fontWeight:700, padding:'3px 14px', borderRadius:20, whiteSpace:'nowrap' }}>
                  ⭐ Most Popular
                </div>
              )}
              <div style={{ fontSize:26, marginBottom:10 }}>{p.icon}</div>
              <div style={{ fontWeight:800, fontSize:17, color:'#1A1613', marginBottom:4 }}>{p.name}</div>
              <div style={{ fontSize:12, color:'#6B6560', marginBottom:18 }}>{p.desc}</div>
              <div style={{ marginBottom:20 }}>
                <span style={{ fontSize:34, fontWeight:900, color:'#1A1613' }}>{annual ? p.annual : p.monthly}</span>
                <span style={{ fontSize:12, color:'#6B6560', marginLeft:4 }}>{p.period}{annual && p.annual!=='₹0' ? ' (billed annually)' : ''}</span>
              </div>
              <Btn variant={p.variant} onClick={() => navigate('/dashboard')} style={{ width:'100%', justifyContent:'center', marginBottom:20 }}>
                {p.cta}
              </Btn>
              <Sep style={{ marginBottom:18 }} />
              {p.features.map(f => (
                <div key={f} style={{ display:'flex', gap:8, marginBottom:8, fontSize:13 }}>
                  <span style={{ color:'#2A7A3B', flexShrink:0 }}>✓</span>
                  <span style={{ color:'#1A1613' }}>{f}</span>
                </div>
              ))}
              {p.limits.map(l => (
                <div key={l} style={{ display:'flex', gap:8, marginBottom:8, fontSize:13 }}>
                  <span style={{ color:'#6B6560', flexShrink:0 }}>✕</span>
                  <span style={{ color:'#6B6560' }}>{l}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── Comparison table ── */}
        <div style={{ marginBottom:56 }}>
          <h2 style={{ fontSize:22, fontWeight:800, textAlign:'center', color:'#1A1613', marginBottom:24 }}>Feature Comparison</h2>
          <Card style={{ padding:0, overflow:'hidden' }}>
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', padding:'12px 20px', borderBottom:'2px solid #E8E3DC', background:'#F4F1ED' }}>
              {['Feature','Free','Pro Teacher','School Team'].map((h, i) => (
                <div key={h} style={{ fontSize:12, fontWeight:700, color: i===2 ? '#C84B0C' : '#1A1613', textAlign: i>0 ? 'center' : 'left' }}>{h}</div>
              ))}
            </div>
            {COMPARISON.map((r, idx) => (
              <div key={r.feature} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', padding:'11px 20px', borderBottom:'1px solid #E8E3DC', background: idx%2===0 ? '#fff' : '#FAF9F7' }}>
                <div style={{ fontSize:13, color:'#1A1613' }}>{r.feature}</div>
                {[r.free, r.pro, r.team].map((v, i) => (
                  <div key={i} style={{ fontSize:12, color: v==='—' ? '#6B656066' : v==='✓' ? '#2A7A3B' : '#1A1613', textAlign:'center', fontWeight: v==='✓' ? 700 : 400 }}>{v}</div>
                ))}
              </div>
            ))}
          </Card>
        </div>

        {/* ── Testimonials ── */}
        <div style={{ marginBottom:52 }}>
          <div style={{ textAlign:'center', fontSize:13, color:'#6B6560', marginBottom:20 }}>Trusted by educators across India 🇮🇳</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
            {TESTIMONIALS.map(t => (
              <Card key={t.name}>
                <div style={{ color:'#D97706', fontSize:15, marginBottom:10 }}>{'⭐'.repeat(t.rating)}</div>
                <p style={{ fontSize:13, color:'#1A1613', lineHeight:1.7, marginBottom:12, fontStyle:'italic' }}>"{t.text}"</p>
                <div style={{ fontWeight:700, fontSize:13 }}>{t.name}</div>
                <div style={{ fontSize:11, color:'#6B6560' }}>{t.school}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div>
          <h2 style={{ fontSize:22, fontWeight:800, textAlign:'center', color:'#1A1613', marginBottom:24 }}>Frequently Asked Questions</h2>
          {FAQS.map((f, i) => (
            <div key={i} style={{ border:'1px solid #E8E3DC', borderRadius:14, marginBottom:10, overflow:'hidden' }}>
              <div onClick={() => setOpenFaq(openFaq===i ? null : i)}
                style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'15px 20px', cursor:'pointer', background: openFaq===i ? '#FFF4EE' : '#fff', transition:'background .15s' }}>
                <span style={{ fontWeight:700, fontSize:14, color: openFaq===i ? '#C84B0C' : '#1A1613' }}>{f.q}</span>
                <span style={{ fontSize:16, color:'#6B6560', flexShrink:0, display:'inline-block', transition:'transform .25s', transform: openFaq===i ? 'rotate(180deg)' : 'none' }}>↓</span>
              </div>
              {openFaq === i && (
                <div style={{ padding:'13px 20px', background:'#fff', borderTop:'1px solid #E8E3DC', fontSize:13, color:'#6B6560', lineHeight:1.8 }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign:'center', marginTop:52, padding:'40px', background:'linear-gradient(135deg,#FFF4EE,#EEF8F1)', borderRadius:20, border:'1px solid rgba(200,75,12,.15)' }}>
          <div style={{ fontSize:24, fontWeight:800, color:'#1A1613', marginBottom:8 }}>Ready to transform your teaching?</div>
          <div style={{ fontSize:14, color:'#6B6560', marginBottom:24 }}>Join 1,247 Indian educators already using Shiksha Tools.</div>
          <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
            <Btn size="lg" onClick={() => navigate('/dashboard')}>Start Free Trial →</Btn>
            <Btn variant="outline" size="lg" onClick={() => navigate('/ai-chat')}>💬 Talk to AI First</Btn>
          </div>
        </div>
      </div>
    </div>
  )
}
