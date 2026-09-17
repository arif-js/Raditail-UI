#!/usr/bin/env node
/**
 * Regenerate the per-component subpath exports in package.json.
 *
 * Each component directory becomes `raditail/<name>`, pointing at the module
 * tsup emits for it (see `componentEntries()` in tsup.config.ts). Run this after
 * adding or removing a component; `src/__tests__/package-metadata.test.ts`
 * fails CI if the two drift apart.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const componentsDir = join(packageRoot, 'src/components')

const names = readdirSync(componentsDir)
  .filter((name) => existsSync(join(componentsDir, name, `${name}.tsx`)))
  .sort()

/** @type {Record<string, { import: { types: string; default: string }; require: { types: string; default: string } }>} */
const subpaths = {}
for (const name of names) {
  subpaths[`./${name}`] = {
    import: {
      types: `./dist/${name}/index.d.ts`,
      default: `./dist/${name}/index.mjs`,
    },
    require: {
      types: `./dist/${name}/index.d.cts`,
      default: `./dist/${name}/index.cjs`,
    },
  }
}

const pkgPath = join(packageRoot, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))

pkg.exports = {
  '.': pkg.exports['.'],
  './theme': pkg.exports['./theme'],
  './theme/tailwind.css': pkg.exports['./theme/tailwind.css'],
  './theme/styles.css': pkg.exports['./theme/styles.css'],
  ...subpaths,
  './package.json': pkg.exports['./package.json'],
}

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
console.log(`Synced ${names.length} subpath exports (${names.join(', ')})`)
