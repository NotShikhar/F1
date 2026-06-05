import { useEffect, useState, useRef } from 'react'
import './App.css'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Teams from './components/Teams'
import Drivers from './components/Drivers'
import Technology from './components/Technology'
import History from './components/History'
import CTA from './components/CTA'

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const lastScroll = useRef(0)
  const [navHidden, setNavHidden] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      setScrollY(currentScroll)
      
      if (currentScroll > lastScroll.current + 5) {
        if (currentScroll > 100) setNavHidden(true)
        else setNavHidden(false)
      } else {
        setNavHidden(false)
      }
      lastScroll.current = currentScroll

      const sections = ['hero', 'stats', 'teams', 'drivers', 'technology', 'history', 'cta']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="app">
      <nav className={`nav ${navHidden ? 'nav-hidden' : ''} ${scrollY > 50 ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => scrollTo('hero')}>
            <span className="logo-red">F1</span>
            <span className="logo-text">MOTORSPORT</span>
          </div>
          <div className="nav-links">
            {['stats', 'teams', 'drivers', 'technology', 'history'].map(section => (
              <button
                key={section}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={() => scrollTo(section)}
              >
                {section === 'stats' ? 'Stats' : section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
          <button className="nav-cta" onClick={() => scrollTo('cta')}>EXPLORE</button>
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </nav>

      <div className="mobile-menu" style={{ display: menuOpen ? 'flex' : 'none' }}>
        {['hero', 'stats', 'teams', 'drivers', 'technology', 'history', 'cta'].map(section => (
          <button
            key={section}
            className="mobile-link"
            onClick={() => scrollTo(section)}
          >
            {section === 'hero' ? 'Home' : section === 'stats' ? 'Stats' : section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      <main>
        <Hero scrollY={scrollY} />
        <Stats />
        <Teams />
        <Drivers />
        <Technology />
        <History />
        <CTA />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-red">F1</span>
            <span className="logo-text">MOTORSPORT</span>
            <p>The pinnacle of motorsport excellence since 1950.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Explore</h4>
              <a href="#">Race Calendar</a>
              <a href="#">Standings</a>
              <a href="#">Teams</a>
              <a href="#">Drivers</a>
            </div>
            <div className="footer-col">
              <h4>More</h4>
              <a href="#">F1 TV</a>
              <a href="#">F1 23 Game</a>
              <a href="#">F1 24 Calendar</a>
              <a href="#">Grand Prix</a>
            </div>
            <div className="footer-col">
              <h4>Connect</h4>
              <a href="#">Instagram</a>
              <a href="#">Twitter / X</a>
              <a href="#">YouTube</a>
              <a href="#">Facebook</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Formula 1. All rights reserved. Built with passion for motorsport.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
