"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams} from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

const CoursePage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [course, setCourse] = useState<{ name: string; detail: string; subunits: string[] } | null>(null);

  useEffect(() => {
    const courseName = searchParams.get("course");
    if (courseName) {
      const courseData = JSON.parse(localStorage.getItem(`course-${courseName}`) || "{}");
      if (courseData.name) {
        setCourse(courseData);
      } else {
        router.push("/CourseSearch"); // Redirect if no course found
      }
    }
  }, [searchParams, router]);

  if (!course) {
    return <div className="text-center text-white mt-10">Loading course details...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-6">
      <div className="container max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-purple-400">{course.name}</h2>
        <p className="text-gray-400 mt-4">{course.detail}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {course.subunits.map((subunit, index) => (
            <Card key={index} className="bg-gray-800 border border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-purple-300">{subunit}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Learn about {subunit} in depth, including its applications and use cases.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          onClick={() => router.push("/CourseSearch")}
          className="mt-6 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-md"
        >
          Back to Search
        </Button>
      </div>
    </div>
  );
};

export default CoursePage;
