'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface Course {
  id: string
  title: string
  content: string
  createdAt: string
}

export default function CourseDetail() {
  const { id } = useParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fix the UUID format conversion
  // Account for params possibly being a string or string[]
  const originalId = typeof id === 'string' 
    ? id.replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, "$1-$2-$3-$4-$5") 
    : id[0].replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, "$1-$2-$3-$4-$5")

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${originalId}`)
        if (!response.ok) {
          throw new Error(response.status === 404 ? 'Course not found' : 'Failed to fetch course')
        }
        const data = await response.json()
        setCourse(data)
      } catch (error) {
        console.error('Error fetching course:', error)
        setError(error instanceof Error ? error.message : 'An error occurred')
      }
    }
    fetchCourse()
  }, [originalId])

  if (error) return <div className="p-4 text-red-500">{error}</div>
  if (!course) return <div className="p-4">Loading course...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <div className="prose prose-invert max-w-none">
        {course.content.split('\n## ').map((section, sectionIndex) => {
          const [heading, ...content] = section.split('\n### ')
          return (
            <div key={sectionIndex} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {heading.replace('## ', '')}
              </h2>
              {content.map((subsection, subsectionIndex) => (
                <div key={subsectionIndex} className="ml-4 mb-6">
                  <h3 className="text-xl font-medium mb-3 text-purple-400">
                    {subsection.split('\n')[0]?.replace('### ', '')}
                  </h3>
                  <div className="space-y-2">
                    {subsection.split('\n').slice(1).map((line, lineIndex) => (
                      <p key={lineIndex}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}