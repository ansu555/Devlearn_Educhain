"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Badge } from "../../components/ui/badge"
import type { ContentUnit } from "../../lib/types"
import { voteOnContent } from "../../lib/action"
export function CommunityContentList() {
  const [communityContents, setCommunityContents] = useState<
    {
      id: string
      title: string
      units: ContentUnit[]
      votes: { upvotes: number; downvotes: number }
      userVote: "up" | "down" | null
    }[]
  >([])

  useEffect(() => {
    // In a real app, this would fetch from a database
    const fetchCommunityContents = async () => {
      try {
        // Mock data for demonstration
        const storedContents = localStorage.getItem("communityContents")
        if (storedContents) {
          setCommunityContents(JSON.parse(storedContents))
        } else {
          // Sample data if nothing is stored
          setCommunityContents([
            {
              id: "sample-1",
              title: "Introduction to Machine Learning",
              units: [
                {
                  title: "Basics of ML",
                  subparts: [
                    {
                      title: "What is Machine Learning?",
                      content:
                        "Machine learning is a branch of artificial intelligence that focuses on building systems that learn from data.",
                    },
                    {
                      title: "Types of ML",
                      content:
                        "The main types are supervised learning, unsupervised learning, and reinforcement learning.",
                    },
                  ],
                },
                {
                  title: "Applications",
                  subparts: [
                    {
                      title: "Healthcare",
                      content: "ML is used for disease prediction, medical imaging analysis, and drug discovery.",
                    },
                    {
                      title: "Finance",
                      content: "Applications include fraud detection, algorithmic trading, and credit scoring.",
                    },
                  ],
                },
              ],
              votes: { upvotes: 12, downvotes: 3 },
              userVote: null,
            },
          ])
        }
      } catch (error) {
        console.error("Error fetching community contents:", error)
      }
    }

    fetchCommunityContents()
  }, [])

  const handleVote = async (contentId: string, voteType: "up" | "down") => {
    try {
      await voteOnContent(contentId, voteType)

      // Update local state
      setCommunityContents((prev) =>
        prev.map((content) => {
          if (content.id === contentId) {
            const currentVote = content.userVote
            let upvotes = content.votes.upvotes
            let downvotes = content.votes.downvotes

            // Remove previous vote if exists
            if (currentVote === "up") upvotes--
            if (currentVote === "down") downvotes--

            // Add new vote
            if (voteType === "up") upvotes++
            if (voteType === "down") downvotes++

            return {
              ...content,
              votes: { upvotes, downvotes },
              userVote: voteType,
            }
          }
          return content
        }),
      )
    } catch (error) {
      console.error("Error voting on content:", error)
    }
  }

  if (communityContents.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="pt-6 text-center text-muted-foreground">
          <p>No content has been shared to the community yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {communityContents.map((content) => (
        <Card key={content.id} className="overflow-hidden">
          <CardHeader className="bg-muted/50">
            <div className="flex justify-between items-center">
              <CardTitle>{content.title}</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="flex items-center">
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  {content.votes.upvotes}
                </Badge>
                <Badge variant="outline" className="flex items-center">
                  <ThumbsDown className="h-3 w-3 mr-1" />
                  {content.votes.downvotes}
                </Badge>
              </div>
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
          <CardFooter className="bg-muted/30 flex justify-end space-x-2 py-3">
            <Button
              variant={content.userVote === "up" ? "default" : "outline"}
              size="sm"
              onClick={() => handleVote(content.id, "up")}
              className="flex items-center"
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              Good
            </Button>
            <Button
              variant={content.userVote === "down" ? "default" : "outline"}
              size="sm"
              onClick={() => handleVote(content.id, "down")}
              className="flex items-center"
            >
              <ThumbsDown className="h-4 w-4 mr-2" />
              Bad
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

