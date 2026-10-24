import React, { useEffect, useState } from 'react'
import Lenis from 'lenis'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'

const App = () => {
  const [darkMode, setDarkMode] = useState(true)

useEffect(() => {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  lenis.on('scroll', () => AOS.refresh())

  let rafId
  const raf = (time) => {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  const handleClick = (e) => {
    const link = e.target.closest('a[href^="#"]')
    if (!link) return
    const id = link.getAttribute('href')
    if (id.length > 1) {
      e.preventDefault()
      lenis.scrollTo(id, { duration: 1.4 })
    }
  }
  document.addEventListener('click', handleClick)

  AOS.init({
    duration: 900,
    easing: 'ease-out-cubic',
    once: false,
    mirror: true,
    offset: 0,
  })

  document.documentElement.classList.add('dark')

  return () => {
    cancelAnimationFrame(rafId)
    document.removeEventListener('click', handleClick)
    lenis.destroy()
  }
}, [])

  useEffect(() => {
    AOS.refresh()
  }, [darkMode])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div
      className={
        darkMode
          ? `bg-linear-to-br from-gray-900 via-[#2e0d10] to-red-900 min-h-screen`
          : `bg-linear-to-br from-gray-50 to-red-50 min-h-screen`
      }
    >
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero />
      <About />
      <Skills />
      <Certificates />
      <Contact />
      <Footer />
    </div>
  )
}

export default App