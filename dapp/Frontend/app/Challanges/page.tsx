import { Search } from "lucide-react"
import Link from "next/link"
import ChallengesList from "../../components/Challanges/challenges-list"
import { Input } from "../../components/ui/input"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b1a] to-[#0f1124] text-white">
      <header className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 border border-blue-400 flex items-center justify-center rounded">
            <span className="text-blue-400 font-mono">&lt;/&gt;</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            DevLearn
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-gray-300 hover:text-white transition">
            Features
          </Link>
          <Link href="#" className="text-gray-300 hover:text-white transition">
            Courses
          </Link>
          <Link href="#" className="text-gray-300 hover:text-white transition">
            Pricing
          </Link>
          <Link href="#" className="text-gray-300 hover:text-white transition">
            Community
          </Link>
          <Link href="#" className="text-white font-medium hover:text-white transition">
            Problems
          </Link>
        </nav>
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 rounded text-white font-medium hover:opacity-90 transition">
          Sign in
        </button>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Coding </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Challenges
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              Test your skills with our curated collection of coding challenges. From blockchain to web development,
              level up your abilities and earn verified credentials.
            </p>
          </div>

          <div className="relative mb-12">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search challenges by name, technology, or difficulty..."
              className="pl-10 py-6 bg-[#161830] border-[#2a2d4a] w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <ChallengesList />
        </div>
      </main>
    </div>
  )
}

