"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

const ParticleBackground = ({ particleCount = 50 }) => {
  const containerRef = useRef(null)

  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 10,
    size: 1 + Math.random() * 3,
  }))

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-60"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `hsl(${180 + Math.random() * 60}, 100%, 50%)`,
            boxShadow: `0 0 ${particle.size * 3}px currentColor`,
          }}
          animate={{
            y: [window.innerHeight + 20, -20],
            rotate: [0, 360],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export default ParticleBackground
