import typographyPlugin from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './libs/**/*.ts',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        main: '#5475FB',
      },
      typography: ({ theme }: { theme: (key: string) => string }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.main'),
              '&:hover': {
                color: theme('colors.gray.800'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.200'),
              },
            },
            'a strong': {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.200'),
              },
            },
            h1: {
              color: theme('colors.gray.300'),
            },
            h2: {
              color: theme('colors.gray.300'),
            },
            h3: {
              color: theme('colors.gray.300'),
            },
            h4: {
              color: theme('colors.gray.300'),
            },
            h5: {
              color: theme('colors.gray.300'),
            },
            h6: {
              color: theme('colors.gray.300'),
            },
            strong: {
              color: theme('colors.gray.300'),
            },
            code: {
              color: theme('colors.gray.400'),
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            },
            'pre code': {
              background: 'transparent',
              color: 'inherit',
            },
            blockquote: {
              color: theme('colors.gray.200'),
              borderLeftColor: theme('colors.gray.700'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.600'),
            },
            'figure figcaption': {
              color: theme('colors.gray.400'),
            },
            'figure > div': {
              border: `1px solid ${theme('colors.gray.600')}`,
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: { opacity: ['disabled'] },
    typography: ['dark'],
  },
  plugins: [typographyPlugin],
}
export default config
