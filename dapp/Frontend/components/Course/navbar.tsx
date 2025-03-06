import { Code } from "lucide-react"
import { Button } from "../../components/ui/button"

export default function Navbar() {
  return (
    <header className="flex items-center justify-between p-6 border-b border-gray-800">
      <div className="flex items-center gap-2">
        <div className="bg-purple-600 p-2 rounded">
          <Code className="h-5 w-5" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          DevLearn
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-8">
        <a href="#" className="text-gray-300 hover:text-white transition-colors">
          Features
        </a>
        <a href="#" className="text-gray-300 hover:text-white transition-colors">
          Courses
        </a>
        <a href="#" className="text-gray-300 hover:text-white transition-colors">
          Pricing
        </a>
        <a href="#" className="text-gray-300 hover:text-white transition-colors">
          Community
        </a>
      </nav>
      <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
    </header>
  )
}

