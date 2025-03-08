"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation" 
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ChevronRight,
  Code,
  Cpu,
  Database,
  Github,
  Globe,
  Linkedin,
  Lock,
  Menu,
  Shield,
  Twitter,
  X,
  LogOut,
} from "lucide-react"

import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import PricingCard from "../components/pricing-card"
import TestimonialCard from "../components/testimonial-card"
import FeatureCard from "../components/feature-card"

export default function Home() {
  const router = useRouter() 
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [walletAddress, setWalletAddress] = useState("")
  const navItems = [
    { name: "Courses", path: "/courses" },
    { name: "Community", path: "#community" },
    { name: "Problems", path: "/Challanges" }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Check for connected wallet on component mount
    const storedAddress = localStorage.getItem("walletAddress");
    if (storedAddress) {
      setWalletAddress(storedAddress);
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Function to disconnect wallet
  const disconnectWallet = () => {
    localStorage.removeItem("walletAddress");
    setWalletAddress("");
  }

  // Function to format address for display (0x1234...5678)
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Header Section */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? "bg-slate-900/90 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"}`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg animate-pulse"></div>
              <div className="absolute inset-0.5 bg-slate-900 rounded-lg flex items-center justify-center">
                <Code className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              DevLearn
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: "Features", path: "#features" },
              { name: "Courses", path: "/CourseExplorer" },
              { name: "Pricing", path: "#pricing" },
              { name: "Community", path: "#community" },
              { name: "Problems", path: "/Challanges" }
            ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => {
                    if (item.path.startsWith("/")) {
                      e.preventDefault()
                      router.push(item.path)
                    }
                  }}
                className="text-sm font-medium text-slate-300 hover:text-white relative group"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              {walletAddress ? (
                <div className="flex items-center gap-2">
                  <div className="bg-slate-800 border border-slate-700 rounded-full px-4 py-1 text-sm text-cyan-400">
                    {formatAddress(walletAddress)}
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="text-slate-400 hover:text-white"
                    onClick={disconnectWallet}
                    title="Disconnect wallet"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0"  
                  onClick={() => router.push('../signup')}
                >
                  Sign in
                </Button>
              )}
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => {setIsMenuOpen(!isMenuOpen); router.push('/signup');}}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-800 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {[
                { name: "Features", path: "#features" },
                { name: "Courses", path: "/CourseExplorer" },
                { name: "Pricing", path: "#pricing" },
                { name: "Community", path: "#community" },
                { name: "Problems", path: "/playground/react" }  // Update this path
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => {
                    setIsMenuOpen(false)
                    if (item.path.startsWith("/")) {
                      e.preventDefault()
                      router.push(item.path)
                    }
                  }}
                  className="text-sm font-medium text-slate-300 hover:text-white py-2"
                >
                  {item.name}
                </a>
              ))}
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 w-full">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </header>
     
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/80 to-slate-900/80"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-500/10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <Badge className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 mb-4">
                  Revolutionizing Web3 Learning
                </Badge>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="block">Master Blockchain</span>
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Development Skills
                </span>
                <span className="block">With Verified Credentials</span>
              </motion.h1>

              <motion.p
                className="text-lg text-slate-300 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                DevLearn combines AI-powered learning with blockchain verification to help you master smart contract
                development and connect with top Web3 employers.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 h-12 px-8 text-base font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105">
                  Start Learning Now
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-800 h-12 px-8 text-base font-medium"
                  onClick={() => router.push('/CourseExplorer')}
                >
                  Explore Courses
                </Button>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 text-sm text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-xs font-medium"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span>Join 50,000+ developers already learning</span>
              </motion.div>
            </div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur-lg opacity-50 animate-pulse"></div>
                <div className="relative bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 border-b border-slate-700">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="text-xs text-slate-400 ml-2">smart-contract.sol</div>
                  </div>
                  <div className="p-4 font-mono text-sm text-slate-300 overflow-hidden">
                    <div className="flex">
                      <span className="text-slate-500 mr-4">1</span>
                      <span className="text-purple-400">pragma</span>
                      <span className="text-white mx-1">solidity</span>
                      <span className="text-cyan-400">^0.8.17</span>
                      <span className="text-white">;</span>
                    </div>
                    <div className="flex">
                      <span className="text-slate-500 mr-4">2</span>
                    </div>
                    <div className="flex">
                      <span className="text-slate-500 mr-4">3</span>
                      <span className="text-purple-400">contract</span>
                      <span className="text-cyan-300 mx-1">DevLearnCertificate</span>
                      <span className="text-white">{"{"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-slate-500 mr-4">4</span>
                      <span className="ml-4 text-purple-400">mapping</span>
                      <span className="text-white">(</span>
                      <span className="text-cyan-300">address</span>
                      <span className="text-white mx-1">{"=>"}</span>
                      <span className="text-cyan-300">uint256</span>
                      <span className="text-white">)</span>
                      <span className="text-green-300 mx-1">public</span>
                      <span className="text-white">skillLevel;</span>
                    </div>
                    <div className="flex">
                      <span className="text-slate-500 mr-4">5</span>
                    </div>
                    <div className="flex">
                      <span className="text-slate-500 mr-4">6</span>
                      <span className="ml-4 text-purple-400">function</span>
                      <span className="text-yellow-300 mx-1">certifySkill</span>
                      <span className="text-white">(</span>
                      <span className="text-cyan-300">address</span>
                      <span className="text-white mx-1">developer,</span>
                      <span className="text-cyan-300 mx-1">uint256</span>
                      <span className="text-white">level)</span>
                      <span className="text-green-300 mx-1">public</span>
                      <span className="text-white">{"{"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-slate-500 mr-4">7</span>
                      <span className="ml-8 text-white">skillLevel[developer] = level;</span>
                    </div>
                    <div className="flex">
                      <span className="text-slate-500 mr-4">8</span>
                      <span className="ml-4 text-white">{"}"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-slate-500 mr-4">9</span>
                      <span className="text-white">{"}"}</span>
                    </div>

                    {/* Animated cursor */}
                    <div className="h-5 w-2 bg-cyan-400 inline-block ml-4 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 relative bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 mb-4">Platform Features</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Learn, Verify, and Connect with Web3 Opportunities
              </h2>
              <p className="text-slate-400">
                Our platform combines AI-powered learning tools with blockchain verification to create a seamless
                ecosystem for Web3 developers.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code />}
              title="AI-Generated Practice Problems"
              description="Personalized smart contract challenges that adapt to your skill level and learning pace."
              delay={0.1}
            />
            <FeatureCard
              icon={<Lock />}
              title="Blockchain Verified Certificates"
              description="Earn NFT certificates that provide immutable proof of your blockchain development skills."
              delay={0.2}
            />
            <FeatureCard
              icon={<Database />}
              title="Decentralized Course Marketplace"
              description="Access high-quality courses from leading Web3 experts with transparent revenue sharing."
              delay={0.3}
            />
            <FeatureCard
              icon={<Cpu />}
              title="On-Chain Problem Verification"
              description="Solutions are verified directly on-chain, providing transparent proof of your abilities."
              delay={0.4}
            />
            <FeatureCard
              icon={<Globe />}
              title="Web3 Job Marketplace"
              description="Connect directly with employers looking for verified blockchain development talent."
              delay={0.5}
            />
            <FeatureCard
              icon={<Shield />}
              title="Community Governance"
              description="Platform decisions are made through a decentralized governance system using our utility token."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 relative bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 mb-4">The Process</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How DevLearn Works</h2>
              <p className="text-slate-400">
                Our platform creates a seamless journey from learning to employment in the Web3 ecosystem.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {[
                {
                  number: "01",
                  title: "Skill Assessment & Learning Path",
                  description:
                    "Take an initial assessment to determine your current skill level and receive a personalized learning path.",
                },
                {
                  number: "02",
                  title: "Practice with AI-Generated Problems",
                  description:
                    "Solve smart contract challenges that adapt to your skill level with AI-powered hints and feedback.",
                },
                {
                  number: "03",
                  title: "Earn Verifiable Certificates",
                  description:
                    "Complete challenges to earn NFT certificates that verify your blockchain development skills.",
                },
                {
                  number: "04",
                  title: "Connect with Employers",
                  description:
                    "Use your verified credentials to apply for jobs with leading Web3 companies through our marketplace.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-slate-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl blur-xl"></div>
              <div className="relative bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="DevLearn Platform Interface"
                  width={500}
                  height={600}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Lock className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Smart Contract Security</h4>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <span className="text-cyan-400">Level 3</span>
                          <span>•</span>
                          <span>Certificate Earned</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "75%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 relative bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 mb-4">Success Stories</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h2>
              <p className="text-slate-400">
                Hear from developers who have transformed their careers through DevLearn.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="DevLearn's AI-generated practice problems helped me master Solidity in just 3 months. I'm now working as a smart contract developer at a leading DeFi protocol."
              author="Alex Johnson"
              role="Smart Contract Developer"
              image="/placeholder.svg?height=100&width=100"
              delay={0.1}
            />
            <TestimonialCard
              quote="The NFT certificates I earned on DevLearn were instrumental in landing my dream job. Employers trusted my skills because they were verifiable on-chain."
              author="Sarah Chen"
              role="Blockchain Engineer"
              image="/placeholder.svg?height=100&width=100"
              delay={0.2}
            />
            <TestimonialCard
              quote="As someone transitioning from Web2 to Web3, DevLearn provided the perfect learning path. The community support and personalized challenges made all the difference."
              author="Michael Rodriguez"
              role="Full Stack Web3 Developer"
              image="/placeholder.svg?height=100&width=100"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 relative bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 mb-4">Pricing Plans</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose the Perfect Plan for Your Journey</h2>
              <p className="text-slate-400">Flexible options to support your learning and career growth in Web3.</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Free"
              price="$0"
              description="Perfect for beginners exploring Web3 development"
              features={[
                "Basic skill assessment",
                "Limited practice problems",
                "Community forum access",
                "Basic learning path",
              ]}
              buttonText="Get Started"
              buttonVariant="outline"
              delay={0.1}
            />
            <PricingCard
              title="Pro"
              price="$19"
              description="For serious developers building their skills"
              features={[
                "Advanced skill assessment",
                "Unlimited AI-generated problems",
                "NFT skill certificates",
                "Priority community support",
                "Full course marketplace access",
              ]}
              buttonText="Subscribe Now"
              buttonVariant="gradient"
              popular={true}
              delay={0.2}
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              description="For companies looking to hire verified talent"
              features={[
                "Talent marketplace access",
                "Verified developer profiles",
                "Custom certification programs",
                "Dedicated account manager",
                "API access for integration",
              ]}
              buttonText="Contact Sales"
              buttonVariant="outline"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* CTA Section
      <section className="py-20 md:py-32 relative bg-slate-900">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-cyan-900/30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Badge className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">Start Your Journey</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Ready to Master Web3 Development?
              </h2>
              <p className="text-xl text-slate-300">
                Join thousands of developers building the future of blockchain technology with verifiable skills.
              </p>
              <ul className="space-y-3">
                {[
                  "Personalized learning path based on your current skills",
                  "Verifiable certificates to showcase your abilities",
                  "Direct connection to employment opportunities",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                      <ChevronRight className="h-4 w-4 text-white" />
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-6">Create Your Account</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-400 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-400 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-400 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                <div className="pt-2">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 h-12 text-base font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300">
                    Get Started Now
                  </Button>
                </div>
                <p className="text-xs text-slate-400 text-center mt-4">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative h-8 w-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg"></div>
                  <div className="absolute inset-0.5 bg-slate-900 rounded-lg flex items-center justify-center">
                    <Code className="h-4 w-4 text-cyan-400" />
                  </div>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  DevLearn
                </span>
              </div>
              <p className="text-slate-400 mb-4">The leading platform for Web3 developer education and employment.</p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Platform</h4>
              <ul className="space-y-2">
                {["Features", "Courses", "Pricing", "Community", "Jobs"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                {["Documentation", "API", "Blog", "Tutorials", "Support"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                {["About", "Careers", "Partners", "Contact", "Legal"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} DevLearn. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

