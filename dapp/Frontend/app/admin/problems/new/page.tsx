"use client"

import type React from "react"

import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import { Textarea } from "../../../../components/ui/textarea"
import { ArrowLeft, Plus, Save, Trash } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "../../../../hooks/use-toast"

export default function NewProblemPage() {
  const [examples, setExamples] = useState([{ input: "", output: "", explanation: "" }])
  const [constraints, setConstraints] = useState([""])
  const { toast } = useToast()

  const addExample = () => {
    setExamples([...examples, { input: "", output: "", explanation: "" }])
  }

  const removeExample = (index: number) => {
    setExamples(examples.filter((_, i) => i !== index))
  }

  const updateExample = (index: number, field: string, value: string) => {
    const updatedExamples = [...examples]
    updatedExamples[index] = { ...updatedExamples[index], [field]: value }
    setExamples(updatedExamples)
  }

  const addConstraint = () => {
    setConstraints([...constraints, ""])
  }

  const removeConstraint = (index: number) => {
    setConstraints(constraints.filter((_, i) => i !== index))
  }

  const updateConstraint = (index: number, value: string) => {
    const updatedConstraints = [...constraints]
    updatedConstraints[index] = value
    setConstraints(updatedConstraints)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the data to your API
    toast({
      title: "Problem created",
      description: "Your problem has been created successfully.",
    })
  }

  return (
    <div className="container mx-auto py-8 min-h-screen bg-background text-foreground">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-2">
          <Link href="/admin/problems">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Create New Problem
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full max-w-md">
              <TabsTrigger value="details" className="flex-1">
                Problem Details
              </TabsTrigger>
              <TabsTrigger value="examples" className="flex-1">
                Examples
              </TabsTrigger>
              <TabsTrigger value="testcases" className="flex-1">
                Test Cases
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6 space-y-6">
              <Card className="border border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the basic details of your coding problem</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Problem Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter a descriptive title"
                        className="bg-background border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Problem Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the problem in detail"
                        className="min-h-32 bg-background border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inputFormat">Input Format</Label>
                      <Textarea
                        id="inputFormat"
                        placeholder="Describe the input format"
                        className="min-h-20 bg-background border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="outputFormat">Output Format</Label>
                      <Textarea
                        id="outputFormat"
                        placeholder="Describe the output format"
                        className="min-h-20 bg-background border-border"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Constraints</CardTitle>
                  <CardDescription>Define the constraints for your problem</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {constraints.map((constraint, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={constraint}
                        onChange={(e) => updateConstraint(index, e.target.value)}
                        placeholder="e.g., 1 <= n <= 10^5"
                        className="bg-background border-border"
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeConstraint(index)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addConstraint} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Constraint
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="mt-6 space-y-6">
              <Card className="border border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Example Test Cases</CardTitle>
                  <CardDescription>Add examples to help users understand the problem</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {examples.map((example, index) => (
                    <div key={index} className="space-y-4 pb-4 border-b border-border last:border-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Example {index + 1}</h3>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeExample(index)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`example-input-${index}`}>Input</Label>
                        <Textarea
                          id={`example-input-${index}`}
                          value={example.input}
                          onChange={(e) => updateExample(index, "input", e.target.value)}
                          placeholder="Example input"
                          className="min-h-20 bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`example-output-${index}`}>Output</Label>
                        <Textarea
                          id={`example-output-${index}`}
                          value={example.output}
                          onChange={(e) => updateExample(index, "output", e.target.value)}
                          placeholder="Expected output"
                          className="min-h-20 bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`example-explanation-${index}`}>Explanation (Optional)</Label>
                        <Textarea
                          id={`example-explanation-${index}`}
                          value={example.explanation}
                          onChange={(e) => updateExample(index, "explanation", e.target.value)}
                          placeholder="Explain why this is the expected output"
                          className="min-h-20 bg-background border-border"
                        />
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addExample} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Example
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="testcases" className="mt-6 space-y-6">
              <Card className="border border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Hidden Test Cases</CardTitle>
                  <CardDescription>Add test cases that will be used to validate user solutions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-md">
                    <p className="text-sm text-muted-foreground">
                      Test cases are used to validate user solutions. These test cases will not be visible to users.
                    </p>
                  </div>

                  {/* Test case editor would go here - similar to examples but with more options */}
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Test case editor would be implemented here</p>
                    <p className="text-xs mt-2">
                      This would include input/output pairs, time limits, and memory limits
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-6 space-x-2">
            <Button variant="outline" asChild>
              <Link href="/admin/problems">Cancel</Link>
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Save Problem
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

