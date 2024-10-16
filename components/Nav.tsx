'use client'

import { LocaleType } from '@/libs/i18n'
import { useCallback, useState } from 'react'
import AnimateHeight from 'react-animate-height'
import { FaBars, FaTimes } from 'react-icons/fa'
import { NavContents } from './NavContents'

interface Props {
  locale: LocaleType
}

export function Nav({ locale }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuClick = useCallback(() => {
    setMenuOpen(!menuOpen)
  }, [menuOpen])

  const height = menuOpen ? 'auto' : 0

  return (
    <>
      <a
        className="absolute right-0 top-0 mr-[18px] mt-[18px] rounded border border-solid border-white p-2 text-xl text-white opacity-80 sm:hidden"
        onClick={handleMenuClick}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </a>

      <NavContents className="hidden sm:flex" locale={locale} />
      <AnimateHeight height={height} className="sm:hidden">
        <NavContents locale={locale} />
      </AnimateHeight>
    </>
  )
}
