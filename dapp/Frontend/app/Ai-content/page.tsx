import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { ContentGenerator } from "../../components/Ai/content-generator"
import { ContentDisplay } from "../../components/Ai/content-display"

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">AI Content Generator</h1>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Generate New Content</CardTitle>
            <CardDescription>Create AI-generated content structured into units and subparts</CardDescription>
          </CardHeader>
          <CardContent>
            <ContentGenerator />
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Generated Content</h2>
          <Link href="/community">
            <Button variant="outline">View Community Content</Button>
          </Link>
        </div>

        <ContentDisplay />
      </div>
    </div>
  )
}

