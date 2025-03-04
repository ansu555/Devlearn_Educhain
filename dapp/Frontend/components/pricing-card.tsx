"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "./ui/button"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "outline" | "gradient"
  popular?: boolean
  delay?: number
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant,
  popular = false,
  delay = 0,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`relative bg-slate-800/50 border ${popular ? "border-purple-500" : "border-slate-700"} rounded-xl p-6 hover:shadow-lg ${popular ? "hover:shadow-purple-500/10" : "hover:shadow-slate-700/10"} transition-all duration-300`}
    >
      {popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="flex items-end justify-center gap-1 mb-2">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Custom" && <span className="text-slate-400">/month</span>}
        </div>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>

      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
              <Check className="h-3 w-3 text-purple-400" />
            </div>
            <span className="text-slate-300 text-sm">{feature}</span>
          </div>
        ))}
      </div>

      <Button
        className={`w-full ${
          buttonVariant === "gradient"
            ? "bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0"
            : "border-slate-600 text-white hover:bg-slate-700"
        }`}
      >
        {buttonText}
      </Button>
    </motion.div>
  )
}

