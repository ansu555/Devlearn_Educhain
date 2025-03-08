"use client"

import { useEffect } from "react"

// This component handles client-side storage operations
// It doesn't render anything visible
export function ClientStorage() {
  useEffect(() => {
    // Initialize local storage if needed
    if (!localStorage.getItem("generatedContents")) {
      localStorage.setItem("generatedContents", JSON.stringify([]))
    }

    if (!localStorage.getItem("communityContents")) {
      localStorage.setItem("communityContents", JSON.stringify([]))
    }

    // Set up event listeners for storage operations
    window.addEventListener("storage:saveGeneratedContent", ((event: CustomEvent) => {
      const { content } = event.detail
      const stored = JSON.parse(localStorage.getItem("generatedContents") || "[]")
      localStorage.setItem("generatedContents", JSON.stringify([...stored, content]))
    }) as EventListener)

    window.addEventListener("storage:shareToCommmunity", ((event: CustomEvent) => {
      const { contentId } = event.detail
      const generatedContents = JSON.parse(localStorage.getItem("generatedContents") || "[]")
      const communityContents = JSON.parse(localStorage.getItem("communityContents") || "[]")

      const contentToShare = generatedContents.find((c: any) => c.id === contentId)
      if (contentToShare) {
        // Mark as shared in generated contents
        localStorage.setItem(
          "generatedContents",
          JSON.stringify(generatedContents.map((c: any) => (c.id === contentId ? { ...c, shared: true } : c))),
        )

        // Add to community contents if not already there
        if (!communityContents.some((c: any) => c.id === contentId)) {
          localStorage.setItem(
            "communityContents",
            JSON.stringify([
              ...communityContents,
              {
                ...contentToShare,
                votes: { upvotes: 0, downvotes: 0 },
                userVote: null,
              },
            ]),
          )
        }
      }
    }) as EventListener)

    window.addEventListener("storage:voteOnContent", ((event: CustomEvent) => {
      const { contentId, voteType } = event.detail
      const communityContents = JSON.parse(localStorage.getItem("communityContents") || "[]")

      localStorage.setItem(
        "communityContents",
        JSON.stringify(
          communityContents.map((content: any) => {
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
        ),
      )
    }) as EventListener)

    // Cleanup
    return () => {
      window.removeEventListener("storage:saveGeneratedContent", (() => {}) as EventListener)
      window.removeEventListener("storage:shareToCommmunity", (() => {}) as EventListener)
      window.removeEventListener("storage:voteOnContent", (() => {}) as EventListener)
    }
  }, [])

  return null
}

