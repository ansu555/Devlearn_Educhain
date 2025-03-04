"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  image: string
  delay?: number
}

export default function TestimonialCard({ quote, author, role, image, delay = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
    >
      <div className="mb-6">
        <svg
          width="45"
          height="36"
          className="text-purple-400 mb-4"
          viewBox="0 0 45 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.4 36C11.4667 36 9.73333 35.4 8.2 34.2C6.66667 33 5.4 31.4 4.4 29.4C3.46667 27.4 3 25.2667 3 23C3 19.8667 3.8 16.8667 5.4 14C7 11.0667 9.06667 8.53333 11.6 6.4C14.2 4.26667 17 2.66667 20 1.6L22 5.2C19.4667 6.13333 17.2 7.33333 15.2 8.8C13.2 10.2667 11.8667 11.8667 11.2 13.6C10.5333 15.3333 10.4667 17 11 18.6C11.5333 18.3333 12.2 18.2 13 18.2C14.7333 18.2 16.2667 18.8667 17.6 20.2C18.9333 21.5333 19.6 23.1333 19.6 25C19.6 26.8667 18.9333 28.4667 17.6 29.8C16.2667 31.1333 14.6667 31.8 12.8 31.8L13.4 36ZM35.4 36C33.4667 36 31.7333 35.4 30.2 34.2C28.6667 33 27.4 31.4 26.4 29.4C25.4667 27.4 25 25.2667 25 23C25 19.8667 25.8 16.8667 27.4 14C29 11.0667 31.0667 8.53333 33.6 6.4C36.2 4.26667 39 2.66667 42 1.6L44 5.2C41.4667 6.13333 39.2 7.33333 37.2 8.8C35.2 10.2667 33.8667 11.8667 33.2 13.6C32.5333 15.3333 32.4667 17 33 18.6C33.5333 18.3333 34.2 18.2 35 18.2C36.7333 18.2 38.2667 18.8667 39.6 20.2C40.9333 21.5333 41.6 23.1333 41.6 25C41.6 26.8667 40.9333 28.4667 39.6 29.8C38.2667 31.1333 36.6667 31.8 34.8 31.8L35.4 36Z"
            fill="currentColor"
          />
        </svg>
        <p className="text-slate-300 italic">{quote}</p>
      </div>
      <div className="flex items-center gap-3">
        <Image
          src={image || "/placeholder.svg"}
          alt={author}
          width={48}
          height={48}
          className="rounded-full border-2 border-purple-500"
        />
        <div>
          <h4 className="font-medium text-white">{author}</h4>
          <p className="text-sm text-slate-400">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}

