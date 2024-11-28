'use client'

import { ReactNode, useCallback, useState } from 'react'
import AnimateHeight from 'react-animate-height'
import { FaBars, FaTimes } from 'react-icons/fa'

interface Props {
  contents: ReactNode
  mobileContents: ReactNode
}

export function Nav({ contents, mobileContents }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuClick = useCallback(() => {
    setMenuOpen(!menuOpen)
  }, [menuOpen])

  const height = menuOpen ? 'auto' : 0

  return (
    <>
      <button
        className="absolute right-0 top-0 mr-[18px] mt-[18px] rounded border border-solid border-white p-2 text-xl text-white opacity-80 sm:hidden"
        onClick={handleMenuClick}
        aria-label="Toggle main navigation"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {contents}
      <AnimateHeight height={height}>{mobileContents}</AnimateHeight>
    </>
  )
}
