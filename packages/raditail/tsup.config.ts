import { defineConfig, type Options } from 'tsup'

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
  splitting: false,
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
    entry: { index: 'src/index.ts' },
    clean: true,
  },
  {
    ...shared,
    entry: { 'theme/index': 'src/theme/index.ts' },
    clean: false,
  },
])
