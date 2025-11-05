import { motion } from "framer-motion"

export default function FloatingParticles() {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 2,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-40"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.startX}%`,
            top: `${particle.startY}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
