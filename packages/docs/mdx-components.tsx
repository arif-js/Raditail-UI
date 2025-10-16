import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = '', ...props }) => {
      if (href.startsWith('http')) {
        return <a href={href} rel="noreferrer" target="_blank" {...props} />
      }

      return <Link href={href} {...props} />
    },
    pre: (props) => (
      <pre
        className="mb-4 overflow-auto rounded-[var(--rt-radius-md)] bg-[--rt-muted-bg] p-4 shadow-sm"
        {...props}
      />
    ),
    code: (props) => <code className="font-mono text-sm" {...props} />,
    h1: (props) => <h1 className="mb-4 text-3xl font-semibold" {...props} />,
    h2: (props) => (
      <h2 className="mt-8 mb-3 text-2xl font-semibold" {...props} />
    ),
    h3: (props) => (
      <h3 className="mt-6 mb-2 text-xl font-semibold" {...props} />
    ),
    p: (props) => (
      <p
        className="mb-4 leading-relaxed text-[--rt-muted-foreground]"
        {...props}
      />
    ),
    ul: (props) => (
      <ul
        className="mb-4 list-disc pl-5 text-[--rt-muted-foreground]"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="mb-4 list-decimal pl-5 text-[--rt-muted-foreground]"
        {...props}
      />
    ),
    ...components,
  }
}

export default useMDXComponents
