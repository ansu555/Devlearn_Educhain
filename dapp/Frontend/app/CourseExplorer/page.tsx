"use client"

import { useState, useEffect } from "react"
import { Search, Code, BookOpen, Award, ChevronRight, Filter, ArrowUpRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"

export default function CourseExplorer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let result = courses

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((course) => course.category === selectedCategory)
    }

    setFilteredCourses(result)
  }, [searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-[#111827] text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 p-2 rounded">
            <Code className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            DevLearn
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Features
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Courses
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Community
          </a>
        </nav>
        <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Explore Our Courses</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover top-quality courses to master blockchain development and earn verified credentials that are
            recognized by leading Web3 employers.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for courses..."
                className="pl-10 bg-gray-900 border-gray-700 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="border-gray-700 text-gray-300">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
            <TabsList className="bg-gray-900 border border-gray-800 p-1 mb-8">
              <TabsTrigger value="all" className="data-[state=active]:bg-purple-600">
                All Courses
              </TabsTrigger>
              <TabsTrigger value="blockchain" className="data-[state=active]:bg-purple-600">
                Blockchain
              </TabsTrigger>
              <TabsTrigger value="smart-contracts" className="data-[state=active]:bg-purple-600">
                Smart Contracts
              </TabsTrigger>
              <TabsTrigger value="web3" className="data-[state=active]:bg-purple-600">
                Web3
              </TabsTrigger>
              <TabsTrigger value="defi" className="data-[state=active]:bg-purple-600">
                DeFi
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-gray-900 rounded-lg h-[360px] animate-pulse"
                />
              ))
            ) : filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <Card className="bg-gray-900 border-gray-800 h-full flex flex-col overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge className="bg-purple-600 hover:bg-purple-700">{course.level}</Badge>
                        <Badge variant="outline" className="border-gray-700">
                          {course.duration}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mt-2">{course.title}</CardTitle>
                      <CardDescription className="text-gray-400">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.modules} modules</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Award className="h-4 w-4" />
                        <span>{course.credentials}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-gray-800 pt-4">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 group">
                        Explore Course
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
                <p className="text-gray-400">No courses found matching your search criteria.</p>
                <Button
                  variant="link"
                  className="text-purple-400 mt-2"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                >
                  Clear filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Featured Section */}
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
      </main>
    </div>
  )
}

// Sample course data
const courses = [
  {
    id: 1,
    title: "Solidity Smart Contract Development",
    description: "Learn to build secure and efficient smart contracts on Ethereum",
    level: "Intermediate",
    duration: "8 weeks",
    modules: 12,
    credentials: "Verified Smart Contract Developer",
    category: "smart-contracts",
  },
  {
    id: 2,
    title: "Blockchain Fundamentals",
    description: "Master the core concepts of blockchain technology",
    level: "Beginner",
    duration: "6 weeks",
    modules: 10,
    credentials: "Blockchain Foundation Certificate",
    category: "blockchain",
  },
  {
    id: 3,
    title: "Web3.js & Ethers.js Mastery",
    description: "Build decentralized applications with JavaScript libraries",
    level: "Intermediate",
    duration: "5 weeks",
    modules: 8,
    credentials: "Web3 Developer Certificate",
    category: "web3",
  },
  {
    id: 4,
    title: "DeFi Protocol Development",
    description: "Create your own decentralized finance applications",
    level: "Advanced",
    duration: "10 weeks",
    modules: 15,
    credentials: "DeFi Architect Certificate",
    category: "defi",
  },
  {
    id: 5,
    title: "Zero-Knowledge Proofs",
    description: "Implement privacy-preserving solutions with ZK proofs",
    level: "Advanced",
    duration: "7 weeks",
    modules: 9,
    credentials: "ZK Developer Certificate",
    category: "blockchain",
  },
  {
    id: 6,
    title: "Smart Contract Security & Auditing",
    description: "Learn to identify and fix vulnerabilities in smart contracts",
    level: "Advanced",
    duration: "8 weeks",
    modules: 12,
    credentials: "Smart Contract Security Expert",
    category: "smart-contracts",
  },
]

