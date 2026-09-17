import type { Config } from 'tailwindcss'
import { raditailPreset } from 'raditail/theme'

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}'],
  presets: [raditailPreset],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
