import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function Teams() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredTeam, setHoveredTeam] = useState(null)

  const teams = [
    { name: 'Red Bull Racing', short: 'RBR', color: '#3671C6', accent: '#FF1E00', wins: 5, championships: 6, founded: 2005, description: 'Dominant force with record-breaking consecutive wins.' },
    { name: 'Ferrari', short: 'FER', color: '#E8002D', accent: '#FFFFFF', wins: 243, championships: 16, founded: 1950, description: 'The most iconic and successful F1 team in history.' },
    { name: 'McLaren', short: 'MCL', color: '#FF8000', accent: '#000000', wins: 183, championships: 8, founded: 1963, description: 'A legendary British team making a fierce comeback.' },
    { name: 'Mercedes', short: 'MER', color: '#27F4D2', accent: '#000000', wins: 116, championships: 8, founded: 2010, description: 'Eight-time consecutive constructors champions.' },
    { name: 'Aston Martin', short: 'AMR', color: '#006F62', accent: '#00A1DE', wins: 1, championships: 0, founded: 2021, description: 'The silver arrows of British racing reborn.' },
    { name: 'Alpine', short: 'ALP', color: '#FF87AB', accent: '#0090FF', wins: 1, championships: 2, founded: 2021, description: 'Renault\'s works team, fighting for podiums.' },
    { name: 'Williams', short: 'WIL', color: '#64C5FF', accent: '#000000', wins: 114, championships: 9, founded: 1977, description: 'A storied team with 9 constructors titles.' },
    { name: 'RB', short: 'RB', color: '#6692FF', accent: '#FFFFFF', wins: 1, championships: 0, founded: 2006, description: "Red Bull's sister team developing future stars." },
    { name: 'Haas', short: 'HAA', color: '#B6BABD', accent: '#CF1020', wins: 0, championships: 0, founded: 2016, description: "America's F1 team with bold ambition." },
    { name: 'Kick Sauber', short: 'SAF', color: '#A5ACAF', accent: '#E10000', wins: 0, championships: 0, founded: 1993, description: "Tomorrow's Ferrari, building toward the future." },
  ]

  return (
    <section id="teams" className="section teams-section">
      <div className="section-header">
        <motion.span
          className="section-tag"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          2025 SEASON
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          THE GRID
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Ten powerhouse teams battling for glory on every corner of every track
        </motion.p>
      </div>

      <div className="teams-grid">
        {teams.map((team, i) => (
          <motion.div
            key={team.name}
            className={`team-card ${hoveredTeam === i ? 'team-card-hovered' : ''}`}
            style={{
              background: `linear-gradient(135deg, ${team.color}22 0%, ${team.color}08 100%)`,
              borderColor: hoveredTeam === i ? team.color : `${team.color}33`,
            }}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            onHoverStart={() => setHoveredTeam(i)}
            onHoverEnd={() => setHoveredTeam(null)}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <div className="team-header">
              <div className="team-badge" style={{ background: team.color }}>
                {team.short}
              </div>
              <div className="team-info">
                <h3>{team.name}</h3>
                <span className="team-founded">Est. {team.founded}</span>
              </div>
            </div>
            <p className="team-desc">{team.description}</p>
            <div className="team-stats">
              <div className="team-stat">
                <span className="team-stat-value">{team.wins}</span>
                <span className="team-stat-label">Wins</span>
              </div>
              <div className="team-stat">
                <span className="team-stat-value">{team.championships}</span>
                <span className="team-stat-label">Titles</span>
              </div>
            </div>
            <motion.div
              className="team-accent-bar"
              style={{ background: `linear-gradient(90deg, ${team.color}, ${team.accent})` }}
              initial={{ width: 0 }}
              animate={{ width: hoveredTeam === i ? '100%' : '60%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Teams
