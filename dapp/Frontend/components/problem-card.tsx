import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"
import type { Problem } from "../lib/problems"
import { cn } from "../lib/utils"
import { CheckCircle, Clock, Users } from "lucide-react"
import Link from "next/link"

interface ProblemCardProps {
  problem: Problem
}

export function ProblemCard({ problem }: ProblemCardProps) {
  const difficultyColor = {
    easy: "bg-green-500/10 text-green-500 border-green-500/20",
    medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    hard: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  return (
    <Link href={`/problems/${problem.id}`}>
      <Card className="h-full overflow-hidden border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg line-clamp-1">{problem.title}</h3>
            <Badge
              variant="outline"
              className={cn("ml-2 capitalize", difficultyColor[problem.difficulty as keyof typeof difficultyColor])}
            >
              {problem.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="text-muted-foreground text-sm line-clamp-2">{problem.description}</p>
        </CardContent>
        <CardFooter className="border-t border-border pt-4 text-xs text-muted-foreground">
          <div className="flex justify-between w-full">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{problem.timeEstimate} min</span>
            </div>
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              <span>{problem.solvedCount} solved</span>
            </div>
            {problem.solved && (
              <div className="flex items-center text-green-500">
                <CheckCircle className="h-3 w-3 mr-1" />
                <span>Solved</span>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

