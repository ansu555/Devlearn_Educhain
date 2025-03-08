"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Textarea } from "../../components/ui/textarea"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Loader2 } from "lucide-react"
import { generateContent } from "../../lib/action"
import { useToast } from "../../hooks/use-toast"

export function ContentGenerator() {
  const [prompt, setPrompt] = useState("")
  const [title, setTitle] = useState("")
  const [units, setUnits] = useState(3)
  const [subparts, setSubparts] = useState(2)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!prompt || !title) return

    setIsGenerating(true)
    try {
      const result = await generateContent({
        prompt,
        title,
        units,
        subparts,
      })

      if (result.success && result.content) {
        // Save to local storage
        const storedContents = JSON.parse(localStorage.getItem("generatedContents") || "[]")
        localStorage.setItem("generatedContents", JSON.stringify([...storedContents, result.content]))

        // Trigger a re-render of the content display
        window.dispatchEvent(new Event("storage"))

        toast({
          title: "Content generated!",
          description: "Your content has been generated successfully.",
        })

        // Reset form
        setPrompt("")
        setTitle("")
      }
    } catch (error) {
      console.error("Error generating content:", error)
      toast({
        title: "Error generating content",
        description:
          error instanceof Error ? error.message : "There was an error generating your content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Content Title</Label>
        <Input
          id="title"
          placeholder="Enter a title for your content"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="prompt">Prompt</Label>
        <Textarea
          id="prompt"
          placeholder="Enter your prompt for AI content generation..."
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="units">Number of Units</Label>
          <Input
            id="units"
            type="number"
            min={1}
            max={5}
            value={units}
            onChange={(e) => setUnits(Number.parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subparts">Subparts per Unit</Label>
          <Input
            id="subparts"
            type="number"
            min={1}
            max={5}
            value={subparts}
            onChange={(e) => setSubparts(Number.parseInt(e.target.value))}
          />
        </div>
      </div>

      <Button className="w-full" onClick={handleGenerate} disabled={isGenerating || !prompt || !title}>
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          "Generate Content"
        )}
      </Button>
    </div>
  )
}

