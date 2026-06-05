import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function Drivers() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredDriver, setHoveredDriver] = useState(null)

  const drivers = [
    { name: 'Max Verstappen', team: 'Red Bull Racing', number: '1', flag: '🇳🇱', championships: 4, wins: 63, podiums: 104, age: 27, color: '#3671C6' },
    { name: 'Charles Leclerc', team: 'Ferrari', number: '16', flag: '🇲🇨', championships: 0, wins: 8, podiums: 44, age: 27, color: '#E8002D' },
    { name: 'Lando Norris', team: 'McLaren', number: '4', flag: '🇬🇧', championships: 0, wins: 7, podiums: 41, age: 25, color: '#FF8000' },
    { name: 'Lewis Hamilton', team: 'Ferrari', number: '44', flag: '🇬🇧', championships: 7, wins: 105, podiums: 198, age: 40, color: '#E8002D' },
    { name: 'George Russell', team: 'Mercedes', number: '63', flag: '🇬🇧', championships: 0, wins: 3, podiums: 15, age: 27, color: '#27F4D2' },
    { name: 'Oscar Piastri', team: 'McLaren', number: '81', flag: '🇦🇺', championships: 0, wins: 4, podiums: 21, age: 24, color: '#FF8000' },
    { name: 'Carlos Sainz', team: 'Williams', number: '55', flag: '🇪🇸', championships: 0, wins: 3, podiums: 27, age: 31, color: '#64C5FF' },
    { name: 'Fernando Alonso', team: 'Aston Martin', number: '14', flag: '🇪🇸', championships: 2, wins: 32, podiums: 106, age: 43, color: '#006F62' },
  ]

  return (
    <section id="drivers" className="section drivers-section">
      <div className="section-header">
        <motion.span
          className="section-tag"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          STAR POWER
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          THE DRIVERS
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          The finest drivers on Earth, pushing the limits of human performance
        </motion.p>
      </div>

      <div className="drivers-grid">
        {drivers.map((driver, i) => (
          <motion.div
            key={driver.name}
            className={`driver-card ${hoveredDriver === i ? 'driver-card-hovered' : ''}`}
            style={{
              borderLeftColor: driver.color,
              background: `linear-gradient(135deg, ${driver.color}11 0%, transparent 100%)`,
            }}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onHoverStart={() => setHoveredDriver(i)}
            onHoverEnd={() => setHoveredDriver(null)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="driver-header">
              <div className="driver-number" style={{ color: driver.color }}>
                {driver.number}
              </div>
              <div className="driver-flag">{driver.flag}</div>
            </div>
            <h3>{driver.name}</h3>
            <span className="driver-team">{driver.team}</span>
            <div className="driver-stats">
              {[
                { label: 'Championships', value: driver.championships },
                { label: 'Wins', value: driver.wins },
                { label: 'Podiums', value: driver.podiums },
              ].map((stat, j) => (
                <motion.div
                  key={stat.label}
                  className="driver-stat"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.1 + 0.2 + j * 0.1, duration: 0.4 }}
                >
                  <span className="driver-stat-value">{stat.value}</span>
                  <span className="driver-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="driver-accent"
              style={{ background: `linear-gradient(90deg, ${driver.color}, transparent)` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hoveredDriver === i ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Drivers
