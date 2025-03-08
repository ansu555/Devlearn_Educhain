"use client";

import { useState, useEffect } from "react";
import { Search, Code, BookOpen, Award, ChevronRight, Filter, ArrowUpRight, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";

export default function CourseExplorer() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // AI Integration States
  const [aiPrompt, setAiPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter courses
  useEffect(() => {
    let result = courses;

    if (searchQuery) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((course) => course.category === selectedCategory);
    }

    setFilteredCourses(result);
  }, [searchQuery, selectedCategory]);

  // Handle AI Generation
  const handleAIGenerate = async () => {
    if (!aiPrompt) return;

    setIsGenerating(true);
    setShowAIModal(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Create a detailed learning path about: ${aiPrompt}. 
          Include course objectives, key topics, and recommended resources.
          Format using markdown headings and bullet points.`,
        }),
      });

      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (error) {
      console.error("Generation failed:", error);
      setGeneratedContent("Failed to generate content. Please try again.");
    }

    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Header */}
      <header className="fixed w-full z-50 bg-slate-900/90 backdrop-blur-md py-3 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg animate-pulse"></div>
              <div className="absolute inset-0.5 bg-slate-900 rounded-lg flex items-center justify-center">
                <Code className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              DevLearn
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: "Features", path: "#features" },
              { name: "Courses", path: "/CourseExplorer" },
              { name: "Pricing", path: "#pricing" },
              { name: "Community", path: "#community" },
              { name: "Problems", path: "/Challanges" },
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
              <Button
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0"
                onClick={() => router.push("../signup")}
              >
                Sign in
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
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
                { name: "Problems", path: "/playground/react" },
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
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 pt-20"
        >
          <h1 className="text-4xl font-bold mb-4">Explore Our Courses</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover top-quality courses to master blockchain development and earn verified credentials that are
            recognized by leading Web3 employers.
          </p>
        </motion.div>

        {/* AI Course Generator Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 p-6 bg-slate-800/50 rounded-xl border border-slate-700"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <Input
                placeholder="What do you want to learn? (e.g., 'Blockchain basics for beginners')"
                className="bg-slate-900 border-slate-700 text-white"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
            </div>
            <Button
  onClick={handleAIGenerate}
  disabled={!aiPrompt || isGenerating}
  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
>
  {isGenerating ? (
    <div className="flex items-center gap-2">
      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
      Generating Detailed Curriculum...
    </div>
  ) : (
    "Generate Full Curriculum"
  )}
</Button>
          </div>
        </motion.div>

        {/* Course Cards */}
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
            ) : filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
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
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
                <p className="text-gray-400">No courses found matching your search criteria.</p>
                <Button
                  variant="link"
                  className="text-purple-400 mt-2"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

       {/* AI Generated Content Modal */}
<AnimatePresence>
  {showAIModal && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setShowAIModal(false)}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-slate-900 rounded-xl max-w-4xl w-full p-6 border border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">AI Learning Path</h3>
          <button 
            onClick={() => setShowAIModal(false)}
            className="text-slate-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="prose prose-invert max-h-[70vh] overflow-y-auto">
          {generatedContent ? (
            <div className="space-y-8">
              {generatedContent.split('\n## ').map((section, sectionIndex) => {
                const [unitTitle, ...unitContent] = section.split('\n### ');
                return (
                  <div key={sectionIndex} className="border-b border-slate-700 pb-6">
                    {sectionIndex === 0 ? (
                      <h1 className="text-3xl font-bold mb-4">{unitTitle}</h1>
                    ) : (
                      <>
                        <h2 className="text-2xl font-semibold mb-4">
                          Unit {sectionIndex}: {unitTitle.replace('## ', '')}
                        </h2>
                        {unitContent.map((subpart, subpartIndex) => {
                          const [subpartTitle, ...subpartContent] = subpart.split('\n');
                          return (
                            <div key={subpartIndex} className="ml-4 mb-6">
                              <h3 className="text-xl font-medium mb-3 text-purple-400">
                                {subpartTitle.replace('### ', '')}
                              </h3>
                              <div className="space-y-3 text-slate-300">
                                {subpartContent.join('\n').split('\n').map((line, lineIndex) => (
                                  <p key={lineIndex}>{line}</p>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <div className="animate-pulse">Generating detailed curriculum...</div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
      </main>
    </div>
  );
}

// Sample course data
const courses = [
  {
    id: 1,
    title: "Solidity Smart Contract Development",
    description: "Learn to build secure and efficient smart contracts on Ethereum",
    level: "Intermediate",
    duration: "8 weeks",
    modules: 12,
    credentials: "Verified Smart Contract Developer",
    category: "smart-contracts",
  },
  {
    id: 2,
    title: "Blockchain Fundamentals",
    description: "Master the core concepts of blockchain technology",
    level: "Beginner",
    duration: "6 weeks",
    modules: 10,
    credentials: "Blockchain Foundation Certificate",
    category: "blockchain",
  },
  {
    id: 3,
    title: "Web3.js & Ethers.js Mastery",
    description: "Build decentralized applications with JavaScript libraries",
    level: "Intermediate",
    duration: "5 weeks",
    modules: 8,
    credentials: "Web3 Developer Certificate",
    category: "web3",
  },
  {
    id: 4,
    title: "DeFi Protocol Development",
    description: "Create your own decentralized finance applications",
    level: "Advanced",
    duration: "10 weeks",
    modules: 15,
    credentials: "DeFi Architect Certificate",
    category: "defi",
  },
  {
    id: 5,
    title: "Zero-Knowledge Proofs",
    description: "Implement privacy-preserving solutions with ZK proofs",
    level: "Advanced",
    duration: "7 weeks",
    modules: 9,
    credentials: "ZK Developer Certificate",
    category: "blockchain",
  },
  {
    id: 6,
    title: "Smart Contract Security & Auditing",
    description: "Learn to identify and fix vulnerabilities in smart contracts",
    level: "Advanced",
    duration: "8 weeks",
    modules: 12,
    credentials: "Smart Contract Security Expert",
    category: "smart-contracts",
  },
]
