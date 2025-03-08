import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function GET(
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