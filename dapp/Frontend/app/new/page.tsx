"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight } from "lucide-react"

export default function ModulesPage() {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [activeSubmodule, setActiveSubmodule] = useState<string | null>(null)

  const modules = [
    {
      id: "module1",
      name: "Intro to React",
      submodules: [
        {
          id: "submodule1-1",
          name: "History & Fundamentals",
          content:
            "Learn the core concepts of React including components, props, state, and lifecycle methods. Master the art of building reusable UI components and understand the virtual DOM.",
        },
        {
          id: "submodule1-2",
          name: "JSX",
          content:
            "Explore different state management solutions like Redux, Context API, and Zustand. Learn when to use each approach and how to implement them effectively in your applications.",
        },
        {
          id: "submodule1-3",
          name: "Functional Components",
          content:
            "Discover the power of Next.js for building production-ready React applications. Learn about server-side rendering, static site generation, and the App Router.",
        },
      ],
    },
    {
      id: "module2",
      name: "Intro to React Components",
      submodules: [
        {
          id: "submodule2-1",
          name: "Components",
          content:
            "Master Node.js core concepts including the event loop, streams, and asynchronous programming. Build scalable server-side applications with JavaScript.",
        },
        {
          id: "submodule2-2",
          name: "Props",
          content:
            "Learn how to design efficient database schemas, normalize data, and implement relationships. Compare SQL and NoSQL approaches for different use cases.",
        },
        {
          id: "submodule2-3",
          name: "Functional Components",
          content:
            "Build RESTful and GraphQL APIs that are secure, performant, and well-documented. Implement authentication, validation, and error handling.",
        },
      ],
    },
    {
      id: "module3",
      name: "State & Hooks",
      submodules: [
        {
          id: "submodule3-1",
          name: "The useState",
          content:
            "useState is a hook that allowsing functional components to hold and update state"
        },
        {
          id: "submodule3-2",
          name: "States in React",
          content:
            "Set up continuous integration and deployment pipelines to automate testing and deployment. Learn about GitHub Actions, Jenkins, and other popular CI/CD tools.",
        },
        {
          id: "submodule3-3",
          name: "Dynamic Rendering",
          content:
            "Deploy applications to cloud platforms like Vercel, AWS, and Google Cloud. Learn about serverless functions, managed services, and cost optimization.",
        },
      ],
    },
    {
      id: "module4",
      name: "Events in React",
      submodules: [
        {
          id: "submodule4-1",
          name: "Event Handlers",
          content:
            "Learn how React captures and responds to user interactions like clicks or keystrokes."
        },
        {
          id: "submodule4-2",
          name: "onClick Function",
          content:
            "Handle click events in React, triggering actions when an element is clicked with ease."
        },
        {
          id: "submodule4-3",
          name: "React Synthetic Events",
          content:
          "Learn how to normalize browser inconsistencies by wrapping native events for consistency with React Synte"
        },
      ],
    },
    {
      id: "module5",
      name: "React Forms",
      submodules: [
        {
          id: "submodule5-1",
          name: "Intro to Controlled Components",
          content:
            "Controlled components manage form data through React state, giving more control over user input."
        },
        {
          id: "submodule5-2",
          name: "The onChange Function",
          content:
            "See how to track and update form data in response to user input."
        },
        {
          id: "submodule5-3",
          name: "Form Submission",
          content:
            "Learn how React handles and processes form data while preventing page reloads."
        },
      ],
    },
    {
      id: "module6",
      name: "React Routing",
      submodules: [
        {
          id: "submodule6-1",
          name: "React Router",
          content:
            "Navigate easily with this library in single-page applications."
        },
        {
          id: "submodule6-2",
          name: "Static vs Dynamic Routing",
          content:
            "Master predefined routing and also routing based on user input or app state and learn the difference and their use cases."
        },
        {
          id: "submodule6-3",
          name: "Links & Navigation",
          content:
            "Learn how to navigate without page reloads, enhancing the single-page app experience."
        },
      ],
    },
    {
      id: "module7",
      name: "Advanced Topics",
      submodules: [
        {
          id: "submodule7-1",
          name: "Context API",
          content:
            "Explore sharing state across components without passing props down manually."
        },
        {
          id: "submodule7-2",
          name: "React Lifecycle Methods",
          content:
            "Create hooks in class components that execute at specific points in a component's life cycle."        
},
        {
          id: "submodule7-3",
          name: "Deployment & further Steps",
          content:
            "You can deploy your application and get a publicly shareable link and now you are ready to dive into backend",
        },
      ],
    }
  ]

  const toggleModule = (moduleId: string) => {
    setActiveModule(activeModule === moduleId ? null : moduleId)
    setActiveSubmodule(null)
  }

  const toggleSubmodule = (submoduleId: string) => {
    setActiveSubmodule(activeSubmodule === submoduleId ? null : submoduleId)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <motion.h1
        className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Learning Modules
      </motion.h1>

      <div className="max-w-4xl mx-auto space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="rounded-lg overflow-hidden">
            <motion.div
              className={`flex items-center justify-between p-4 cursor-pointer ${
                activeModule === module.id ? "bg-gray-800" : "bg-gray-900"
              } hover:bg-gray-800 transition-colors duration-200`}
              onClick={() => toggleModule(module.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <h2 className="text-xl md:text-2xl font-semibold">{module.name}</h2>
              <motion.div animate={{ rotate: activeModule === module.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="h-6 w-6 text-gray-400" />
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {activeModule === module.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-gray-900 border-t border-gray-800"
                >
                  <div className="p-2">
                    {module.submodules.map((submodule) => (
                      <div key={submodule.id} className="mb-1 last:mb-0">
                        <motion.div
                          className={`flex items-center p-3 cursor-pointer rounded ${
                            activeSubmodule === submodule.id ? "bg-gray-700" : "bg-gray-800"
                          } hover:bg-gray-700 transition-colors duration-200`}
                          onClick={() => toggleSubmodule(submodule.id)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <motion.div
                            animate={{ rotate: activeSubmodule === submodule.id ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="mr-2"
                          >
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </motion.div>
                          <h3 className="text-md md:text-lg font-medium">{submodule.name}</h3>
                        </motion.div>

                        <AnimatePresence>
                          {activeSubmodule === submodule.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 bg-gray-900 rounded-b border-l-2 border-purple-500 ml-6 mt-1">
                                <p className="text-gray-300">{submodule.content}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

