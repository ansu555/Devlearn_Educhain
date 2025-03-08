"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Search, BookOpen, Award, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"

export default function CourseExplorer() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCourses, setFilteredCourses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/courses") // Fetch from backend API
      const data = await response.json()
      setFilteredCourses(data)
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <main className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold mb-4 text-center">Explore Our Courses</h1>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-center">
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
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {isLoading ? (
              <p className="text-center">Loading courses...</p>
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
                    <CardHeader>
                      <Badge className="bg-purple-600 hover:bg-purple-700">{course.level}</Badge>
                      <CardTitle className="text-xl mt-2">{course.title}</CardTitle>
                      <CardDescription className="text-gray-400">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.modules} modules</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                        onClick={() => router.push(`/course/${course.id}`)}>
                        Explore Course
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-400">No courses found</p>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
