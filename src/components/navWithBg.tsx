// src/components/authpage/nav.tsx
'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { navLink } from '@/types/navTypes'
import { usePathname, useParams, useSearchParams } from 'next/navigation'

const NavigationWithBg = ({ navLink }: { navLink: navLink[] }) => {
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const params = useParams()

  const searchParams = useSearchParams()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setShowHeader(false)
      } else {
        // Scrolling up
        setShowHeader(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY, pathname, params])

  const isActive = (linkPath: string) => {
    // Tách path và search params của link
    const [basePath, searchString] = linkPath.split('?')

    // Kiểm tra path có khớp không
    if (pathname !== basePath) return false

    // Nếu không có search params, chỉ cần so sánh path
    if (!searchString) return !searchParams.toString()

    // So sánh search params
    const linkParams = new URLSearchParams(searchString)
    const currentParams = searchParams

    // Kiểm tra từng param trong link có khớp với current params không
    for (const [key, value] of Array.from(linkParams.entries())) {
      if (currentParams.get(key) !== value) return false
    }

    return true
  }

  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 z-modal bg-green-100 text-green-700 text-lg font-medium w-full transition-transform duration-300 overflow-hidden',
          {
            '-translate-y-0': !showHeader,
            'translate-y-[102px]': showHeader,
            'md:translate-y-16': showHeader,
          },
        )}
      >
        <div className="container px-1 md:px-44">
          <ul className="flex flex-row">
            {navLink.map((link) => (
              <Link key={link.href} href={link.href}>
                <li
                  key={link.href}
                  className="p-0 md:text-xl md:px-4 md:py-3 cursor-pointer hover:bg-green-200 hover:text-green-800 px-1 py-3 text-xs font-medium"
                >
                  <p
                    className={clsx(
                      'before:none before:left-0 before:right-0  before:-bottom-3 before:mx-auto before:my-0 before:rounded-sm before:h-[1px] md:before:h-[3px]  before:bg-green-900 relative',
                      { 'before:absolute text-green-800': isActive(link.href) },
                    )}
                  >
                    {link.label}
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default NavigationWithBg
