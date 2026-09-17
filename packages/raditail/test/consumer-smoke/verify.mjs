#!/usr/bin/env node
/**
 * Consumer smoke verification.
 *
 * Runs inside a generated app that installed the packed tarball. Asserts that
 * the build produced real component output and, critically, that the theme
 * tokens reached the stylesheet - the failure mode when a bare CSS import is
 * dropped is "every component renders unstyled", which is otherwise silent.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const distDir = join(process.cwd(), 'dist')
const assetsDir = join(distDir, 'assets')
const installedDir = join(process.cwd(), 'node_modules/raditail')

if (!existsSync(distDir)) {
  console.error('smoke: no dist/ - did the build run?')
  process.exit(1)
}

const readAll = (dir, ext) =>
  readdirSync(dir)
    .filter((f) => f.endsWith(ext))
    .map((f) => readFileSync(join(dir, f), 'utf8'))

const css = readAll(assetsDir, '.css').join('\n')
const js = readAll(assetsDir, '.js').join('\n')

// The directive has to be on every client entry, not just the barrel: a Next.js
// App Router build reaching a component through a subpath needs the same
// boundary, or it fails with `createContext is not a function`.
const hasDirective = (relative) => {
  const file = join(installedDir, relative)
  if (!existsSync(file)) return false
  return readFileSync(file, 'utf8').trimStart().startsWith("'use client'")
}

const checks = [
  [css.length > 0, 'a stylesheet was emitted'],
  [js.length > 0, 'a script bundle was emitted'],
  [css.includes('--rt-primary'), 'theme tokens reached the stylesheet'],
  [
    css.includes('--rt-primary-color'),
    'resolved colour tokens reached the stylesheet',
  ],
  [css.includes('icon-only'), 'component variant classes were generated'],
  [js.includes('Loading'), "the library's component code is in the bundle"],
  [js.includes('From subpath'), 'the subpath entry point is in the bundle'],
  [hasDirective('dist/index.mjs'), 'barrel carries the "use client" directive'],
  [
    hasDirective('dist/index.cjs'),
    'barrel (CJS) carries the "use client" directive',
  ],
  [
    hasDirective('dist/dialog/index.mjs'),
    'subpath carries the "use client" directive',
  ],
  [
    hasDirective('dist/dialog/index.cjs'),
    'subpath (CJS) carries the "use client" directive',
  ],
  [
    hasDirective('dist/button/index.mjs'),
    'primitive subpath carries the directive',
  ],
]

let failed = false
for (const [ok, label] of checks) {
  console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${label}`)
  if (!ok) failed = true
}

console.log(
  `\n  css ${css.length.toLocaleString()} B, js ${js.length.toLocaleString()} B`
)

if (failed) {
  console.error('\nsmoke: verification failed\n')
  process.exit(1)
}
console.log('smoke: ok\n')
