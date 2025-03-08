"use client"

import { Search, Code, X, Menu } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import ChallengesList from "../../components/Challanges/page"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { motion } from "framer-motion"

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
    {/* Header */}
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? "bg-slate-900/90 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="relative h-10 w-10">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg animate-pulse"></div>
            <div className="absolute inset-0.5 bg-slate-900 rounded-lg flex items-center justify-center">
              <Code className="h-6 w-6 text-cyan-400" />
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            DevLearn
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { name: "Features", path: "#features" },
            { name: "Courses", path: "/CourseExplorer" },
            { name: "Pricing", path: "#pricing" },
            { name: "Community", path: "#community" },
            { name: "Problems", path: "/Challanges" }
          ].map((item, index) => (
              <motion.a
                key={item.name}
                href={item.path}
                onClick={(e) => {
                  if (item.path.startsWith("/")) {
                    e.preventDefault()
                    router.push(item.path)
                  }
                }}
              className="text-sm font-medium text-slate-300 hover:text-white relative group"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0"  onClick={() => router.push('../signup')}>
              Sign in
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => {setIsMenuOpen(!isMenuOpen); router.push('/signup');}}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-800 shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {[
              { name: "Features", path: "#features" },
              { name: "Courses", path: "/CourseExplorer" },
              { name: "Pricing", path: "#pricing" },
              { name: "Community", path: "#community" },
              { name: "Problems", path: "/playground/react" }  // Update this path
            ].map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => {
                  setIsMenuOpen(false)
                  if (item.path.startsWith("/")) {
                    e.preventDefault()
                    router.push(item.path)
                  }
                }}
                className="text-sm font-medium text-slate-300 hover:text-white py-2"
              >
                {item.name}
              </a>
            ))}
            <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 w-full">
              Get Started
            </Button>
          </div>
        </motion.div>
      )}
    </header>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 pt-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Coding </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Challenges
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              Test your skills with our curated collection of coding challenges. From blockchain to web development,
              level up your abilities and earn verified credentials.
            </p>
          </div>

          <div className="relative mb-12">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search challenges by name, technology, or difficulty..."
              className="pl-10 py-6 bg-[#161830] border-[#2a2d4a] w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <ChallengesList />
        </div>
      </main>
    </div>
  )
}

