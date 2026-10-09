import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import WhatsAppDemo from './pages/WhatsAppDemo'
import { useLenis } from './hooks/useLenis'
import { initMagnetic } from './animations/magneticAnimation'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80)
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

function AppInner() {
  useLenis()

  useEffect(() => {
    initMagnetic()
  }, [])

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/whatsapp-ai-chatbot" element={<WhatsAppDemo />} />
        <Route path="/whatsapp-ai-chatbot" element={<WhatsAppDemo />} />
      </Routes>
    </>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <BrowserRouter>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      {loaded && <AppInner />}
    </BrowserRouter>
  )
}
