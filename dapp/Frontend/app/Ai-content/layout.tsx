import type React from "react"
import { ClientStorage } from "../../components/Ai/client-storage"
import { ThemeProvider } from "../../components/theme-provider"
import { Toaster } from "../../components/ui/toaster"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <ClientStorage />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

