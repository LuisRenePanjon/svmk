'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {Phrases} from "@/app/components/calendar/utils";


export default function PraseSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % Phrases.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-6 h-16 flex items-center justify-center overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute text-center text-rose-500 text-sm italic px-4"
        >
          {Phrases[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
