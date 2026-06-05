import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function History() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const eras = [
    {
      year: '1950',
      title: 'The Beginning',
      desc: 'The first Formula 1 World Championship race was held at Silverstone, England on May 13, 1950. Giuseppe Farina took the first title.',
      driver: 'Giuseppe Farina',
      car: 'Alfa Romeo 158',
      color: '#C8C8C8',
    },
    {
      year: '1960',
      title: 'The Golden Era',
      desc: 'Graham Hill, Jim Clark, and Jackie Stewart defined an era of courage and skill. The sport captured the imagination of the world.',
      driver: 'Jim Clark',
      car: 'Lotus 25',
      color: '#2D8B3E',
    },
    {
      year: '1980',
      title: 'Turbo & Technology',
      desc: 'The turbocharged era brought unprecedented power. Ferrari, McLaren, and Williams waged war with engineering innovation.',
      driver: 'Niki Lauda',
      car: 'Ferrari 126C',
      color: '#E8002D',
    },
    {
      year: '2000',
      title: 'The Modern Age',
      desc: 'Schumacher dominated with Ferrari. The sport went global with races across five continents and billions of viewers.',
      driver: 'Michael Schumacher',
      car: 'Ferrari F2003-GA',
      color: '#E8002D',
    },
    {
      year: '2020',
      title: 'The New Generation',
      desc: 'A new era of hybrid power, diverse champions, and groundbreaking technology. Verstappen, Hamilton, and the next generation compete at the limit.',
      driver: 'Max Verstappen',
      car: 'RB19',
      color: '#3671C6',
    },
  ]

  return (
    <section id="history" className="section history-section">
      <div className="section-header">
        <motion.span
          className="section-tag"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          LEGACY
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          75 YEARS OF LEGENDS
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Seven decades of courage, innovation, and glory
        </motion.p>
      </div>

      <div className="timeline">
        {eras.map((era, i) => (
          <motion.div
            key={era.year}
            className={`timeline-item ${i % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.2 }}
          >
            <div className="timeline-dot" style={{ background: era.color, boxShadow: `0 0 20px ${era.color}66` }}>
              <motion.div
                className="timeline-pulse"
                style={{ background: era.color }}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            </div>
            <div className="timeline-content">
              <motion.div
                className="timeline-year"
                style={{ color: era.color }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.2 + 0.3, duration: 0.5 }}
              >
                {era.year}
              </motion.div>
              <h3>{era.title}</h3>
              <p>{era.desc}</p>
              <div className="timeline-champion">
                <span className="champion-label">Champion</span>
                <span className="champion-name">{era.driver}</span>
                <span className="champion-car">{era.car}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default History
