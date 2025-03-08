import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is missing. Please add it to your environment variables." },
        { status: 500 },
      )
    }

    const { prompt, units, subparts } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Create a structured prompt for the AI
    const structuredPrompt = `
      Generate content about "${prompt}" with the following structure:
      - ${units || 3} units, each with a descriptive title
      - Each unit should have ${subparts || 2} subparts
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

    return NextResponse.json({ content: generatedContent })
  } catch (error) {
    console.error("Error generating content:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate content" },
      { status: 500 },
    )
  }
}

