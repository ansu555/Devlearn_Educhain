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
      Create a comprehensive course structure about: ${prompt}
      
      Strict Requirements:
      1. Exactly 5 units total
      2. Each unit must have exactly 5 subparts
      3. Maintain this exact format:
      
      # [Course Title]
      
      ## Unit 1: [Unit Title]
      ### 1.1 [Core Concepts]
      [Detailed theoretical foundation with mathematical formulations]
      
      ### 1.2 [Technical Specifications]
      [Technical breakdown with code samples and diagrams]
      
      ### 1.3 [Implementation Guide]
      [Step-by-step implementation instructions]
      
      ### 1.4 [Case Studies]
      [Real-world applications and analysis]
      
      ### 1.5 [Security Considerations]
      [Potential vulnerabilities and mitigation strategies]
      
      ## Unit 2: [Unit Title]
      ### 2.1 [Advanced Theory]
      ### 2.2 [Optimization Techniques]
      ### 2.3 [Testing Methods]
      ### 2.4 [Industry Best Practices]
      ### 2.5 [Troubleshooting Guide]
      
      ... Continue pattern for Units 3-5 ...
      
      ## Unit 5: [Unit Title]
      ### 5.1 [Emerging Trends]
      ### 5.2 [Future Predictions]
      ### 5.3 [Capstone Project]
      ### 5.4 [Final Assessment]
      ### 5.5 [Additional Resources]
      
      Content Guidelines:
      - Include code blocks with proper syntax highlighting
      - Use mathematical notation where applicable
      - Add conceptual diagrams in markdown format
      - Provide real blockchain examples
      - Mention Ethereum Improvement Proposals (EIPs) when relevant
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