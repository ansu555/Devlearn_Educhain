"use client";

import { useState, useEffect } from "react";
import { Code, BookOpen, Award, ChevronRight, X, Menu, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  modules: number;
  credentials: string;
  category: string;
}

export default function CourseExplorer() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [selectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [completedCourses, setCompletedCourses] = useState<number[]>([]);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    
    // Check for connected wallet on component mount
    const storedAddress = localStorage.getItem("walletAddress");
    if (storedAddress) {
      setWalletAddress(storedAddress);
    }
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let result = courses;
    
    if (searchQuery) {
      result = result.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCourses(result);
  }, [searchQuery]);

  const handleAIGenerate = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    setShowAIModal(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt }),
      });
      
      const { content } = await response.json();
      setGeneratedContent(content);
    } catch (error) {
      console.error("Generation failed:", error);
      setGeneratedContent("Failed to generate content. Please try again.");
    }
    setIsGenerating(false);
  };

  const handleSaveCourse = async () => {
    if (!generatedContent) return;
    
    setSaveStatus("saving");
    try {
      const courseTitle = generatedContent.split("\n")[0].replace("#", "").trim();
      
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: courseTitle, content: generatedContent }),
      });

      if (!response.ok) throw new Error("Save failed");
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      console.error("Save error:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };

  const toggleCourseCompletion = (courseId: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent card click event from triggering
    setCompletedCourses(prev => 
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId) // Remove if already completed
        : [...prev, courseId]  // Add if not completed
    );
  };

  // Function to disconnect wallet
  const disconnectWallet = () => {
    localStorage.removeItem("walletAddress");
    setWalletAddress("");
  }

  // Function to format address for display
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <header className="fixed w-full z-50 bg-slate-900/90 backdrop-blur-md py-3 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg animate-pulse" />
              <div className="absolute inset-0.5 bg-slate-900 rounded-lg flex items-center justify-center">
                <Code className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              DevLearn
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: "Saved Courses", path: "/course" },
              { name: "Challenges", path: "/challenges" },
              { name: "Community", path: "#community" },
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
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
            
            {/* Add wallet display */}
            {walletAddress ? (
              <div className="flex items-center gap-2">
                <div className="bg-slate-800 border border-slate-700 rounded-full px-4 py-1 text-sm text-cyan-400">
                  {formatAddress(walletAddress)}
                </div>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="text-slate-400 hover:text-white"
                  onClick={disconnectWallet}
                  title="Disconnect wallet"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button 
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0"  
                onClick={() => router.push('../signup')}
              >
                Sign in
              </Button>
            )}
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-800 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {[
                { name: "Saved Courses", path: "/courses" },
                { name: "Challenges", path: "/challenges" },
                { name: "Community", path: "#community" },
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
            </div>
          </motion.div>
        )}
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 pt-20"
        >
          <h1 className="text-4xl font-bold mb-4">Explore Learning Paths</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Generate and save custom blockchain development courses powered by AI
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 p-6 bg-slate-800/50 rounded-xl border border-slate-700"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <Input
                placeholder="Describe your learning goals (e.g., 'Master Solidity security best practices')"
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
              {isGenerating ? "Generating..." : "Create Curriculum"}
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-gray-900 rounded-lg h-[360px] animate-pulse"
                />
              ))
            ) : filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="bg-gray-900 border-gray-800 h-full flex flex-col overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-600 hover:bg-purple-700">{course.level}</Badge>
                        <div 
                          onClick={(e) => toggleCourseCompletion(course.id, e)}
                          className={`w-6 h-6 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                            completedCourses.includes(course.id) 
                              ? 'bg-green-500 border-green-600' 
                              : 'bg-transparent border-gray-600 hover:border-gray-400'
                          }`}
                          title={completedCourses.includes(course.id) ? "Mark as incomplete" : "Mark as complete"}
                        >
                          {completedCourses.includes(course.id) && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </div>
                      </div>
                      <Badge variant="outline" className="border-gray-700">{course.duration}</Badge>
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
                      Explore Path
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

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
                  <h3 className="text-xl font-bold">Generated Curriculum</h3>
                  <button 
                    onClick={() => setShowAIModal(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="prose prose-invert max-h-[60vh] overflow-y-auto mb-4">
                  {generatedContent ? (
                    <div className="space-y-8">
                      {generatedContent.split(/\n## (?=Unit \d+:)/).map((section, sectionIndex) => {
                        const [unitTitle, ...unitContent] = section.split('\n### ');
                        return (
                          <div key={sectionIndex} className="border-b border-slate-700 pb-6">
                            {sectionIndex === 0 ? (
                              <h1 className="text-3xl font-bold mb-4">{unitTitle}</h1>
                            ) : (
                              <>
                                <h2 className="text-2xl font-semibold mb-4">
                                  {unitTitle.replace(/Unit \d+:\s*/i, '').trim()}
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
                      <div className="animate-pulse">Generating learning path...</div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleSaveCourse}
                  disabled={!generatedContent || saveStatus === 'saving'}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {saveStatus === 'saving' ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      Saving Curriculum...
                    </span>
                  ) : saveStatus === 'success' ? (
                    "✓ Saved Successfully"
                  ) : saveStatus === 'error' ? (
                    "⚠️ Save Failed - Try Again"
                  ) : (
                    "💾 Save to My Courses"
                  )}
                </Button>
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
    title: "Web3.js & Eethers.js Mastery",
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
