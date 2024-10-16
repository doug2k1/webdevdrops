'use client'

import { useTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'
import { BiLaptop, BiMoon, BiSun } from 'react-icons/bi'
import { useIntl } from 'react-intl'

const modes = [
  {
    key: 'light',
    icon: <BiSun />,
    label: 'themeLight',
  },
  {
    key: 'dark',
    icon: <BiMoon />,
    label: 'themeDark',
  },
  {
    key: 'system',
    icon: <BiLaptop />,
    label: 'themeSystem',
  },
]

export function DarkModeToggle() {
  const intl = useIntl()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const handleDarkModeChange = useCallback(
    (key: string) => {
      setTheme(key)
    },
    [setTheme]
  )

  if (!mounted) {
    return (
      <>
        {modes.map((mode) => {
          return (
            <button
              key={mode.key}
              className={
                'mx-2 py-4 text-2xl text-white text-opacity-20  focus:outline-none sm:py-2'
              }
              disabled
            >
              {mode.icon}
            </button>
          )
        })}
      </>
    )
  }

  return (
    <>
      {modes.map((mode) => {
        const activeClasses =
          theme === mode.key ? 'text-opacity-100' : 'text-opacity-50'

        return (
          <button
            key={mode.key}
            className={`${activeClasses} mx-2 py-4 text-2xl text-white hover:text-opacity-100 focus:outline-none sm:py-2`}
            title={intl.formatMessage({ id: mode.label })}
            onClick={() => handleDarkModeChange(mode.key)}
          >
            {mode.icon}
          </button>
        )
      })}
    </>
  )
}
