#!/usr/bin/env node
/**
 * Pack the library, install the tarball into a throwaway consumer app, build it
 * with Vite + Tailwind, and verify the result.
 *
 * This is the only check that exercises the real install path: the `files`
 * allow-list, the `exports` map, peer resolution and the published stylesheets.
 * Run it on several Node versions (`--engine-strict`) to catch an `engines`
 * range that would silently exclude the version running here.
 *
 * Usage:
 *   node scripts/consumer-smoke.mjs           # pack, install, build, verify
 *   node scripts/consumer-smoke.mjs --keep    # keep the scratch app for debugging
 */
import { spawnSync } from 'node:child_process'
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const fixtureRoot = join(packageRoot, 'test/consumer-smoke')
const keep = process.argv.includes('--keep')
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

const pkg = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'))

/** Peers the fixture manages itself, so the app is deterministic. */
const PINNED = {
  react: '^18.3.1',
  'react-dom': '^18.3.1',
  // The package allows v4 too, but v3 is the only path verified today. See TWN-01.
  tailwindcss: '^3.4.14',
}

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: false,
  })
  if (result.status !== 0) {
    console.error(
      `\nconsumer-smoke: \`${command} ${args.join(' ')}\` failed in ${cwd}\n`
    )
    process.exit(1)
  }
}

if (!existsSync(join(packageRoot, 'dist/index.mjs'))) {
  console.error('consumer-smoke: dist/ is missing - run `pnpm build` first.')
  process.exit(1)
}

const scratch = mkdtempSync(join(tmpdir(), 'raditail-consumer-'))
console.log(`consumer-smoke: scratch app at ${scratch}\n`)

try {
  // 1. Pack exactly what would be published.
  run(npm, ['pack', '--pack-destination', scratch], packageRoot)
  const tarball = readdirSync(scratch).find((f) => f.endsWith('.tgz'))
  if (!tarball) {
    console.error('consumer-smoke: `npm pack` produced no tarball')
    process.exit(1)
  }
  console.log(`\nconsumer-smoke: packed ${tarball}\n`)

  // 2. Materialise the consumer app from the fixture.
  const appDir = join(scratch, 'app')
  mkdirSync(appDir, { recursive: true })
  for (const entry of [
    'index.html',
    'src',
    'vite.config.ts',
    'postcss.config.cjs',
    'tailwind.config.cjs',
    'verify.mjs',
  ]) {
    cpSync(join(fixtureRoot, entry), join(appDir, entry), { recursive: true })
  }

  const dependencies = { raditail: `file:${join(scratch, tarball)}`, ...PINNED }
  for (const [name, range] of Object.entries(pkg.peerDependencies ?? {})) {
    if (name in dependencies) continue
    dependencies[name] = range
  }

  writeFileSync(
    join(appDir, 'package.json'),
    JSON.stringify(
      {
        name: 'raditail-consumer-smoke',
        private: true,
        version: '0.0.0',
        type: 'module',
        scripts: { build: 'vite build' },
        dependencies,
        devDependencies: {
          '@vitejs/plugin-react': '^4.3.3',
          autoprefixer: '^10.4.20',
          postcss: '^8.4.47',
          vite: '^5.4.10',
        },
      },
      null,
      2
    ) + '\n'
  )

  // 3. Install the tarball. `--engine-strict` makes an over-narrow `engines`
  //    range a hard failure instead of a warning nobody reads.
  run(npm, ['install', '--engine-strict', '--no-audit', '--no-fund'], appDir)

  // 4. Assert the install resolved to what we packed.
  const installedDir = join(appDir, 'node_modules/raditail')
  const installed = JSON.parse(
    readFileSync(join(installedDir, 'package.json'), 'utf8')
  )
  console.log(`\nconsumer-smoke: installed raditail@${installed.version}`)
  if (installed.version !== pkg.version) {
    console.error(
      `consumer-smoke: installed raditail@${installed.version} but packed ${pkg.version}`
    )
    process.exit(1)
  }

  // 5. The `files` allow-list must actually ship the documentation.
  for (const doc of [
    'README.md',
    'CHANGELOG.md',
    'COMPOSITION.md',
    'STYLING.md',
    'THEMING.md',
    'LICENSE',
    'docs/api/README.md',
  ]) {
    if (!existsSync(join(installedDir, doc))) {
      console.error(
        `consumer-smoke: ${doc} is missing from the published tarball`
      )
      process.exit(1)
    }
  }

  // 6. Build the consumer app and verify the output.
  console.log()
  run(npm, ['run', 'build'], appDir)
  console.log()
  run(process.execPath, ['verify.mjs'], appDir)
} finally {
  if (keep) {
    console.log(`consumer-smoke: kept ${scratch}\n`)
  } else {
    rmSync(scratch, { recursive: true, force: true })
  }
}
