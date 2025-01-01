import tailwindPresetMantine from 'tailwind-preset-mantine'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/partials/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [tailwindPresetMantine()],
  plugins: [],
  theme: {
    extend: {
      keyframes: {
        fadeinup: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeinup: 'fade-in-up 1s ease-in-out 0.25s 1',
      },
    },
    backgroundPosition: {
      center_90: 'center 96px',
    },
  },
}
export default config
