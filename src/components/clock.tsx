import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Clock() {
  const [time, setTime] = useState<{ hours: number; minutes: number; seconds: number } | null>(null)
  const [location, setLocation] = useState<string>("Loading...")
  const [timezone, setTimezone] = useState<string>("")

  useEffect(() => {
    setTime(getCurrentTime())
    const interval = setInterval(() => {
      setTime(getCurrentTime())
    }, 1000)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          )
          const data = await response.json()
          const city = data.address?.city || data.address?.town || data.address?.county || "Unknown"
          const country = data.address?.country || ""
          setLocation(`${city}, ${country}`)
        } catch (error) {
          console.log("[v0] Geocoding error:", error)
          setLocation("Coordinates: " + latitude.toFixed(2) + ", " + longitude.toFixed(2))
        }
      })
    }

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    setTimezone(userTimezone)

    return () => clearInterval(interval)
  }, [])

  if (!time) return null

  const hourDegrees = (time.hours % 12) * 30 + time.minutes * 0.5
  const minuteDegrees = time.minutes * 6 + time.seconds * 0.1
  const secondDegrees = time.seconds * 6

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl border border-purple-500/30 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-radial opacity-40" />

        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-3 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full"
            style={{
              top: "20px",
              left: "50%",
              transformOrigin: "0 130px",
              rotate: (i + 1) * 30,
            }}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: i * 0.05,
            }}
          />
        ))}

        <motion.div
          className="absolute w-4 h-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg shadow-purple-500/50 z-30"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />

        <motion.div
          className="absolute w-2 h-20 bg-gradient-to-t from-purple-400 to-purple-500 rounded-full origin-bottom shadow-lg"
          style={{
            top: "50%",
            left: "50%",
            marginLeft: "-4px",
            marginTop: "-80px",
            rotate: hourDegrees,
          }}
          animate={{ rotate: hourDegrees }}
          transition={{ type: "tween", ease: "linear", duration: 0.5 }}
        />

        <motion.div
          className="absolute w-1.5 h-28 bg-gradient-to-t from-blue-400 to-blue-500 rounded-full origin-bottom shadow-lg"
          style={{
            top: "50%",
            left: "50%",
            marginLeft: "-3px",
            marginTop: "-112px",
            rotate: minuteDegrees,
          }}
          animate={{ rotate: minuteDegrees }}
          transition={{ type: "tween", ease: "linear", duration: 0.5 }}
        />

        <motion.div
          className="absolute w-0.5 h-32 bg-gradient-to-t from-red-400 to-red-500 rounded-full origin-bottom shadow-md"
          style={{
            top: "50%",
            left: "50%",
            marginLeft: "-1px",
            marginTop: "-128px",
            rotate: secondDegrees,
          }}
          animate={{ rotate: secondDegrees }}
          transition={{ type: "tween", ease: "linear", duration: 0.5 }}
        />

        <motion.div
          className="absolute bottom-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 tracking-widest">
            {String(time.hours).padStart(2, "0")}:{String(time.minutes).padStart(2, "0")}:
            {String(time.seconds).padStart(2, "0")}
          </div>
        </motion.div>

        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 320 320"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <circle
            cx="160"
            cy="160"
            r="155"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1"
            opacity="0.3"
            strokeDasharray="10 5"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <p className="text-foreground/80 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          {location}
        </p>
        <p className="text-foreground/60 text-sm tracking-widest uppercase mt-2">{timezone}</p>
      </motion.div>
    </div>
  )
}

function getCurrentTime() {
  const now = new Date()
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  }
}
