import Link from 'next/link'
import { ArrowRightIcon, CodeIcon, PaletteIcon } from 'lucide-react'
import { Button } from 'raditail'
import { UsageExamples } from './components/UsageExamples'

const quickLinks = [
  {
    title: 'Install the library',
    description: 'Add Raditail UI and peer dependencies in one command.',
    href: '/(docs)/getting-started',
    icon: ArrowRightIcon,
  },
  {
    title: 'Explore the components',
    description: 'Browse composable building blocks powered by Radix UI.',
    href: '/(components)/button',
    icon: CodeIcon,
  },
  {
    title: 'Customize the theme',
    description: 'Override tokens with CSS variables or Tailwind config.',
    href: '/(docs)/theming',
    icon: PaletteIcon,
  },
]

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="text-center">
        <span className="mb-4 inline-flex items-center rounded-full border border-[--rt-border-color] bg-[--rt-muted-bg] px-3 py-1 text-xs font-medium text-[--rt-muted-foreground]">
          Radix UI primitives · Tailwind theming · Type-safe variants
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-[--rt-foreground] sm:text-5xl">
          Raditail UI brings design tokens and accessibility together.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[--rt-muted-foreground]">
          Ship production-ready interfaces faster with composable Radix
          components, Tailwind-powered theming, and a DX-first toolchain.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/(docs)/getting-started">Get started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://storybook.raditail.dev"
              target="_blank"
              rel="noreferrer"
            >
              Open Storybook
            </a>
          </Button>
        </div>
        <div className="mt-6 text-sm text-[--rt-muted-foreground]">
          <code className="rounded-[var(--rt-radius-md)] bg-[--rt-muted-bg] px-3 py-2">
            pnpm add raditail
          </code>
        </div>
      </section>

      <UsageExamples />

      <section className="grid gap-4 md:grid-cols-3">
        {quickLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="group rounded-[var(--rt-radius-lg)] border border-[--rt-border-color] bg-[--rt-bg] p-6 transition hover:border-[--rt-primary-color] hover:shadow-md"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[--rt-muted-bg] text-[--rt-primary-color]">
              <link.icon className="h-5 w-5" aria-hidden />
            </div>
            <h2 className="text-lg font-semibold text-[--rt-foreground]">
              {link.title}
            </h2>
            <p className="mt-2 text-sm text-[--rt-muted-foreground]">
              {link.description}
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-[--rt-primary-color]">
              Learn more
              <ArrowRightIcon
                className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </span>
          </Link>
        ))}
      </section>
    </div>
  )
}
