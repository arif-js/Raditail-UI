import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import 'raditail/theme/tailwind.css'
import 'raditail/theme/styles.css'
import { ThemeProvider } from './theme-provider'
import { ThemeToggle } from './components/ThemeToggle'

export const metadata: Metadata = {
  title: 'Raditail UI – Accessible React component library',
  description:
    'Raditail UI is a Radix UI + Tailwind CSS component library with theming, Storybook, and example usage.',
  openGraph: {
    title: 'Raditail UI',
    description: 'Composable Radix UI components styled with Tailwind CSS.',
    url: 'https://raditail.dev',
    siteName: 'Raditail UI',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[--rt-bg] text-[--rt-foreground] antialiased">
        <ThemeProvider>
          <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-16 pt-8">
            <header className="flex items-center justify-between gap-4 border-b border-[--rt-border-color] pb-6">
              <Link
                href="/"
                className="text-lg font-semibold text-[--rt-foreground]"
              >
                Raditail UI
              </Link>
              <nav className="flex items-center gap-4 text-sm text-[--rt-muted-foreground]">
                <Link href="/" className="hover:text-[--rt-foreground]">
                  Home
                </Link>
                <Link
                  href="/(docs)/getting-started"
                  className="hover:text-[--rt-foreground]"
                >
                  Getting Started
                </Link>
                <Link
                  href="/(docs)/theming"
                  className="hover:text-[--rt-foreground]"
                >
                  Theming
                </Link>
                <ThemeToggle />
              </nav>
            </header>
            <main className="flex-1 py-8">{children}</main>
            <footer className="border-t border-[--rt-border-color] pt-4 text-sm text-[--rt-muted-foreground]">
              Built with ❤️ using Raditail UI.
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
