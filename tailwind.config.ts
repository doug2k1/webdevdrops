import typographyPlugin from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.ts',
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
            fontSize: '1.1rem',
            lineHeight: '1.6',
            h1: {
              fontSize: '2.6em',
            },
            h2: {
              fontSize: '2em',
            },
            h3: {
              fontSize: '1.5em',
            },
            a: {
              color: theme('colors.main'),
              '&:hover': {
                color: theme('colors.gray.800'),
              },
            },
            strong: {
              color: 'inherit',
            },
            'pre code': {
              background: 'transparent',
              fontSize: '0.85em',
            },
            code: {
              padding: '2px 4px',
              fontWeight: 400,
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              borderRadius: '4px',
            },
            'code::before': {
              content: '',
            },
            'code::after': {
              content: '',
            },
            figure: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },
            'figure figcaption': {
              textAlign: 'center',
            },
            'figure > div': {
              border: `1px solid ${theme('colors.gray.200')}`,
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
