import { Routes, Route } from 'react-router-dom'
import LandingPage    from './routes/landing.jsx'
import DashboardPage  from './routes/dashboard.jsx'
import LessonPage     from './routes/lesson-planner.jsx'
import WorksheetPage  from './routes/worksheet-generator.jsx'
import QuizPage       from './routes/quiz-builder.jsx'
import AIChatPage     from './routes/ai-chat.jsx'
import PricingPage    from './routes/pricing.jsx'
import SettingsPage   from './routes/settings.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/"            element={<LandingPage />} />
      <Route path="/dashboard"   element={<DashboardPage />} />
      <Route path="/lesson"      element={<LessonPage />} />
      <Route path="/worksheet"   element={<WorksheetPage />} />
      <Route path="/quiz"        element={<QuizPage />} />
      <Route path="/ai-chat"     element={<AIChatPage />} />
      <Route path="/pricing"     element={<PricingPage />} />
      <Route path="/settings"    element={<SettingsPage />} />
      <Route path="*"            element={<DashboardPage />} />
    </Routes>
  )
}
