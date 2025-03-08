import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

// GET all courses
export async function GET() {
  try {
    const courses = await prisma.generatedCourse.findMany({
      select: { id: true, title: true, createdAt: true }
    })
    return NextResponse.json(courses)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    )
  }
}

// Create new course
export async function POST(req: Request) {
  try {
    const { title, content } = await req.json()
    
    const course = await prisma.generatedCourse.create({
      data: { title, content }
    })
    
    return NextResponse.json(course)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save course" },
      { status: 500 }
    )
  }
}

// GET single course by ID
export async function GETById(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const course = await prisma.generatedCourse.findUnique({
      where: { id: params.id }
    })

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(course)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    )
  }
}