import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

export default function SignInPage() { // Changed component name
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a14] p-4 text-white">
      <div className="absolute left-4 top-4 md:left-8 md:top-8">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="text-xl">DevLearn</span>
        </Link>
      </div>

      <div className="flex w-full max-w-4xl flex-col md:flex-row">
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="relative h-[300px] w-[300px]">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Mascot character"
              width={300}
              height={300}
              className="animate-float"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center p-6">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Sign in to your account</h1> {/* Changed title */}
            </div>

            {/* ... OAuth buttons remain the same ... */}

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="mx-4 flex-shrink text-gray-400">Or</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-gray-300">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="border-gray-700 bg-transparent py-6 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              {/* Add password field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm text-gray-300">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="border-gray-700 bg-transparent py-6 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <Button className="w-full bg-[#fce675] py-6 text-black hover:bg-[#f8dc4d]">
                Sign In <span className="ml-2">→</span> {/* Changed button text */}
              </Button>
            </div>

            <div className="text-center text-sm">
              Don't have an account?{" "} {/* Changed link text */}
              <Link href="/signup" className="text-[#a78bfa] hover:underline"> {/* Changed link target */}
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}