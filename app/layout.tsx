// app/layout.tsx

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// ↓↓↓ ここを修正 ↓↓↓
export const metadata: Metadata = {
  title: '百人一首 App',
  description: '百人一首 No.81-100',
  openGraph: {
    title: '百人一首 App',
    description: '百人一首 No.81-100',
    siteName: '百人一首 App',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '百人一首 App',
    description: '百人一首 No.81-100',
  },
}
// ↑↑↑ ここまで ↑↑↑

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}