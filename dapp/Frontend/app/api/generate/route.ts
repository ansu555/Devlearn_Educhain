import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const structuredPrompt = `
      Create a detailed course structure about: ${prompt}
      
      Requirements:
      1. Organize content into multiple units (Unit 1, Unit 2, etc.) based on complexity
      2. Each unit must have 3-5 subparts
      3. Each subpart must contain at least 500 words of in-depth explanation
      4. Use this exact format:
      
      # Course Title
      
      ## Unit 1: [Unit Title]
      ### 1.1 [Subpart Title]
      [Detailed content... (minimum 500 words)]
      
      ### 1.2 [Subpart Title]
      [Detailed content...]
      
      ## Unit 2: [Unit Title]
      ### 2.1 [Subpart Title]
      [Detailed content...]
      
      ...continue for all units...
      
      Include practical examples, diagrams (in markdown format), and real-world applications.
      Maintain academic rigor while keeping explanations accessible.
    `;

    const result = await model.generateContent(structuredPrompt);
    const text = result.response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("Error in /api/generate:", error);
    return NextResponse.json(
      { error: "Failed to generate content", details: error.message },
      { status: 500 }
    );
  }
}