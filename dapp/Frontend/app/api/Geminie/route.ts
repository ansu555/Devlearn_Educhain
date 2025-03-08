import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = AIzaSyAXkXqFJng77E69kz5PkdwKYBWkiLyg2XY;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${apiKey}`,
      {
        prompt: { text: prompt },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch response from Gemini" }, { status: 500 });
  }
}
