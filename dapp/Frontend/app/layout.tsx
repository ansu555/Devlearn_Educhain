import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Devlearn',
  description: 'Created by team Bytestorm',
  generator: 'Bytestorm',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}