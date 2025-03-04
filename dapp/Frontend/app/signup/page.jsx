import Image from "next/image"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      <div className="absolute left-4 top-4 md:left-8 md:top-8">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="text-xl">DEVLEARN</span>
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

            <div className="space-y-3">
              <Button
                variant="outline"
                className="relative flex w-full items-center justify-center gap-2 border-border bg-transparent py-6 hover:bg-secondary/50"
              >
                <Image src="/placeholder.svg?height=20&width=20" alt="Google" width={20} height={20} />
                Continue with Google
              </Button>

              <Button
                variant="outline"
                className="relative flex w-full items-center justify-center gap-2 border-border bg-transparent py-6 hover:bg-secondary/50"
              >
                <Image src="/placeholder.svg?height=20&width=20" alt="Github" width={20} height={20} />
                Continue with Github
              </Button>

              <Button
                variant="outline"
                className="relative flex w-full items-center justify-center gap-2 border-border bg-transparent py-6 hover:bg-secondary/50"
              >
                <Image src="/placeholder.svg?height=20&width=20" alt="Metamask" width={20} height={20} />
                Continue with Metamask
              </Button>

              <Button
                variant="outline"
                className="relative flex w-full items-center justify-center gap-2 border-border bg-transparent py-6 hover:bg-secondary/50"
              >
                <Image src="/placeholder.svg?height=20&width=20" alt="OCID" width={20} height={20} />
                Continue with OCID
              </Button>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-border"></div>
              <span className="mx-4 flex-shrink text-muted-foreground">Or</span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-muted-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="border-border bg-transparent py-6 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                />
              </div>

              <Button className="w-full bg-primary py-6 text-primary-foreground hover:bg-[#f8dc4d] ">
                Continue <span className="ml-2">→</span>
              </Button>
            </div>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}