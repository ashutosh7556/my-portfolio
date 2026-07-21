import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { useLenis } from './hooks/useLenis'

function AppInner() {
  useLenis()
  return (
    <>
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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
