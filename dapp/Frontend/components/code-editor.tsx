"use client"

import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { executeCode, submitSolution } from "../lib/code-execution"
import { cn } from "../lib/utils"
import { Check, Play, RotateCw } from "lucide-react"
import { useEffect, useState } from "react"
import { useToast } from "../hooks/use-toast"

interface CodeEditorProps {
  problemId: string
}

const LANGUAGES = [
  { id: "javascript", name: "JavaScript", extension: "js" },
  { id: "typescript", name: "TypeScript", extension: "ts" },
  { id: "python", name: "Python", extension: "py" },
  { id: "java", name: "Java", extension: "java" },
  { id: "cpp", name: "C++", extension: "cpp" },
  { id: "csharp", name: "C#", extension: "cs" },
  { id: "go", name: "Go", extension: "go" },
  { id: "rust", name: "Rust", extension: "rs" },
]

const DEFAULT_CODE = {
  javascript: `function solution(input) {\n  // Your code here\n  \n  return output;\n}`,
  typescript: `function solution(input: string): string {\n  // Your code here\n  \n  return output;\n}`,
  python: `def solution(input):\n    # Your code here\n    \n    return output`,
  java: `public class Solution {\n    public static String solution(String input) {\n        // Your code here\n        \n        return output;\n    }\n}`,
  cpp: `#include <iostream>\n#include <string>\n\nstd::string solution(std::string input) {\n    // Your code here\n    \n    return output;\n}`,
  csharp: `using System;\n\npublic class Solution {\n    public static string solution(string input) {\n        // Your code here\n        \n        return output;\n    }\n}`,
  go: `package main\n\nfunc solution(input string) string {\n    // Your code here\n    \n    return output\n}`,
  rust: `fn solution(input: &str) -> String {\n    // Your code here\n    \n    return output.to_string();\n}`,
}

export function CodeEditor({ problemId }: CodeEditorProps) {
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] = useState(DEFAULT_CODE.javascript)
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Monaco editor state
  const [editor, setEditor] = useState<any>(null)

  useEffect(() => {
    // Dynamically import Monaco editor
    import("monaco-editor").then((monaco) => {
      // Clean up previous editor instance if it exists
      if (editor) {
        editor.dispose()
      }

      const editorInstance = monaco.editor.create(document.getElementById("monaco-editor-container")!, {
        value: code,
        language,
        theme: "vs-dark",
        automaticLayout: true,
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
        fontSize: 14,
        tabSize: 2,
        wordWrap: "on",
        padding: {
          top: 16,
          bottom: 16,
        },
      })

      editorInstance.onDidChangeModelContent(() => {
        setCode(editorInstance.getValue())
      })

      setEditor(editorInstance)

      return () => {
        editorInstance.dispose()
      }
    })
  }, [language])

  useEffect(() => {
    if (editor) {
      const model = editor.getModel()
      if (model) {
        editor.setValue(DEFAULT_CODE[language as keyof typeof DEFAULT_CODE])
      }
    }
  }, [language, editor])

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    try {
      const result = await executeCode({
        code,
        language,
        problemId,
      })

      // This would typically update the terminal component
      window.dispatchEvent(
        new CustomEvent("terminal-output", {
          detail: {
            output: result.output,
            success: result.success,
          },
        }),
      )

      if (result.success) {
        toast({
          title: "Code executed successfully!",
          description: "Your code ran without errors.",
          variant: "default",
        })
      } else {
        toast({
          title: "Execution failed",
          description: result.error || "There was an error running your code.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Execution error",
        description: "There was an error running your code.",
        variant: "destructive",
      })
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmitSolution = async () => {
    setIsSubmitting(true)
    try {
      const result = await submitSolution({
        code,
        language,
        problemId,
      })

      // Update terminal with test results
      window.dispatchEvent(
        new CustomEvent("terminal-output", {
          detail: {
            output: result.output,
            success: result.success,
          },
        }),
      )

      if (result.success) {
        if (result.plagiarismScore > 80) {
          toast({
            title: "Plagiarism detected",
            description: `Your solution has a ${result.plagiarismScore}% similarity with existing solutions.`,
            variant: "destructive",
          })
        } else {
          toast({
            title: "All tests passed!",
            description: "Congratulations! Your solution passed all test cases.",
            variant: "default",
          })
        }
      } else {
        toast({
          title: "Tests failed",
          description: result.error || "Your solution didn't pass all test cases.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Submission error",
        description: "There was an error submitting your solution.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <div className="flex items-center">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px] h-8 text-sm bg-background border-border">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.id} value={lang.id}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRunCode}
            disabled={isRunning}
            className={cn("text-sm h-8", isRunning && "opacity-70 cursor-not-allowed")}
          >
            {isRunning ? <RotateCw className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-4 w-4 mr-2" />}
            Run Code
          </Button>
          <Button
            size="sm"
            onClick={handleSubmitSolution}
            disabled={isSubmitting}
            className={cn("text-sm h-8", isSubmitting && "opacity-70 cursor-not-allowed")}
          >
            {isSubmitting ? <RotateCw className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
            Submit
          </Button>
        </div>
      </div>
      <div id="monaco-editor-container" className="flex-1 overflow-hidden" />
    </div>
  )
}

