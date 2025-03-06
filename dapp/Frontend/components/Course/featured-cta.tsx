"use client"

import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "../../components/ui/button"

export default function FeaturedCta() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mt-16 p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-800/50"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Ready to advance your career?</h2>
          <p className="text-gray-400">Join 50,000+ developers already learning on DevLearn</p>
        </div>
        <Button className="bg-white text-purple-900 hover:bg-gray-100 group">
          Start Learning Now
          <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  )
}

