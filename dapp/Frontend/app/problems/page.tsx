import { ProblemCard } from "../../components/problem-card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { getAllProblems } from "../../lib/problems"
import { Search } from "lucide-react"

export default async function ProblemsPage() {
  const problems = await getAllProblems()

  return (
    <div className="container mx-auto py-8 min-h-screen bg-background text-foreground">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Problem Bank
          </h1>
          <p className="text-muted-foreground">Sharpen your coding skills with our curated collection of problems</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search problems..." className="pl-10 bg-background border-border" />
          </div>
          <Button variant="outline">Filters</Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="all" className="flex-1">
              All Problems
            </TabsTrigger>
            <TabsTrigger value="easy" className="flex-1">
              Easy
            </TabsTrigger>
            <TabsTrigger value="medium" className="flex-1">
              Medium
            </TabsTrigger>
            <TabsTrigger value="hard" className="flex-1">
              Hard
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {problems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="easy" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {problems
                .filter((problem) => problem.difficulty === "easy")
                .map((problem) => (
                  <ProblemCard key={problem.id} problem={problem} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="medium" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {problems
                .filter((problem) => problem.difficulty === "medium")
                .map((problem) => (
                  <ProblemCard key={problem.id} problem={problem} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="hard" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {problems
                .filter((problem) => problem.difficulty === "hard")
                .map((problem) => (
                  <ProblemCard key={problem.id} problem={problem} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

