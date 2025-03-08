"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { GenerateContentParams } from "./types"
import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"

export async function generateContent(params: GenerateContentParams) {
  const { prompt, title, units, subparts } = params

  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is missing. Please add it to your environment variables.")
    }

    // Create a structured prompt for the AI
    const structuredPrompt = `
      Generate content about "${prompt}" with the following structure:
      - ${units} units, each with a descriptive title
      - Each unit should have ${subparts} subparts
      - Each subpart should have a title and content
      
      Format the response as a JSON object with this structure:
      {
        "units": [
          {
            "title": "Unit Title",
            "subparts": [
              {
                "title": "Subpart Title",
                "content": "Subpart content..."
              }
            ]
          }
        ]
      }
    `

    // Generate content using AI SDK
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: structuredPrompt,
      system:
        "You are a content generation assistant that creates well-structured, informative content. Always respond with valid JSON.",
    })

    // Parse the response
    const generatedContent = JSON.parse(text)

    // Create a content object with ID
    const contentObject = {
      id: uuidv4(),
      title,
      units: generatedContent.units,
      shared: false,
      createdAt: new Date().toISOString(),
    }

    // Return the generated content
    return { success: true, content: contentObject }
  } catch (error) {
    console.error("Error generating content:", error)
    throw new Error(error instanceof Error ? error.message : "Failed to generate content")
  }
}

export async function shareToCommmunity(contentId: string) {
  try {
    // In a real app, this would update a database
    // For demo purposes, we'll just return success

    revalidatePath("/community")
    return { success: true }
  } catch (error) {
    console.error("Error sharing content:", error)
    throw new Error("Failed to share content")
  }
}

export async function voteOnContent(contentId: string, voteType: "up" | "down") {
  try {
    // In a real app, this would update a database
    // For demo purposes, we'll just return success

    revalidatePath("/community")
    return { success: true }
  } catch (error) {
    console.error("Error voting on content:", error)
    throw new Error("Failed to vote on content")
  }
}

