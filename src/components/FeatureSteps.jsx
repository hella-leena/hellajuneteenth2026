import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function FeatureSteps({ features, autoPlayInterval = 3000 }) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  const safeFeatures = useMemo(() => features ?? [], [features])

  useEffect(() => {
    if (safeFeatures.length <= 1) return

    const tickMs = 100
    const increment = 100 / (autoPlayInterval / tickMs)

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return Math.min(100, prev + increment)
        }

        setCurrentFeature((index) => (index + 1) % safeFeatures.length)
        return 0
      })
    }, tickMs)

    return () => clearInterval(timer)
  }, [autoPlayInterval, safeFeatures.length])

  useEffect(() => {
    setProgress(0)
  }, [currentFeature])

  if (!safeFeatures.length) return null

  return (
    <div className="feature-steps">
      <div className="feature-steps-grid">
        <div className="feature-list">
          {safeFeatures.map((feature, index) => {
            const isActive = index === currentFeature
            const isPast = index < currentFeature

            return (
              <motion.button
                key={feature.title || feature.step || index}
                className={`feature-item ${isActive ? 'is-active' : ''}`}
                initial={{ opacity: 0.45 }}
                animate={{ opacity: isActive ? 1 : 0.55 }}
                transition={{ duration: 0.35 }}
                onClick={() => setCurrentFeature(index)}
                type="button"
                aria-label={feature.title || feature.step}
              >
                <div className={`feature-badge ${isActive ? 'is-active' : ''}`}>
                  <span>{isPast || isActive ? '✓' : index + 1}</span>
                </div>
                <div className="feature-text">
                  <h3>{feature.title || feature.step}</h3>
                  <p>{feature.content}</p>
                  {isActive && <span className="feature-progress" style={{ width: `${progress}%` }} />}
                </div>
              </motion.button>
            )
          })}
        </div>

        <div className="feature-media">
          <AnimatePresence mode="wait">
            <motion.div
              key={safeFeatures[currentFeature].image}
              className="feature-media-panel"
              initial={{ y: 60, opacity: 0, rotateX: -14 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -60, opacity: 0, rotateX: 12 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
            >
              <img
                src={safeFeatures[currentFeature].image}
                alt={safeFeatures[currentFeature].title || safeFeatures[currentFeature].step}
                style={{ objectPosition: safeFeatures[currentFeature].imagePosition || '50% 50%' }}
              />
              <div className="feature-overlay" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
