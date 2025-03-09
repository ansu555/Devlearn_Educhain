'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'

interface Course {
  id: string
  title: string
  createdAt: string
}

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`/api/courses`)
        const data = await response.json()
        console.log(data);
        setCourses(data)
      } catch (error) {
        console.error('Error fetching courses:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  if (loading) return <div className="p-4">Loading courses...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Saved Courses</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded-lg">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Created At</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-800">
                <td className="px-6 py-4">
                  {/* Changed from /courses/ to /course/ */}
                  <Link 
                    href={`/course/${course.id.replace(/-/g, '')}`}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    {course.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-400">
                  {format(new Date(course.createdAt), 'MMM dd, yyyy HH:mm')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}