"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
}

export default function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 group"
    >
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:from-purple-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
        <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">{icon}</div>
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors duration-300">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </motion.div>
  )
}

