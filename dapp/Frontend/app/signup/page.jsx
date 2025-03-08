"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react"; // Add useState and useEffect
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useOCAuth } from "@opencampus/ocid-connect-js"; // Import the hook
import { useRouter } from "next/navigation"; // Import router

export default function SignUpPage() {
  const { ocAuth } = useOCAuth();
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");

  const handleOCIDLogin = async () => {
    try {
      await ocAuth.signInWithRedirect({ state: "opencampus" });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleMetaMaskLogin = async () => {
    setIsConnecting(true);
    setError("");
    
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed. Please install MetaMask and try again.");
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      
      // Store wallet address in localStorage for persistence
      localStorage.setItem("walletAddress", address);
      setWalletAddress(address);
      
      // Redirect to home page after successful login
      router.push('/');
    } catch (error) {
      console.error("MetaMask connection failed:", error);
      setError(error.message || "Failed to connect to MetaMask");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a14] p-4 text-white">
      <div className="absolute left- top-4 md:left-8 md:top-8">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="text-xl">DevLearn</span>
        </Link>
      </div>

      <div className="flex w-full max-w-4xl flex-col md:flex-row">
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="relative h-[300px] w-[300px]">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="DevLearn mascot"
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

            {/* Display error if any */}
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded text-sm">
                {error}
              </div>
            )}

            {/* Social login buttons */}
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full border-gray-700 py-6 hover:bg-gray-800"
              >
                {/* Google SVG */}
                <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" fill="#4285F4">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-gray-700 py-6 hover:bg-gray-800"
              >
                {/* Github SVG */}
                <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                Continue with Github
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-gray-700 py-6 hover:bg-gray-800"
                onClick={handleMetaMaskLogin}
                disabled={isConnecting}
              >
                {/* Metamask SVG */}
                <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" fill="currentColor">
                  <path d="M16.582 15.387l-1.368-1.87 1.368-1.87h-3.163l-1.368 1.87 1.368 1.87h3.163zm-9.77.129l-1.368-1.87 1.368-1.87 1.368 1.87-1.368 1.87zm3.163 0l1.368-1.87-1.368-1.87-1.368 1.87 1.368 1.87zm0-3.74l1.368-1.87-1.368-1.87-1.368 1.87 1.368 1.87zm3.162 0l1.368-1.87-1.368-1.87h-3.162l-1.368 1.87 1.368 1.87h3.162z"/>
                </svg>
                {isConnecting ? "Connecting..." : "Continue with MetaMask"}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-gray-700 py-6 hover:bg-gray-800"
                onClick={handleOCIDLogin}  // Add the onClick handler here
              >
            
                {/* Optionally, reuse your OCID SVG */}
                <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" fill="currentColor">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Continue with OCID
              </Button>
            </div>

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

              <Button className="w-full py-6 text-black hover:bg-[#f8dc4d]">
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
  );
}
