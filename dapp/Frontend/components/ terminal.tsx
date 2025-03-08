"use client"

import { useEffect, useRef, useState } from "react"
import { Terminal as XTerm } from "xterm"
import { FitAddon } from "xterm-addon-fit"
import "xterm/css/xterm.css"

export function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [terminal, setTerminal] = useState<XTerm | null>(null)
  const [fitAddon, setFitAddon] = useState<FitAddon | null>(null)

  useEffect(() => {
    // Initialize terminal
    const term = new XTerm({
      cursorBlink: true,
      fontFamily: "Menlo, Monaco, 'Courier New', monospace",
      fontSize: 14,
      theme: {
        background: "#1a1b26",
        foreground: "#c0caf5",
        cursor: "#c0caf5",
        black: "#15161e",
        red: "#f7768e",
        green: "#9ece6a",
        yellow: "#e0af68",
        blue: "#7aa2f7",
        magenta: "#bb9af7",
        cyan: "#7dcfff",
        white: "#a9b1d6",
        brightBlack: "#414868",
        brightRed: "#f7768e",
        brightGreen: "#9ece6a",
        brightYellow: "#e0af68",
        brightBlue: "#7aa2f7",
        brightMagenta: "#bb9af7",
        brightCyan: "#7dcfff",
        brightWhite: "#c0caf5",
      },
    })

    const fit = new FitAddon()
    term.loadAddon(fit)

    if (terminalRef.current) {
      term.open(terminalRef.current)
      fit.fit()
      term.writeln("Terminal ready. Run your code to see output here.")
    }

    setTerminal(term)
    setFitAddon(fit)

    // Handle window resize
    const handleResize = () => {
      if (fit) {
        fit.fit()
      }
    }

    window.addEventListener("resize", handleResize)

    // Listen for terminal output events
    const handleTerminalOutput = (event: CustomEvent) => {
      const { output, success } = event.detail

      term.clear()

      if (success) {
        term.writeln("\x1b[32m" + "=== Execution successful ===" + "\x1b[0m")
      } else {
        term.writeln("\x1b[31m" + "=== Execution failed ===" + "\x1b[0m")
      }

      term.writeln("")
      term.writeln(output)
    }

    window.addEventListener("terminal-output", handleTerminalOutput as EventListener)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("terminal-output", handleTerminalOutput as EventListener)
      term.dispose()
    }
  }, [])

  return <div ref={terminalRef} className="h-full w-full" />
}

