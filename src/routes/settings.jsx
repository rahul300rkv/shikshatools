import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppSidebar } from '../components/AppSidebar.jsx'
import { TopNavbar }  from '../components/TopNavbar.jsx'
import { Badge, Btn, Card, Sel, Inp, Label, Sep, Toggle, Avatar } from '../components/ui.jsx'

const RECENT_ACTIVITY = [
  { icon:'📖', name:'Lesson Plan Gen',   time:'2 hours ago',  credits:'-12 Credits' },
  { icon:'❓', name:'Quiz Generator',    time:'Yesterday',    credits:'-8 Credits'  },
  { icon:'🌐', name:'Hindi Translation', time:'Oct 24, 2024', credits:'-5 Credits'  },
  { icon:'📄', name:'Worksheet Gen',     time:'Oct 23, 2024', credits:'-4 Credits'  },
]

const SETTINGS_LINKS = [
  { icon:'🔔', title:'Notification Preferences', desc:'Email, Push & In-app notifications'   },
  { icon:'🛡️', title:'Security & Privacy',       desc:'2FA, data access & connected apps'    },
  { icon:'🌐', title:'Language & Region',         desc:'English (India), IST timezone'        },
  { icon:'🎨', title:'Appearance',                desc:'Theme, font size, colour preferences' },
  { icon:'🔗', title:'Integrations',              desc:'Google Drive, LMS, Classroom connect'  },
  { icon:'📊', title:'Analytics & Reports',       desc:'Usage reports and export history'     },
]

export default function SettingsPage() {
  const navigate = useNavigate()
  const [aiTone,   setAiTone]   = useState('Encouraging & Creative')
  const [email,    setEmail]    = useState('priya.sharma@dps.edu.in')
  const [editEmail,setEditEmail]= useState(false)
  const [activeTab,setActiveTab]= useState('profile')

  const TABS = [
    { id:'profile',  label:'Profile'       },
    { id:'credits',  label:'Credits & Plan'},
    { id:'account',  label:'Account'       },
    { id:'ai',       label:'AI Settings'   },
  ]

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#FAF9F7', fontFamily:"'Inter',sans-serif" }}>
      <AppSidebar />
      <div style={{ flex:1, overflow:'auto', display:'flex', flexDirection:'column' }}>
        <TopNavbar />
        <div style={{ maxWidth:1100, margin:'0 auto', padding:24, width:'100%' }}>

          {/* Page header */}
          <div style={{ marginBottom:24 }}>
            <h1 style={{ fontSize:22, fontWeight:800, color:'#1A1613', margin:'0 0 4px' }}>Settings</h1>
            <p style={{ fontSize:13, color:'#6B6560', margin:0 }}>Manage your profile, credits, and AI preferences</p>
          </div>

          {/* Tab bar */}
          <div style={{ display:'flex', gap:4, marginBottom:24, borderBottom:'1px solid #E8E3DC', paddingBottom:0 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                style={{
                  padding:'9px 18px', border:'none', cursor:'pointer',
                  fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:13,
                  background:'transparent',
                  color: activeTab === t.id ? '#C84B0C' : '#6B6560',
                  borderBottom: activeTab === t.id ? '2px solid #C84B0C' : '2px solid transparent',
                  marginBottom:-1,
                }}>{t.label}</button>
            ))}
          </div>

          {/* ── Profile Tab ── */}
          {activeTab === 'profile' && (
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {/* Profile card */}
              <Card style={{ display:'flex', alignItems:'flex-start', gap:22, padding:22 }}>
                <div style={{ position:'relative' }}>
                  <div style={{
                    width:80, height:80, borderRadius:16,
                    background:'linear-gradient(135deg,#C84B0C,#8B2000)',
                    display:'flex', alignItems:'center', justifyContent:'center', fontSize:36,
                  }}>👩‍🏫</div>
                  <div style={{
                    position:'absolute', bottom:-4, right:-4, width:24, height:24,
                    background:'#C84B0C', borderRadius:'50%',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:11, color:'#fff', cursor:'pointer',
                  }}>✏</div>
                </div>
                <div style={{ flex:1 }}>
                  <h2 style={{ fontSize:22, fontWeight:800, margin:'0 0 4px' }}>Priya Sharma</h2>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                    <span>🎓</span>
                    <span style={{ fontSize:13, color:'#6B6560' }}>Delhi Public School, R.K. Puram</span>
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    <Badge variant="green">Senior Educator</Badge>
                    <Badge color="#C84B0C" bg="#FFE0CC">Mathematics Specialist</Badge>
                  </div>
                </div>
                <div style={{ display:'flex', gap:10 }}>
                  <Btn variant="outline" size="sm">View Public Profile</Btn>
                  <Btn size="sm">Save Changes</Btn>
                </div>
              </Card>

              {/* Profile form */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <Card style={{ padding:20 }}>
                  <div style={{ fontWeight:700, fontSize:14, marginBottom:16 }}>Personal Information</div>
                  <div style={{ marginBottom:12 }}><Label>Full Name</Label><Inp defaultValue="Priya Sharma" /></div>
                  <div style={{ marginBottom:12 }}><Label>School / Institution</Label><Inp defaultValue="Delhi Public School, R.K. Puram" /></div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
                    <div><Label>City</Label><Inp defaultValue="New Delhi" /></div>
                    <div><Label>State</Label><Sel value="Delhi" onChange={() => {}} options={['Delhi','Maharashtra','Tamil Nadu','Karnataka','UP','Rajasthan','Gujarat','West Bengal']} /></div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                    <div><Label>Primary Subject</Label><Sel value="Mathematics" onChange={() => {}} options={['Mathematics','Science','English','Hindi','Social Studies','Physics','Chemistry','Biology']} /></div>
                    <div><Label>Classes Taught</Label><Sel value="9–12" onChange={() => {}} options={['1–5','6–8','9–10','11–12','9–12','6–12']} /></div>
                  </div>
                </Card>

                <Card style={{ padding:20 }}>
                  <div style={{ fontWeight:700, fontSize:14, marginBottom:16 }}>Board & Curriculum</div>
                  <div style={{ marginBottom:12 }}><Label>Primary Board</Label><Sel value="CBSE" onChange={() => {}} options={['CBSE','ICSE','ISC','State Board (Maharashtra)','State Board (Tamil Nadu)','IB','Cambridge IGCSE']} /></div>
                  <div style={{ marginBottom:12 }}><Label>Teaching Since</Label><Sel value="2010" onChange={() => {}} options={['2000','2002','2004','2006','2008','2010','2012','2014','2016','2018','2020','2022','2023','2024']} /></div>
                  <div style={{ marginBottom:12 }}>
                    <Label>Bio</Label>
                    <Inp rows={3} defaultValue="Senior Mathematics educator with 14 years of experience in CBSE curriculum. Passionate about making abstract concepts tangible through hands-on learning." />
                  </div>
                  <Btn style={{ width:'100%', justifyContent:'center' }}>Save Profile</Btn>
                </Card>
              </div>

              {/* Quick settings */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
                {SETTINGS_LINKS.map(s => (
                  <Card key={s.title} style={{ display:'flex', alignItems:'center', gap:12, cursor:'pointer', padding:16 }}>
                    <div style={{ width:38, height:38, background:'#F4F1ED', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>{s.icon}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:13 }}>{s.title}</div>
                      <div style={{ fontSize:11, color:'#6B6560' }}>{s.desc}</div>
                    </div>
                    <span style={{ color:'#6B6560', fontSize:16 }}>›</span>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ── Credits Tab ── */}
          {activeTab === 'credits' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
              {/* Credits donut */}
              <Card style={{ padding:22 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
                  <div>
                    <h3 style={{ fontSize:16, fontWeight:700, margin:'0 0 3px' }}>Subscription & Credits</h3>
                    <div style={{ fontSize:12, color:'#6B6560' }}>Manage your AI power-ups and usage history.</div>
                  </div>
                  <Btn size="sm">🎁 Pro Teacher Plan</Btn>
                </div>

                <div style={{ display:'flex', gap:24 }}>
                  {/* Donut chart */}
                  <div style={{ width:110, height:110, position:'relative', flexShrink:0 }}>
                    <svg viewBox="0 0 36 36" style={{ width:'100%', height:'100%', transform:'rotate(-90deg)' }}>
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F4F1ED" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#C84B0C" strokeWidth="3"
                        strokeDasharray={`${(150/1000)*100} 100`} strokeLinecap="round" />
                    </svg>
                    <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                      <div style={{ fontSize:22, fontWeight:900, color:'#1A1613' }}>150</div>
                      <div style={{ fontSize:9, color:'#6B6560' }}>Credits left</div>
                    </div>
                  </div>

                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12, color:'#6B6560', marginBottom:12 }}>150 / 1000 credits remaining this month</div>
                    <Btn style={{ width:'100%', justifyContent:'center', fontSize:13, marginBottom:14 }}>Upgrade Credits</Btn>

                    <div style={{ fontSize:10, fontWeight:700, color:'#6B6560', marginBottom:8, textTransform:'uppercase', letterSpacing:0.4 }}>Recent Activity</div>
                    {RECENT_ACTIVITY.map(a => (
                      <div key={a.name} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom:'1px solid #E8E3DC' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <div style={{ width:28, height:28, background:'#EEF8F1', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>{a.icon}</div>
                          <div>
                            <div style={{ fontSize:12, fontWeight:600 }}>{a.name}</div>
                            <div style={{ fontSize:10, color:'#6B6560' }}>{a.time}</div>
                          </div>
                        </div>
                        <span style={{ fontSize:12, fontWeight:700, color:'#C84B0C' }}>{a.credits}</span>
                      </div>
                    ))}
                    <div style={{ fontSize:12, color:'#C84B0C', fontWeight:700, marginTop:10, cursor:'pointer' }}>View All History →</div>
                  </div>
                </div>
              </Card>

              {/* Plan details */}
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <Card style={{ padding:20 }}>
                  <div style={{ fontWeight:700, fontSize:14, marginBottom:14 }}>Current Plan</div>
                  <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', background:'linear-gradient(135deg,#FFF4EE,#FFE0CC)', borderRadius:14, border:'1px solid rgba(200,75,12,.2)', marginBottom:14 }}>
                    <div style={{ fontSize:28 }}>⚡</div>
                    <div>
                      <div style={{ fontWeight:800, fontSize:16 }}>Pro Teacher</div>
                      <div style={{ fontSize:12, color:'#6B6560' }}>₹999/month · Renews Dec 1, 2024</div>
                    </div>
                    <Btn variant="outline" size="sm" style={{ marginLeft:'auto' }}>Manage</Btn>
                  </div>

                  <div style={{ marginBottom:10, fontWeight:600, fontSize:12, color:'#6B6560' }}>WHAT'S INCLUDED</div>
                  {[
                    '1,000 AI credits per month',
                    'All 6 AI teaching tools',
                    'Unlimited quiz questions',
                    'Export to PDF, DOCX, Google Docs',
                    'AI chat assistant',
                    'Priority email support',
                    'CBSE + ICSE + State Board support',
                  ].map(f => (
                    <div key={f} style={{ display:'flex', gap:8, marginBottom:7, fontSize:13 }}>
                      <span style={{ color:'#2A7A3B' }}>✓</span>
                      <span style={{ color:'#1A1613' }}>{f}</span>
                    </div>
                  ))}

                  <Sep style={{ margin:'14px 0' }} />
                  <Btn onClick={() => navigate('/pricing')} style={{ width:'100%', justifyContent:'center' }}>⚡ Upgrade to School Team</Btn>
                </Card>

                <Card style={{ padding:20 }}>
                  <div style={{ fontWeight:700, fontSize:14, marginBottom:12 }}>Payment Method</div>
                  <div style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 12px', background:'#F4F1ED', borderRadius:10, marginBottom:12 }}>
                    <span style={{ fontSize:22 }}>💳</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:600 }}>Visa ending in 4242</div>
                      <div style={{ fontSize:11, color:'#6B6560' }}>Expires 12/2026</div>
                    </div>
                    <Btn variant="ghost" size="sm">Change</Btn>
                  </div>
                  <Btn variant="outline" size="sm">+ Add Payment Method</Btn>
                </Card>
              </div>
            </div>
          )}

          {/* ── Account Tab ── */}
          {activeTab === 'account' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <Card style={{ padding:20 }}>
                <div style={{ fontWeight:700, fontSize:14, marginBottom:16 }}>Account Settings</div>

                <div style={{ marginBottom:14 }}>
                  <Label>Email Address</Label>
                  {editEmail
                    ? <div style={{ display:'flex', gap:8 }}>
                        <Inp value={email} onChange={setEmail} style={{ flex:1 }} />
                        <Btn size="sm" onClick={() => setEditEmail(false)}>Save</Btn>
                      </div>
                    : <div style={{ border:'1px solid #E8E3DC', borderRadius:10, padding:'9px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <span style={{ fontSize:13 }}>{email}</span>
                        <span style={{ fontSize:13, color:'#C84B0C', cursor:'pointer' }} onClick={() => setEditEmail(true)}>✏ Edit</span>
                      </div>
                  }
                </div>

                <div style={{ marginBottom:14 }}>
                  <Label>Password</Label>
                  <div style={{ border:'1px solid #E8E3DC', borderRadius:10, padding:'9px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:13 }}>••••••••••••</span>
                    <span style={{ fontSize:12, color:'#C84B0C', fontWeight:700, cursor:'pointer' }}>Change</span>
                  </div>
                </div>

                <div style={{ marginBottom:14 }}>
                  <Label>Phone Number</Label>
                  <Inp defaultValue="+91 98765 43210" />
                </div>

                <Sep style={{ margin:'16px 0' }} />

                <div style={{ fontWeight:700, fontSize:13, marginBottom:10, color:'#C0392B' }}>Danger Zone</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <Btn variant="outline" size="sm" style={{ justifyContent:'flex-start', color:'#C84B0C', borderColor:'#C84B0C33' }}>↩ Sign Out of All Devices</Btn>
                  <Btn variant="destructive" size="sm" style={{ justifyContent:'flex-start' }}>🗑 Delete Account</Btn>
                </div>
              </Card>

              <Card style={{ padding:20 }}>
                <div style={{ fontWeight:700, fontSize:14, marginBottom:14 }}>Security</div>
                {[
                  { l:'Two-Factor Authentication', d:'Add extra security to your account', on:false },
                  { l:'Login Notifications',        d:'Get alerted on new sign-ins',        on:true  },
                  { l:'Session Timeout',             d:'Auto-logout after 30 min idle',      on:false },
                ].map(s => (
                  <div key={s.l} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:'1px solid #E8E3DC' }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600 }}>{s.l}</div>
                      <div style={{ fontSize:11, color:'#6B6560' }}>{s.d}</div>
                    </div>
                    <Toggle on={s.on} set={() => {}} />
                  </div>
                ))}

                <Sep style={{ margin:'16px 0' }} />
                <div style={{ fontWeight:700, fontSize:14, marginBottom:12 }}>Active Sessions</div>
                {[
                  { device:'Chrome · Windows', location:'New Delhi, India', time:'Active now',  current:true  },
                  { device:'Safari · iPhone',  location:'New Delhi, India', time:'2 hours ago', current:false },
                ].map(s => (
                  <div key={s.device} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 0', borderBottom:'1px solid #E8E3DC' }}>
                    <div style={{ width:34, height:34, background:'#F4F1ED', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>
                      {s.device.includes('Chrome') ? '🖥️' : '📱'}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:12, fontWeight:600 }}>{s.device}</div>
                      <div style={{ fontSize:11, color:'#6B6560' }}>{s.location} · {s.time}</div>
                    </div>
                    {s.current
                      ? <Badge variant="green" style={{ fontSize:9 }}>Current</Badge>
                      : <Btn variant="ghost" size="sm" style={{ fontSize:11, color:'#C0392B' }}>Revoke</Btn>
                    }
                  </div>
                ))}
              </Card>
            </div>
          )}

          {/* ── AI Settings Tab ── */}
          {activeTab === 'ai' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <Card style={{ padding:20 }}>
                <div style={{ fontWeight:700, fontSize:14, marginBottom:4 }}>✨ AI Tone & Style</div>
                <div style={{ fontSize:12, color:'#6B6560', marginBottom:16 }}>Customize how the AI communicates and generates content for your classroom.</div>

                <div style={{ marginBottom:14 }}>
                  <Label>Communication Tone</Label>
                  <Sel value={aiTone} onChange={setAiTone}
                    options={['Encouraging & Creative','Formal & Academic','Concise & Direct','Socratic & Questioning','Bilingual (Hindi + English)']} />
                </div>

                <div style={{ marginBottom:14 }}>
                  <Label>Default Language</Label>
                  <Sel value="English" onChange={() => {}} options={['English','Hindi','Bilingual (English + Hindi)','Marathi','Tamil','Telugu']} />
                </div>

                <div style={{ marginBottom:14 }}>
                  <Label>Complexity Level</Label>
                  <Sel value="Intermediate" onChange={() => {}} options={['Beginner friendly','Intermediate','Advanced (HOTS focused)']} />
                </div>

                <Sep style={{ margin:'14px 0' }} />
                <div style={{ fontWeight:700, fontSize:13, marginBottom:10 }}>AI Behaviour</div>
                {[
                  { l:'Include HOTS questions by default',    on:false },
                  { l:'Add differentiation suggestions',      on:true  },
                  { l:'Include board-specific references',    on:true  },
                  { l:'Generate bilingual content when asked',on:false },
                ].map(s => (
                  <div key={s.l} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid #E8E3DC' }}>
                    <span style={{ fontSize:13 }}>{s.l}</span>
                    <Toggle on={s.on} set={() => {}} />
                  </div>
                ))}
              </Card>

              <Card style={{ padding:20 }}>
                <div style={{ fontWeight:700, fontSize:14, marginBottom:14 }}>Default Generation Settings</div>
                <div style={{ marginBottom:12 }}>
                  <Label>Default Board</Label>
                  <Sel value="CBSE" onChange={() => {}} options={['CBSE','ICSE','ISC','State Board']} />
                </div>
                <div style={{ marginBottom:12 }}>
                  <Label>Default Grade Range</Label>
                  <Sel value="9–12" onChange={() => {}} options={['1–5','6–8','9–10','11–12','9–12']} />
                </div>
                <div style={{ marginBottom:12 }}>
                  <Label>Default Subject</Label>
                  <Sel value="Mathematics" onChange={() => {}} options={['Mathematics','Science','English','Hindi','Social Studies','Physics','Chemistry','Biology']} />
                </div>
                <div style={{ marginBottom:14 }}>
                  <Label>Custom System Prompt (optional)</Label>
                  <Inp rows={4} placeholder="Add any standing instructions for the AI — e.g. 'Always reference NCERT textbook examples' or 'Focus on real-world applications from Indian context'..." />
                </div>
                <Btn style={{ width:'100%', justifyContent:'center' }}>Save AI Settings</Btn>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
