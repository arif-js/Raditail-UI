import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')

// esbuild strips module-level directives from bundled output, so the banner
// option cannot be used for this. Prepend it after the bundle is written.
const DIRECTIVE = "'use client';\n"
const targets = ['dist/index.mjs', 'dist/index.cjs']

for (const target of targets) {
  const filePath = resolve(projectRoot, target)
  if (!existsSync(filePath)) continue

  const source = readFileSync(filePath, 'utf8')
  if (source.startsWith(DIRECTIVE.trim())) continue

  writeFileSync(filePath, DIRECTIVE + source)

  // The inserted line shifts every mapping down by one. VLQ mappings are
  // semicolon-delimited per output line, so a leading ';' realigns them.
  const mapPath = `${filePath}.map`
  if (existsSync(mapPath)) {
    const map = JSON.parse(readFileSync(mapPath, 'utf8'))
    map.mappings = `;${map.mappings}`
    writeFileSync(mapPath, JSON.stringify(map))
  }
}

console.log('Added "use client" directive to dist entries')
