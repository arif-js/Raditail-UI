import { cpSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const projectRoot = resolve(__dirname, '..')
const filesToCopy = ['src/theme/styles.css', 'src/theme/tailwind.css']

for (const relativePath of filesToCopy) {
  const source = resolve(projectRoot, relativePath)
  const target = resolve(projectRoot, 'dist', relativePath.replace('src/', ''))
  mkdirSync(dirname(target), { recursive: true })
  cpSync(source, target)
}

console.log('Copied theme CSS files to dist/theme')
