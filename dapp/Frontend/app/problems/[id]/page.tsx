import { CodeEditor } from "../../../components/code-editor"
import { Terminal } from "../../../components/ terminal"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { Card } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { getProblemById } from "../../../lib/problems"
import { cn } from "../../../lib/utils"
import { ArrowLeft, BookOpen, Code, FileText, TerminalIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface ProblemPageProps {
  params: {
    id: string
  }
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const problem = await getProblemById(params.id)

  if (!problem) {
    notFound()
  }

  const difficultyColor = {
    easy: "bg-green-500/10 text-green-500 border-green-500/20",
    medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    hard: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  return (
    <div className="container mx-auto py-4 min-h-screen bg-background text-foreground">
      <div className="flex flex-col h-[calc(100vh-2rem)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/problems">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{problem.title}</h1>
            <Badge
              variant="outline"
              className={cn("ml-2 capitalize", difficultyColor[problem.difficulty as keyof typeof difficultyColor])}
            >
              {problem.difficulty}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              Hints
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Solutions
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 h-full">
          <Card className="border border-border bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col">
            <Tabs defaultValue="description" className="flex flex-col h-full">
              <div className="border-b border-border">
                <TabsList className="bg-transparent h-12 w-full justify-start rounded-none">
                  <TabsTrigger value="description" className="data-[state=active]:bg-background/50">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Description
                  </TabsTrigger>
                  <TabsTrigger value="examples" className="data-[state=active]:bg-background/50">
                    <Code className="h-4 w-4 mr-2" />
                    Examples
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="description" className="flex-1 p-4 overflow-auto">
                <div className="prose prose-invert max-w-none">
                  <h2>Problem Statement</h2>
                  <p>{problem.description}</p>
                  <h3>Input Format</h3>
                  <p>{problem.inputFormat}</p>
                  <h3>Output Format</h3>
                  <p>{problem.outputFormat}</p>
                  <h3>Constraints</h3>
                  <ul>
                    {problem.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="examples" className="flex-1 p-4 overflow-auto">
                <div className="space-y-6">
                  {problem.examples.map((example, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-medium">Example {index + 1}</h3>
                      <div className="space-y-4">
                        <div className="bg-muted/30 p-3 rounded-md">
                          <p className="text-xs text-muted-foreground mb-1">Input:</p>
                          <pre className="text-sm whitespace-pre-wrap">{example.input}</pre>
                        </div>
                        <div className="bg-muted/30 p-3 rounded-md">
                          <p className="text-xs text-muted-foreground mb-1">Output:</p>
                          <pre className="text-sm whitespace-pre-wrap">{example.output}</pre>
                        </div>
                        {example.explanation && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Explanation:</p>
                            <p className="text-sm">{example.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          <div className="flex flex-col space-y-4 h-full">
            <Card className="border border-border bg-card/50 backdrop-blur-sm flex-1 overflow-hidden flex flex-col">
              <CodeEditor problemId={problem.id} />
            </Card>
            <Card className="border border-border bg-card/50 backdrop-blur-sm h-1/3 overflow-hidden flex flex-col">
              <div className="flex items-center px-4 py-2 border-b border-border">
                <TerminalIcon className="h-4 w-4 mr-2" />
                <h3 className="font-medium">Terminal</h3>
              </div>
              <div className="flex-1 p-0 overflow-hidden">
                <Terminal />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

