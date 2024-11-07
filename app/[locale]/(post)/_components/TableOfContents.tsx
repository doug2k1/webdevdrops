'use client'

import { Transition } from '@headlessui/react'
import { MouseEvent, useEffect, useState } from 'react'
import { FaCircleArrowUp, FaListUl } from 'react-icons/fa6'

type HeadingType = { id: string; title: string; level: number }

export const TableOfContents = () => {
  const [headings, setHeadings] = useState<HeadingType[]>([])
  const [mobileTocOpen, setMobileTocOpen] = useState(false)

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelector('#postContents')?.querySelectorAll('h2, h3') || []
    )

    setHeadings(
      headingElements.map((heading) => ({
        id: heading.id,
        title: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1)),
      }))
    )
  }, [])

  const backToTop = (event: MouseEvent) => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // remove the hash from the URL
    history.replaceState(
      '',
      document.title,
      window.location.pathname + window.location.search
    )
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <>
      <>
        <div className="sticky top-4 -mt-4 ml-[100%] h-4 md:hidden">
          <button
            className="ml-[-32px] rounded-full bg-white p-2 shadow-md dark:bg-gray-800"
            onClick={() => {
              setMobileTocOpen(true)
            }}
            title="Toggle table of contents"
          >
            <FaListUl />
          </button>
        </div>

        <button
          className="fixed bottom-4 right-4 rounded-full bg-white p-2 shadow-md dark:bg-gray-800 md:hidden"
          onClick={backToTop}
          title="Scroll to top"
        >
          <FaCircleArrowUp />
        </button>
      </>

      <Transition show={mobileTocOpen}>
        <div
          className="fixed inset-0 bg-black/60 pr-16 transition-transform duration-300 data-[closed]:-translate-x-full md:sticky md:top-0 md:ml-[100%] md:h-0"
          data-testid="toc"
        >
          <nav className="size-full bg-white pl-4 shadow-lg md:h-auto md:w-52 md:bg-transparent md:pr-0 md:shadow-none">
            <h2 className="my-0 flex items-center border-b border-gray-300 py-1 text-base font-semibold text-gray-600 dark:border-gray-700">
              <FaListUl className="mr-2 inline-block" /> Contents
            </h2>

            <ul className="list-none px-2 pb-2 text-sm">
              {headings.map((heading) => (
                <TOCItem heading={heading} key={heading.id} />
              ))}

              <li className="mt-4 pl-0">
                <FaCircleArrowUp className="mr-1 inline-block text-gray-600 dark:text-gray-400" />
                <a href="#" onClick={backToTop}>
                  Back to top
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </Transition>
    </>
  )
}

const TOCItem = ({ heading }: { heading: HeadingType }) => {
  const levelClass = {
    2: 'pl-0',
    3: 'pl-2',
  }[heading.level]

  return (
    <li className={`${levelClass} flex`}>
      <span className="mr-1 text-gray-400">•</span>
      <a className="flex-1 py-1 md:flex-none md:py-0" href={`#${heading.id}`}>
        {heading.title}
      </a>
    </li>
  )
}
