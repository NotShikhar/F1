import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function Technology() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const features = [
    {
      title: 'Hybrid Power Unit',
      desc: '1.6L V6 turbocharged engine producing 1000+ HP with MGU-K and MGU-H energy recovery systems',
      icon: '⚙️',
      angle: '-2deg',
    },
    {
      title: 'Active Aerodynamics',
      desc: 'DRS, front and rear wings that adapt in real-time to airflow conditions for optimal downforce',
      icon: '🌬️',
      angle: '2deg',
    },
    {
      title: 'Carbon Fiber Chassis',
      desc: 'Monocoque constructed from carbon fiber composite, weighing just 798kg with crash safety standards',
      icon: '🛡️',
      angle: '-1deg',
    },
    {
      title: 'Data Engineering',
      desc: '150+ sensors streaming 1000+ data points per second to the pit wall for split-second decisions',
      icon: '📊',
      angle: '1deg',
    },
    {
      title: 'Tyre Science',
      desc: 'Pirelli compounds engineered for 100+ mph cornering forces and temperatures exceeding 120°C',
      icon: '🔴',
      angle: '-1.5deg',
    },
    {
      title: 'Pit Stop Mastery',
      desc: 'Under 2.5 second pit stops with 20+ crew members executing with military precision',
      icon: '🔧',
      angle: '1.5deg',
    },
  ]

  return (
    <section id="technology" className="section technology-section">
      <div className="section-header">
        <motion.span
          className="section-tag"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          ENGINEERING
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          THE TECHNOLOGY
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Billions in R&D compressed into a machine that defies physics
        </motion.p>
      </div>

      <div className="tech-grid">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            className="tech-card"
            initial={{ opacity: 0, y: 60, rotate: parseFloat(feature.angle) }}
            animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            whileHover={{ y: -8, rotate: 0, scale: 1.03 }}
          >
            <div className="tech-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
            <motion.div
              className="tech-glow"
              style={{ background: `radial-gradient(circle at 50% 0%, rgba(255,30,0,0.15), transparent 70%)` }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="speed-bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      >
        <div className="speed-line" />
        <span className="speed-text">350+ KM/H</span>
      </motion.div>
    </section>
  )
}

export default Technology
