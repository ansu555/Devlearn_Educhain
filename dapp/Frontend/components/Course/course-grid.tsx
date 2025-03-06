"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../../components/ui/button"
import CourseCard from "../../components/Course/course-card"
import type { Course } from "../../lib/type"

interface CourseGridProps {
  courses: Course[]
  isLoading: boolean
  onClearFilters: () => void
}

export default function CourseGrid({ courses, isLoading, onClearFilters }: CourseGridProps) {
  return (
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
        ) : courses.length > 0 ? (
          courses.map((course, index) => <CourseCard key={course.id} course={course} index={index} />)
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
            <p className="text-gray-400">No courses found matching your search criteria.</p>
            <Button variant="link" className="text-purple-400 mt-2" onClick={onClearFilters}>
              Clear filters
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

