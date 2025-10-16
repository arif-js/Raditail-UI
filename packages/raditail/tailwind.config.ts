import type { Config } from 'tailwindcss'
import { raditailPreset } from './src/theme/preset'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  presets: [raditailPreset],
  theme: {
    extend: {},
  },
}

export default config
