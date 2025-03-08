import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { getAllProblems } from "../../../lib/problems"
import { Edit, Plus, Search, Trash } from "lucide-react"
import Link from "next/link"

export default async function AdminProblemsPage() {
  const problems = await getAllProblems()

  return (
    <div className="container mx-auto py-8 min-h-screen bg-background text-foreground">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Problem Management
            </h1>
            <p className="text-muted-foreground mt-1">Create, edit, and manage coding problems</p>
          </div>
          <Button asChild>
            <Link href="/admin/problems/new">
              <Plus className="h-4 w-4 mr-2" />
              Add New Problem
            </Link>
          </Button>
        </div>

        <Card className="border border-border bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle>Problems</CardTitle>
            <CardDescription>Manage your coding problems and test cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search problems..." className="pl-10 bg-background border-border" />
              </div>
            </div>
            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Solved Count</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {problems.map((problem) => (
                    <TableRow key={problem.id}>
                      <TableCell className="font-medium">{problem.title}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${
                            problem.difficulty === "easy"
                              ? "bg-green-500/10 text-green-500"
                              : problem.difficulty === "medium"
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {problem.difficulty}
                        </span>
                      </TableCell>
                      <TableCell>{problem.solvedCount}</TableCell>
                      <TableCell>Apr 23, 2023</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

