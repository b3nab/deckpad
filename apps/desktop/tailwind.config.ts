import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      success: '#07B39B',
      error: '#EF4E7B',
      appBack: '#030303',
      boxBack: '#070709'
    },
    extend: {}
  },
  plugins: []
}
