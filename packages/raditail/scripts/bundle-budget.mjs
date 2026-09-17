#!/usr/bin/env node
/**
 * Bundle budget check.
 *
 * Bundles small consumer fixtures against the *built* package (via a symlinked
 * `node_modules/raditail`, so the real `exports` map is exercised) and asserts
 * that importing a single component does not drag in the rest of the library.
 *
 * Requires `dist/` to exist: run `pnpm build` first.
 *
 * Usage:
 *   node scripts/bundle-budget.mjs            # check against budgets
 *   node scripts/bundle-budget.mjs --report   # print sizes only, never fail
 */
import { build } from 'esbuild'
import { gzipSync } from 'node:zlib'
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const reportOnly = process.argv.includes('--report')

/**
 * Importing one component from the barrel must stay cheap, and must not drag in
 * unrelated primitives. Before the per-component build landed this fixture was
 * 68.6 kB gzip across 48 Radix modules; the ceiling below is set with headroom
 * over the ~8.9 kB it costs now, and the module assertion is what actually
 * guards the regression.
 */
const BUTTON_GZIP_CEILING = 25_000

/** Subpath imports skip the barrel re-export graph entirely. */
const SUBPATH_GZIP_CEILING = 15_000

/**
 * Each fixture is a consumer entry point plus the budgets it must respect.
 */
const FIXTURES = [
  {
    name: 'nothing',
    source: `export const nothing = 1`,
    description: 'baseline - no raditail import',
  },
  {
    name: 'button',
    source: `import { Button } from 'raditail'\nexport { Button }`,
    description: 'named import of a single component from the barrel',
    maxGzip: BUTTON_GZIP_CEILING,
    forbiddenModules: ['@radix-ui/react-select', '@radix-ui/react-dialog'],
  },
  {
    name: 'button-subpath',
    source: `import { Button } from 'raditail/button'\nexport { Button }`,
    description: 'single component via its own subpath export',
    maxGzip: SUBPATH_GZIP_CEILING,
    forbiddenModules: ['@radix-ui/react-select', '@radix-ui/react-dialog'],
  },
  {
    name: 'all',
    source: `import * as Raditail from 'raditail'\nexport { Raditail }`,
    description: 'namespace import - the whole library',
  },
]

/** Externals a consumer always supplies itself. */
const EXTERNALS = ['react', 'react-dom', 'react/jsx-runtime']

const formatBytes = (n) => `${n.toLocaleString('en-US')} B`

function groupInputs(metafile) {
  const inputs = {}
  for (const output of Object.values(metafile.outputs)) {
    for (const [file, info] of Object.entries(output.inputs)) {
      const key = file.replace(
        /^.*node_modules\/\.pnpm\/[^/]+\/node_modules\//,
        ''
      )
      inputs[key] = (inputs[key] ?? 0) + info.bytesInOutput
    }
  }
  return inputs
}

async function bundleFixture(fixture, scratchDir) {
  const entry = join(scratchDir, `${fixture.name}.tsx`)
  const outfile = join(scratchDir, `${fixture.name}.bundle.mjs`)
  writeFileSync(entry, fixture.source + '\n')

  const result = await build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'browser',
    minify: true,
    metafile: true,
    external: EXTERNALS,
    logLevel: 'silent',
  })

  const bytes = readFileSync(outfile)
  return {
    raw: bytes.length,
    gzip: gzipSync(bytes).length,
    inputs: groupInputs(result.metafile),
  }
}

function summarise(inputs) {
  const radix = Object.entries(inputs).filter(([k]) =>
    k.startsWith('@radix-ui/')
  )
  const floating = Object.entries(inputs)
    .filter(([k]) => k.startsWith('@floating-ui/'))
    .reduce((sum, [, v]) => sum + v, 0)
  const self = Object.entries(inputs)
    .filter(([k]) => k.startsWith('dist/'))
    .reduce((sum, [, v]) => sum + v, 0)

  return {
    radixCount: radix.length,
    radixBytes: radix.reduce((sum, [, v]) => sum + v, 0),
    floatingBytes: floating,
    selfBytes: self,
    largest: Object.entries(inputs)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8),
  }
}

const scratchDir = mkdtempSync(join(tmpdir(), 'raditail-budget-'))
let failed = false

try {
  // A consumer-shaped node_modules so `raditail/...` resolves through the real
  // package.json `exports` map rather than a path alias.
  const fakeModules = join(scratchDir, 'node_modules')
  mkdirSync(fakeModules, { recursive: true })
  symlinkSync(packageRoot, join(fakeModules, 'raditail'), 'junction')

  console.log('Bundle budget\n')

  for (const fixture of FIXTURES) {
    // Entries live next to the node_modules holding the symlink, so bare
    // `raditail` specifiers resolve through the published `exports` map.
    const result = await bundleFixture(fixture, scratchDir)
    const summary = summarise(result.inputs)

    console.log(`  ${fixture.name}`)
    console.log(`    ${fixture.description}`)
    console.log(
      `    raw ${formatBytes(result.raw)}   gzip ${formatBytes(result.gzip)}`
    )
    if (summary.radixCount > 0) {
      console.log(
        `    radix modules ${summary.radixCount} (${formatBytes(summary.radixBytes)})` +
          `, floating-ui ${formatBytes(summary.floatingBytes)}` +
          `, raditail ${formatBytes(summary.selfBytes)}`
      )
    }

    if (fixture.maxGzip && result.gzip > fixture.maxGzip) {
      console.error(
        `    FAIL gzip ${formatBytes(result.gzip)} exceeds budget ${formatBytes(fixture.maxGzip)}`
      )
      failed = true
    }

    for (const forbidden of fixture.forbiddenModules ?? []) {
      const present = Object.keys(result.inputs).some(
        (k) => k === forbidden || k.startsWith(`${forbidden}/`)
      )
      if (present) {
        console.error(
          `    FAIL ${forbidden} is reachable from this fixture's module graph`
        )
        failed = true
      }
    }

    if (reportOnly) {
      console.log(`    largest inputs:`)
      for (const [k, v] of summary.largest) {
        console.log(`      ${String(v).padStart(7)}  ${k}`)
      }
    }
    console.log()
  }

  // Consumer stylesheet.
  //
  // A bare `import 'raditail/theme/styles.css'` has no bindings, so a bundler
  // that consults `sideEffects` is permitted to drop it entirely and leave every
  // component unstyled. This asserts the tokens actually reach the consumer's
  // CSS output.
  //
  // Caveat, so nobody over-reads this check: esbuild ignores `sideEffects` for
  // CSS files outright (verified - it keeps CSS even with `sideEffects: []`), so
  // this guard cannot detect a bad `sideEffects` glob. It catches everything
  // else that could drop the tokens. Webpack, for the record, treats a pattern
  // without a `/` as `**/<pattern>`, so `*.css` and `**/*.css` are equivalent
  // there.
  const cssEntry = join(scratchDir, 'css-tokens.tsx')
  const cssOutfile = join(scratchDir, 'css-tokens.mjs')
  writeFileSync(cssEntry, `import 'raditail/theme/styles.css'\n`)
  await build({
    entryPoints: [cssEntry],
    outfile: cssOutfile,
    bundle: true,
    format: 'esm',
    external: EXTERNALS,
    logLevel: 'silent',
  })

  const emittedCss = join(scratchDir, 'css-tokens.css')
  const css = existsSync(emittedCss) ? readFileSync(emittedCss, 'utf8') : ''

  console.log('  css-tokens')
  console.log('    bare CSS import must survive `sideEffects` pruning')
  console.log(`    emitted ${formatBytes(css.length)} of CSS`)

  const requiredTokens = [
    ['--rt-primary: 59 130 246', 'light-mode primary token'],
    ['--rt-primary: 96 165 250', 'dark-mode primary override'],
    ['--rt-bg', 'resolved background token'],
  ]

  let cssOk = true
  for (const [needle, label] of requiredTokens) {
    if (!css.includes(needle)) {
      console.error(`    FAIL missing ${label} (${needle})`)
      cssOk = false
      failed = true
    }
  }
  if (cssOk) {
    console.log('    ok - tokens present in the consumer stylesheet')
  }
  console.log()
} finally {
  rmSync(scratchDir, { recursive: true, force: true })
}

if (failed && !reportOnly) {
  console.error('Bundle budget failed.\n')
  process.exit(1)
}

console.log(
  reportOnly ? 'Report only - budgets not enforced.\n' : 'Bundle budget OK\n'
)
