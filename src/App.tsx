import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { SiteChrome } from './components/SiteChrome'
import { LandingPage } from './pages/LandingPage'
import { BuilderPage } from './pages/BuilderPage'

function App() {
  return (
    <HashRouter>
      <div className="page-shell">
        <SiteChrome />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/builder" element={<BuilderPage />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
