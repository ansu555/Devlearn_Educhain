"use client"

import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Share2, ThumbsUp } from "lucide-react"
import { useToast } from "../../hooks/use-toast"
import { shareToCommmunity } from "../../lib/action"
import type { ContentUnit } from "../../lib/types"

export function ContentDisplay() {
  const [contents, setContents] = useState<
    {
      id: string
      title: string
      units: ContentUnit[]
      shared: boolean
    }[]
  >([])
  const { toast } = useToast()

  useEffect(() => {
    // Function to load contents from localStorage
    const loadContents = () => {
      try {
        const storedContents = localStorage.getItem("generatedContents")
        if (storedContents) {
          setContents(JSON.parse(storedContents))
        }
      } catch (error) {
        console.error("Error loading contents:", error)
      }
    }

    // Load contents initially
    loadContents()

    // Add event listener for storage changes
    window.addEventListener("storage", loadContents)

    // Cleanup
    return () => {
      window.removeEventListener("storage", loadContents)
    }
  }, [])

  const handleShare = async (contentId: string) => {
    try {
      await shareToCommmunity(contentId)

      // Update local storage
      const storedContents = JSON.parse(localStorage.getItem("generatedContents") || "[]")
      const updatedContents = storedContents.map((content: any) =>
        content.id === contentId ? { ...content, shared: true } : content,
      )
      localStorage.setItem("generatedContents", JSON.stringify(updatedContents))

      // Update community contents
      const communityContents = JSON.parse(localStorage.getItem("communityContents") || "[]")
      const contentToShare = storedContents.find((c: any) => c.id === contentId)
      if (contentToShare && !communityContents.some((c: any) => c.id === contentId)) {
        localStorage.setItem(
          "communityContents",
          JSON.stringify([
            ...communityContents,
            {
              ...contentToShare,
              shared: true,
              votes: { upvotes: 0, downvotes: 0 },
              userVote: null,
            },
          ]),
        )
      }

      // Update state
      setContents(updatedContents)

      toast({
        title: "Content shared!",
        description: "Your content has been shared to the community page.",
      })
    } catch (error) {
      toast({
        title: "Error sharing content",
        description: "There was an error sharing your content.",
        variant: "destructive",
      })
    }
  }

  if (contents.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="pt-6 text-center text-muted-foreground">
          <p>No content generated yet. Use the form above to create some!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {contents.map((content) => (
        <Card key={content.id} className="overflow-hidden">
          <CardHeader className="bg-muted/50">
            <div className="flex justify-between items-center">
              <CardTitle>{content.title}</CardTitle>
              <Button variant="outline" size="sm" onClick={() => handleShare(content.id)} disabled={content.shared}>
                {content.shared ? (
                  <span className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Shared
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share to Community
                  </span>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="unit-1">
              <TabsList className="w-full justify-start border-b rounded-none h-auto flex-wrap">
                {content.units.map((unit, index) => (
                  <TabsTrigger
                    key={`unit-${index + 1}`}
                    value={`unit-${index + 1}`}
                    className="data-[state=active]:bg-background"
                  >
                    Unit {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>

              {content.units.map((unit, unitIndex) => (
                <TabsContent key={`unit-${unitIndex + 1}`} value={`unit-${unitIndex + 1}`} className="p-4 space-y-4">
                  <h3 className="text-xl font-semibold">{unit.title}</h3>

                  {unit.subparts.map((subpart, subpartIndex) => (
                    <div key={`subpart-${subpartIndex}`} className="border-l-2 pl-4 py-2">
                      <h4 className="font-medium mb-2">{subpart.title}</h4>
                      <p className="text-muted-foreground">{subpart.content}</p>
                    </div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

