"use client"

import { useState } from "react"
import { Badge } from "../ui/badge"
import { Card } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

// Challenge type definition
type Challenge = {
  id: number
  title: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  technologies: string[]
  points: number
  completions: number
}

// Sample challenges data
const challenges: Challenge[] = [
  {
    id: 1,
    title: "Smart Contract Escrow",
    description: "Build a simple escrow smart contract using Solidity",
    difficulty: "Intermediate",
    technologies: ["Solidity", "Blockchain"],
    points: 150,
    completions: 0,
  },
  {
    id: 2,
    title: "Responsive Portfolio",
    description: "Create a responsive portfolio website using HTML and CSS",
    difficulty: "Beginner",
    technologies: ["HTML", "CSS"],
    points: 100,
    completions: 0,
  },
  {
    id: 3,
    title: "JavaScript Todo App",
    description: "Build a todo application with vanilla JavaScript",
    difficulty: "Beginner",
    technologies: ["JavaScript"],
    points: 120,
    completions: 0,
  },
  {
    id: 4,
    title: "NFT Marketplace",
    description: "Develop a simple NFT marketplace with ERC-721 tokens",
    difficulty: "Advanced",
    technologies: ["Solidity", "React", "Blockchain"],
    points: 250,
    completions: 0,
  },
  {
    id: 5,
    title: "React Weather App",
    description: "Create a weather application using React and a weather API",
    difficulty: "Intermediate",
    technologies: ["React", "API"],
    points: 180,
    completions: 0,
  },
  {
    id: 6,
    title: "Python Data Analysis",
    description: "Analyze a dataset using Python and create visualizations",
    difficulty: "Intermediate",
    technologies: ["Python", "Data Science"],
    points: 200,
    completions: 0,
  },
]

export default function ChallengesList() {
  const [activeTab, setActiveTab] = useState("all")

  // Get unique technologies for filter tabs
  const technologies = Array.from(new Set(challenges.flatMap((challenge) => challenge.technologies)))

  // Filter challenges based on active tab
  const filteredChallenges =
    activeTab === "all" ? challenges : challenges.filter((challenge) => challenge.technologies.includes(activeTab))

  return (
    <div>
      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="bg-[#161830] p-1 mb-6">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500"
          >
            All
          </TabsTrigger>
          {technologies.map((tech) => (
            <TabsTrigger
              key={tech}
              value={tech}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500"
            >
              {tech}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  // Map technology to its corresponding icon/color
  const getTechIcon = (tech: string) => {
    switch (tech.toLowerCase()) {
      case "javascript":
        return "/js-logo.svg"
      case "html":
        return "/html-logo.svg"
      case "css":
        return "/css-logo.svg"
      case "react":
        return "/react-logo.svg"
      case "solidity":
        return "/solidity-logo.svg"
      case "blockchain":
        return "/blockchain-logo.svg"
      case "python":
        return "/python-logo.svg"
      default:
        return "/code-logo.svg"
    }
  }

  // Map difficulty to color
  const difficultyColor = {
    Beginner: "bg-green-500",
    Intermediate: "bg-yellow-500",
    Advanced: "bg-red-500",
  }

  return (
    <Card className="bg-[#161830] border border-[#2a2d4a] overflow-hidden hover:border-blue-500 transition-all duration-300 group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2">
            {challenge.technologies.map((tech) => (
              <div key={tech} className="w-8 h-8 rounded-full bg-[#0f1124] p-1.5 flex items-center justify-center">
                <img
                  src={getTechIcon(tech) || "/placeholder.svg"}
                  alt={tech}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=24&width=24"
                  }}
                />
              </div>
            ))}
          </div>
          <Badge className={`${difficultyColor[challenge.difficulty]} text-white`}>{challenge.difficulty}</Badge>
        </div>

        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {challenge.title}
        </h3>

        <p className="text-gray-400 mb-4 text-sm">{challenge.description}</p>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1">
            <span className="text-purple-400 font-bold">{challenge.points}</span>
            <span className="text-gray-400 text-sm">points</span>
          </div>
          <div className="text-gray-400 text-sm">{challenge.completions} completions</div>
        </div>

        <button className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <span>Start Explorer</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
    </Card>
  )
}

