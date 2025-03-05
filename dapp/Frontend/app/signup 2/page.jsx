import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

export default function SignInPage() {
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
              <h1 className="text-3xl font-bold">Create account</h1>
            </div>

            {/* OAuth Buttons */}
            <Button className="w-full bg-gray-800 py-3 text-white border border-gray-600 hover:bg-gray-700">
              Continue with Google
            </Button>
            <Button className="w-full bg-gray-800 py-3 text-white border border-gray-600 hover:bg-gray-700">
              Continue with Github
            </Button>
            <Button className="w-full bg-gray-800 py-3 text-white border border-gray-600 hover:bg-gray-700">
              Continue with Metamask
            </Button>
            <Button className="w-full bg-gray-800 py-3 text-white border border-gray-600 hover:bg-gray-700">
              Continue with OCID
            </Button>

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
                  className="border-gray-700 bg-transparent py-3 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <Button className="w-full bg-[#fce675] py-3 text-black hover:bg-[#f8dc4d]">
                Continue <span className="ml-2">→</span>
              </Button>
            </div>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="text-[#a78bfa] hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
