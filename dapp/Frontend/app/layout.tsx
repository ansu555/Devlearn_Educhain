import type { Metadata } from 'next'
import './globals.css'
import OCConnectWrapper from '../components/OCConnectWrapper';

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
  const opts = {
    redirectUri: 'http://localhost:3000/redirect', // Adjust this URL
    referralCode: 'PARTNER6', // Assign partner code
  };

  return (
    <html lang="en">
      <body>
        <OCConnectWrapper opts={opts} sandboxMode={true}>
          {children}
        </OCConnectWrapper>
      </body>
    </html>
  )
}