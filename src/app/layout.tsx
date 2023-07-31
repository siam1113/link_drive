import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../aws-exports';
import "@aws-amplify/ui-react/styles.css";


Amplify.configure(awsExports);

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LinkDrive',
  description: 'Manage your links with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
