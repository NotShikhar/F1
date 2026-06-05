import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import F1Car from './F1Car'

function ScrollProgress() {
  const progress = useRef(0)
  const target = useRef(0)
  
  useFrame(() => {
    const scrollMax = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
    target.current = window.scrollY / scrollMax
    progress.current += (target.current - progress.current) * 0.1
  })
  
  return progress
}

function CameraController() {
  const scroll = ScrollProgress()
  const { camera } = useThree()
  
  useFrame(() => {
    const t = scroll.current
    const targetX = Math.sin(t * Math.PI * 2) * 3 + 2
    const targetY = 2 + Math.sin(t * Math.PI) * 1
    const targetZ = 5 - t * 3
    
    camera.position.x += (targetX - camera.position.x) * 0.05
    camera.position.y += (targetY - camera.position.y) * 0.05
    camera.position.z += (targetZ - camera.position.z) * 0.05
    camera.lookAt(
      Math.sin(t * Math.PI * 2) * 2,
      Math.sin(t * Math.PI) * 0.5,
      t * 3 - 1.5
    )
  })
  
  return null
}

function CarScene() {
  return (
    <>
      <PerspectiveCamera makeDefault args={[50, 1, 0.1, 1000]} position={[5, 3, 8]} />
      <CameraController />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} castShadow shadow-mapSize={[256, 256]} />
      <pointLight position={[5, 2, 5]} intensity={1.5} color="#E8002D" />
      <Stars radius={50} depth={30} count={1000} factor={3} saturation={0} fade speed={1} />
      <F1Car scrollProgress={ScrollProgress()} />
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#0A0A0A" metalness={0.9} roughness={0.3} />
      </mesh>
      
      {/* Red stripe on ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.48, 0]}>
        <planeGeometry args={[80, 0.3]} />
        <meshStandardMaterial color="#E8002D" emissive="#E8002D" emissiveIntensity={0.3} />
      </mesh>
    </>
  )
}

function Hero({ scrollY }) {
  return (
    <section id="hero" className="section hero-section">
      {/* 3D Canvas */}
      <div className="hero-3d-container">
        <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
          <CarScene />
        </Canvas>
      </div>
      
      {/* Gradient overlay */}
      <div className="hero-gradient" />
      
      {/* Grid pattern overlay */}
      <div className="hero-grid" />
      
      {/* Floating particles */}
      <div className="hero-particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="hero-content">
        {/* Decorative elements */}
        <div className="hero-decoration hero-deco-left">
          <div className="deco-line" />
          <div className="deco-circle" />
        </div>
        <div className="hero-decoration hero-deco-right">
          <div className="deco-line" />
          <div className="deco-circle" />
        </div>

        {/* Top label */}
        <div className="hero-label">
          <span className="label-line" />
          <span>FORMULA 1 • 2025 SEASON</span>
          <span className="label-line" />
        </div>

        {/* Main title */}
        <h1 className="hero-title">
          <span className="title-line">
            <span className="title-word">WHERE</span>
          </span>
          <span className="title-line">
            <span className="title-word title-accent">LEGENDS</span>
            <span className="title-word">ARE</span>
          </span>
          <span className="title-line">
            <span className="title-word">MADE</span>
            <span className="title-dot" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          The pinnacle of motorsport — where engineering meets courage,
          <br />
          and every millisecond defines history.
        </p>

        {/* Stats row */}
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-number">24</span>
            <span className="stat-text">Races</span>
          </div>
          <div className="stat-divider" />
          <div className="hero-stat">
            <span className="stat-number">20</span>
            <span className="stat-text">Drivers</span>
          </div>
          <div className="stat-divider" />
          <div className="hero-stat">
            <span className="stat-number">10</span>
            <span className="stat-text">Teams</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="hero-buttons">
          <button
            className="hero-cta hero-cta-primary"
            onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>EXPLORE THE GRID</span>
            <span className="cta-arrow">→</span>
          </button>
          <button className="hero-cta hero-cta-secondary">
            <span>▶ WATCH HIGHLIGHTS</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>SCROLL</span>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="hero-fade" />
    </section>
  )
}

export default Hero
