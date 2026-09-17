import { defineConfig, type Options } from 'tsup'
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const RADIX_EXTERNALS = [
  '@radix-ui/react-accordion',
  '@radix-ui/react-alert-dialog',
  '@radix-ui/react-avatar',
  '@radix-ui/react-checkbox',
  '@radix-ui/react-collapsible',
  '@radix-ui/react-context-menu',
  '@radix-ui/react-dialog',
  '@radix-ui/react-dropdown-menu',
  '@radix-ui/react-hover-card',
  '@radix-ui/react-navigation-menu',
  '@radix-ui/react-popover',
  '@radix-ui/react-progress',
  '@radix-ui/react-radio-group',
  '@radix-ui/react-select',
  '@radix-ui/react-slot',
  '@radix-ui/react-scroll-area',
  '@radix-ui/react-separator',
  '@radix-ui/react-tabs',
  '@radix-ui/react-toast',
  '@radix-ui/react-toggle-group',
  '@radix-ui/react-tooltip',
  '@radix-ui/react-switch',
  '@radix-ui/react-slider',
]

/**
 * One entry per component, keyed so the output lands at `dist/<name>/index.*`.
 *
 * This is what makes the barrel tree-shakeable. With a single bundled
 * `dist/index.mjs`, a consumer importing one component has to pull in the file
 * that defines all of them - and because each definition reads
 * `SomePrimitive.X.displayName` at module scope, no bundler could prove any of
 * it was unused. Emitting per-component modules lets a bundler keep the one
 * component it needs and drop the rest.
 */
function componentEntries(): Record<string, string> {
  const componentsDir = join(__dirname, 'src/components')
  const entries: Record<string, string> = {}

  for (const name of readdirSync(componentsDir)) {
    const source = `src/components/${name}/${name}.tsx`
    if (existsSync(join(__dirname, source))) {
      entries[`${name}/index`] = source
    }
  }

  return entries
}

const shared: Options = {
  format: ['esm', 'cjs'],
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.cjs',
    }
  },
  dts: true,
  sourcemap: true,
  treeshake: true,
  // Emits shared chunks instead of inlining them into every entry. Without this
  // each component module would carry its own copy of `cn`, the size helpers
  // and `cva`.
  splitting: true,
  minify: false,
  external: ['react', 'react-dom', 'lucide-react', ...RADIX_EXTERNALS],
  loader: {
    '.css': 'copy',
  },
  esbuildOptions(options) {
    options.jsx = 'automatic'
  },
}

export default defineConfig([
  {
    ...shared,
    // Cleaning is done by the `clean` script before tsup starts. tsup builds
    // these two configs concurrently, so a `clean` here races the other
    // config's output and can delete files it has already emitted.
    entry: {
      index: 'src/index.ts',
      ...componentEntries(),
    },
    clean: false,
  },
  {
    ...shared,
    entry: { 'theme/index': 'src/theme/index.ts' },
    clean: false,
  },
])
