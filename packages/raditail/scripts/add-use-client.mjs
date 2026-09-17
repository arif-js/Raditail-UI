import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')
const distDir = resolve(projectRoot, 'dist')

// esbuild strips module-level directives from bundled output, so the banner
// option cannot be used for this. Prepend it after the bundle is written.
const DIRECTIVE = "'use client';\n"

/**
 * Every shipped component is a client component: they are built on Radix
 * primitives, which use context, refs and event handlers throughout. The
 * directive therefore belongs on each emitted entry, not just the barrel —
 * a consumer reaching a component through `raditail/dialog` needs the same
 * boundary as one reaching it through `raditail`, otherwise a Next.js App
 * Router build fails with `createContext is not a function`.
 *
 * `dist/theme` is excluded on purpose: it is a Tailwind preset, not a component.
 *
 * If a genuinely presentational, hook-free component is ever added, leave it out
 * of this list so it stays usable from a server tree.
 */
function entryFiles() {
  const files = ['dist/index.mjs', 'dist/index.cjs']

  for (const entry of readdirSync(distDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === 'theme') continue
    for (const extension of ['mjs', 'cjs']) {
      files.push(`dist/${entry.name}/index.${extension}`)
    }
  }

  return files
}

let patched = 0

for (const relativePath of entryFiles()) {
  const filePath = resolve(projectRoot, relativePath)
  if (!existsSync(filePath)) continue

  const source = readFileSync(filePath, 'utf8')
  if (source.startsWith(DIRECTIVE.trim())) continue

  writeFileSync(filePath, DIRECTIVE + source)
  patched += 1

  // The inserted line shifts every mapping down by one. VLQ mappings are
  // semicolon-delimited per output line, so a leading ';' realigns them.
  const mapPath = `${filePath}.map`
  if (existsSync(mapPath)) {
    const map = JSON.parse(readFileSync(mapPath, 'utf8'))
    map.mappings = `;${map.mappings}`
    writeFileSync(mapPath, JSON.stringify(map))
  }
}

console.log(`Added "use client" directive to ${patched} dist entries`)
