"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

const CourseSearch = () => {
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(savedCourses);
  }, []);

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const generateCourseDetail = (courseName) => {
    return `This course provides an in-depth understanding of ${courseName}. Learn about its core principles, applications, and real-world use cases.`;
  };

  const handleSearch = () => {
    if (course.trim() !== "") {
      const category = determineCategory(course);
      const newCourse = {
        name: course,
        category,
        detail: generateCourseDetail(course),
        subunits: [
          `Introduction to ${course}`,
          `Advanced Concepts in ${course}`,
          `Applications of ${course}`,
          `Future of ${course}`,
        ],
      };

      setCourses([...courses, newCourse]);
      setCourse("");
    }
  };

  const handleExplore = (course) => {
    localStorage.setItem("selectedCourse", JSON.stringify(course));
    router.push(`/CourseExplorer/${encodeURIComponent(course.name)}`);
  };

  const determineCategory = (courseName) => {
    if (courseName.toLowerCase().includes("blockchain")) return "blockchain";
    if (courseName.toLowerCase().includes("smart contract")) return "smart-contracts";
    if (courseName.toLowerCase().includes("web3")) return "web3";
    if (courseName.toLowerCase().includes("defi")) return "defi";
    return "all";
  };

  const filteredCourses = selectedCategory === "all"
    ? courses
    : courses.filter((course) => course.category === selectedCategory);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-6 max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Explore Our Courses</h2>
        <p className="text-gray-400 mb-6">Discover top-quality courses to master blockchain development.</p>

        <Input
          type="text"
          placeholder="Search for a course..."
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="border border-gray-700 bg-gray-800 text-white p-3 w-full mb-4 rounded-md focus:ring-2 focus:ring-purple-500"
        />

        <Button onClick={handleSearch} className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600 transition">
          Add Course
        </Button>

        {/* 🔹 CATEGORY FILTERS */}
        <Tabs defaultValue="all" className="w-full mt-6" onValueChange={setSelectedCategory}>
          <TabsList className="bg-gray-900 border border-gray-800 p-1 mb-8">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-600">All Courses</TabsTrigger>
            <TabsTrigger value="blockchain" className="data-[state=active]:bg-purple-600">Blockchain</TabsTrigger>
            <TabsTrigger value="smart-contracts" className="data-[state=active]:bg-purple-600">Smart Contracts</TabsTrigger>
            <TabsTrigger value="web3" className="data-[state=active]:bg-purple-600">Web3</TabsTrigger>
            <TabsTrigger value="defi" className="data-[state=active]:bg-purple-600">DeFi</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 🔹 DISPLAY FILTERED COURSES */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((courseItem, index) => (
            <Card key={index} className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-purple-400">{courseItem.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">{courseItem.detail}</p>
                <Button onClick={() => handleExplore(courseItem)} className="bg-blue-500 w-full">
                  Explore Course
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-3">No courses available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CourseSearch;
