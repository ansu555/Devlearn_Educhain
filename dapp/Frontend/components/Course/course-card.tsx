"use client"

import { motion } from "framer-motion"
import { BookOpen, Award, ChevronRight } from "lucide-react"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import type { Course } from "../../lib/type"

interface CourseCardProps {
  course: Course
  index: number
}

export default function CourseCard({ course, index }: CourseCardProps) {
  return (
    <motion.div
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
  )
}

