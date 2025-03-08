import { Button } from "../../components/ui/button"
import Link from "next/link"
import { CommunityContentList } from "../../components/Ai/community-content-list"

export default function CommunityPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Community Content</h1>
        <Link href="/">
          <Button variant="outline">Back to Generator</Button>
        </Link>
      </div>

      <p className="text-muted-foreground mb-8">Browse and vote on content shared by the community</p>

      <CommunityContentList />
    </div>
  )
}

