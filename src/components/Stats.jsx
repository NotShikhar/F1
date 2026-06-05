import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { value: '1153', label: 'Grand Prix Races Since 1950', icon: '🏁' },
    { value: '75', label: 'Seasons of Motorsport', icon: '🏆' },
    { value: '347', label: 'Race Wins for Ferrari', icon: '🔴' },
    { value: '15', label: 'Total Driver Championships', icon: '👑' },
    { value: '10', label: 'Teams on the 2025 Grid', icon: '⚡' },
    { value: '24', label: 'Races in the 2025 Calendar', icon: '📅' },
    { value: '20', label: 'Drivers Per Grid', icon: '🧠' },
    { value: '$14B', label: 'Estimated Industry Revenue', icon: '💰' },
  ]

  return (
    <section id="stats" className="section stats-section">
      <div className="stats-bg"></div>
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            ref={isInView ? ref : null}
            className="stat-card"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ scale: 1.05, y: -8 }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <motion.div
              className="stat-value"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              {stat.value}
            </motion.div>
            <p className="stat-label">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Stats
