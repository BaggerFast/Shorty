import '@repo/ui/global.css'

import { cn } from '@repo/ui/lib/utils'
import { Toaster } from '@repo/ui/toaster'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { PublicEnvScript } from 'next-runtime-env'
import { ReactNode } from 'react'

import ThemeProvider from '@/shared/providers/theme-provider'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Shorty',
  description: 'App to short links',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <PublicEnvScript />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
