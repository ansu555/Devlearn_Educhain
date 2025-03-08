"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

const CourseSearch = () => {
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <div className="bg-[#111b2f] text-white min-h-screen flex flex-col">
      {/* Navigation Header */}
      <header className="w-full bg-[#0e1624] border-b border-[#2a3a59]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-white flex items-center">
              <span className="text-[#8257e6] mr-2">{"<>"}</span>
              DevLearn
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: "Features", path: "#features" },
              { name: "Courses", path: "/CourseExplorer" },
              { name: "Pricing", path: "#pricing" },
              { name: "Community", path: "#community" },
              { name: "Problems", path: "/Challanges" }
            ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => {
                    if (item.path.startsWith("/")) {
                      e.preventDefault();
                      router.push(item.path);
                    }
                  }}
                  className="text-sm font-medium text-slate-300 hover:text-white relative group"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
            ))}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0" onClick={() => router.push('../signup')}>
                Sign in
              </Button>
            </motion.div>
          </nav>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => {setIsMenuOpen(!isMenuOpen); router.push('/signup');}}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-800 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {[
                { name: "Features", path: "#features" },
                { name: "Courses", path: "/CourseExplorer" },
                { name: "Pricing", path: "#pricing" },
                { name: "Community", path: "#community" },
                { name: "Problems", path: "/playground/react" }  // Update this path
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    if (item.path.startsWith("/")) {
                      e.preventDefault();
                      router.push(item.path);
                    }
                  }}
                  className="text-sm font-medium text-slate-300 hover:text-white py-2"
                >
                  {item.name}
                </a>
              ))}
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 w-full">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center p-8">
        <div className="w-full max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">Explore Our Courses</h2>
          <p className="text-gray-400 mb-6">Discover top-quality courses to master blockchain development and earn verified credentials that are recognized by leading Web3 employers.</p>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Search for courses..."
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="border border-gray-700 bg-[#1a2639] text-white p-3 flex-1 rounded-md focus:ring-2 focus:ring-[#8257e6]"
            />
            <Button onClick={handleSearch} className="bg-[#8257e6] text-white px-6 py-3 rounded-md hover:bg-[#7349d1] transition">
              Add
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <Tabs defaultValue="all" className="w-full max-w-3xl mt-6" onValueChange={setSelectedCategory}>
          <TabsList className="bg-transparent p-1 mb-8 flex justify-center space-x-2">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#8257e6] bg-[#1a2639] text-white">All Courses</TabsTrigger>
            <TabsTrigger value="blockchain" className="data-[state=active]:bg-[#8257e6] bg-[#1a2639] text-white">Blockchain</TabsTrigger>
            <TabsTrigger value="smart-contracts" className="data-[state=active]:bg-[#8257e6] bg-[#1a2639] text-white">Smart Contracts</TabsTrigger>
            <TabsTrigger value="web3" className="data-[state=active]:bg-[#8257e6] bg-[#1a2639] text-white">Web3</TabsTrigger>
            <TabsTrigger value="defi" className="data-[state=active]:bg-[#8257e6] bg-[#1a2639] text-white">DeFi</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Display Filtered Courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((courseItem, index) => (
              <Card key={index} className="bg-[#1a2639] border border-[#2a3a59] rounded-lg shadow-lg overflow-hidden">
                <div className="bg-[#8257e6] h-1 w-full"></div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="bg-[#8257e6] rounded-full text-xs font-medium px-3 py-1 text-white w-fit">
                      {courseItem.category === "blockchain" ? "Blockchain" : 
                       courseItem.category === "smart-contracts" ? "Smart Contracts" : 
                       courseItem.category === "web3" ? "Web3" : 
                       courseItem.category === "defi" ? "DeFi" : "General"}
                    </div>
                    <div className="text-xs text-gray-400">8 weeks</div>
                  </div>
                  <CardTitle className="text-xl font-bold text-white">{courseItem.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4 text-sm">{courseItem.detail}</p>
                  <div className="flex items-center text-gray-400 text-xs mb-4">
                    <span className="mr-4">
                      <span className="inline-block mr-1">📚</span> 
                      10 modules
                    </span>
                    <span>
                      <span className="inline-block mr-1">🏆</span> 
                      Certificate
                    </span>
                  </div>
                  <Button onClick={() => handleExplore(courseItem)} className="bg-[#8257e6] hover:bg-[#7349d1] w-full">
                    Explore Course <span className="ml-1">→</span>
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-3">No courses found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSearch;
