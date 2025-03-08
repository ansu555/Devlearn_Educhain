// This is a mock implementation - in a real app, this would connect to your database
import type { Problem } from "./problems"

export interface UserProfile {
  id: string
  name: string
  avatar: string
  title: string
  social: {
    github?: string
    twitter?: string
    linkedin?: string
  }
  streakData: {
    currentStreak: number
    maxStreak: number
    lastActive: string
  }
  achievements: {
    id: string
    name: string
    description: string
    earnedAt: string
  }[]
  totalProblems: number
  easyProblems: number
  mediumProblems: number
  hardProblems: number
  submissions: {
    id: string
    problemId: string
    problemTitle: string
    status: "accepted" | "wrong_answer" | "time_limit_exceeded" | "runtime_error"
    language: string
    runtime: number
    memory: number
    submittedAt: string
  }[]
}

export interface SolvedProblem extends Problem {
  solvedAt: string
  score: number
  plagiarismScore: number
}

const mockUserProfile: UserProfile = {
  id: "user123",
  name: "Alex Johnson",
  avatar: "/placeholder.svg?height=200&width=200",
  title: "Full Stack Developer",
  social: {
    github: "https://github.com/alexjohnson",
    twitter: "https://twitter.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson",
  },
  streakData: {
    currentStreak: 7,
    maxStreak: 14,
    lastActive: "2023-04-15",
  },
  achievements: [
    {
      id: "first-solve",
      name: "First Blood",
      description: "Solved your first problem",
      earnedAt: "2023-01-15",
    },
    {
      id: "week-streak",
      name: "Consistency",
      description: "Maintained a 7-day streak",
      earnedAt: "2023-04-10",
    },
    {
      id: "ten-easy",
      name: "Warming Up",
      description: "Solved 10 easy problems",
      earnedAt: "2023-03-22",
    },
  ],
  totalProblems: 100,
  easyProblems: 40,
  mediumProblems: 40,
  hardProblems: 20,
  submissions: [
    {
      id: "sub1",
      problemId: "two-sum",
      problemTitle: "Two Sum",
      status: "accepted",
      language: "javascript",
      runtime: 76,
      memory: 42,
      submittedAt: "2023-04-15T14:30:00Z",
    },
    {
      id: "sub2",
      problemId: "longest-substring",
      problemTitle: "Longest Substring Without Repeating Characters",
      status: "wrong_answer",
      language: "python",
      runtime: 124,
      memory: 38,
      submittedAt: "2023-04-14T10:15:00Z",
    },
    {
      id: "sub3",
      problemId: "longest-substring",
      problemTitle: "Longest Substring Without Repeating Characters",
      status: "time_limit_exceeded",
      language: "python",
      runtime: 5000,
      memory: 40,
      submittedAt: "2023-04-13T16:45:00Z",
    },
  ],
}

const mockSolvedProblems: SolvedProblem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "easy",
    timeEstimate: 15,
    solvedCount: 1245,
    solved: true,
    solvedAt: "2023-04-15T14:30:00Z",
    score: 95,
    plagiarismScore: 5,
    inputFormat: "The first line contains an array of integers nums. The second line contains an integer target.",
    outputFormat: "Return indices of the two numbers such that they add up to target.",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    examples: [
      {
        input: "[2,7,11,15]\n9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "[3,2,4]\n6",
        output: "[1,2]",
      },
    ],
  },
]

export async function getUserProfile(): Promise<UserProfile> {
  // In a real app, fetch from your database
  return mockUserProfile
}

export async function getUserSolvedProblems(): Promise<SolvedProblem[]> {
  // In a real app, fetch from your database
  return mockSolvedProblems
}

