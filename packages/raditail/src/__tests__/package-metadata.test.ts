import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const packageRoot = resolve(__dirname, '../..')
const pkg = JSON.parse(
  readFileSync(join(packageRoot, 'package.json'), 'utf8')
) as {
  files: string[]
  sideEffects: string[]
  peerDependencies: Record<string, string>
  peerDependenciesMeta: Record<string, { optional?: boolean }>
  engines?: Record<string, string>
  exports: Record<string, unknown>
}

const componentNames = readdirSync(join(packageRoot, 'src/components')).filter(
  (name) => existsSync(join(packageRoot, 'src/components', name, `${name}.tsx`))
)

describe('published package metadata', () => {
  // A `node: ">=20 <23"` range here silently changes which version a consumer
  // resolves from the registry on newer Node. There is nothing in a browser
  // React library that needs a Node bound; keep it out, and let the CI matrix
  // prove the package installs on every supported version.
  it('does not constrain the consumer Node version', () => {
    expect(pkg.engines?.node).toBeUndefined()
  })

  // A bare `import 'raditail/theme/styles.css'` has no bindings, so a bundler
  // that honours `sideEffects` may drop it and leave every component unstyled.
  // The pattern must therefore match nested files, not just the package root.
  it('marks nested CSS as side-effectful', () => {
    expect(pkg.sideEffects).toContain('**/*.css')
  })

  it('ships the documentation with the tarball', () => {
    for (const entry of [
      'dist',
      'docs/api',
      'README.md',
      'CHANGELOG.md',
      'COMPOSITION.md',
      'STYLING.md',
      'THEMING.md',
      'LICENSE',
    ]) {
      expect(pkg.files, `files is missing ${entry}`).toContain(entry)
    }
  })

  it('does not publish internal notes', () => {
    for (const entry of pkg.files) {
      expect(entry).not.toMatch(/audit/i)
    }
  })

  // Radix primitives are only needed by the components that use them, and the
  // per-component subpath exports let a consumer install just those.
  it('treats every primitive peer as optional', () => {
    const optional = Object.entries(pkg.peerDependenciesMeta)
      .filter(([, meta]) => meta.optional)
      .map(([name]) => name)
      .sort()

    const expected = Object.keys(pkg.peerDependencies)
      .filter((name) => name !== 'react' && name !== 'react-dom')
      .sort()

    expect(optional).toEqual(expected)
  })

  it('keeps react and react-dom required', () => {
    expect(pkg.peerDependenciesMeta.react?.optional).not.toBe(true)
    expect(pkg.peerDependenciesMeta['react-dom']?.optional).not.toBe(true)
  })
})

describe('subpath exports', () => {
  // The barrel must stay valid forever; these are additive.
  it('keeps the documented entry points', () => {
    for (const entry of [
      '.',
      './theme',
      './theme/tailwind.css',
      './theme/styles.css',
      './package.json',
    ]) {
      expect(Object.keys(pkg.exports), `exports is missing ${entry}`).toContain(
        entry
      )
    }
  })

  it('exposes exactly one subpath per component', () => {
    const subpaths = Object.keys(pkg.exports)
      .filter(
        (key) =>
          key.startsWith('./') &&
          !key.startsWith('./theme') &&
          key !== './package.json'
      )
      .map((key) => key.slice(2))
      .sort()

    expect(subpaths).toEqual([...componentNames].sort())
  })

  it('points every subpath at a built module and its types', () => {
    for (const name of componentNames) {
      const entry = pkg.exports[`./${name}`] as {
        import: Record<string, string>
        require: Record<string, string>
      }

      expect(entry.import.default).toBe(`./dist/${name}/index.mjs`)
      expect(entry.import.types).toBe(`./dist/${name}/index.d.ts`)
      expect(entry.require.default).toBe(`./dist/${name}/index.cjs`)
      expect(entry.require.types).toBe(`./dist/${name}/index.d.cts`)
    }
  })

  it('does not declare a wildcard that would bypass type checking', () => {
    expect(Object.keys(pkg.exports)).not.toContain('./*')
  })
})
