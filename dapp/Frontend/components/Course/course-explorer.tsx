"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { courses } from "../../lib/data"
import Navbar from "../../components/Course/navbar"
import SearchAndFilter from "../../components/Course/search-and-filter"
import CourseGrid from "../../components/Course/course-grid"
import FeaturedCta from "../../components/Course/featured-cta"

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

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
  }

  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <Navbar />

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

        <SearchAndFilter
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
        />

        <CourseGrid courses={filteredCourses} isLoading={isLoading} onClearFilters={clearFilters} />

        <FeaturedCta />
      </main>
    </div>
  )
}

