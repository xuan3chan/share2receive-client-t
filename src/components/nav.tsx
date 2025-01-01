// src/components/authpage/nav.tsx
'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { navLink } from '@/types/navTypes'
import { usePathname } from 'next/navigation'

const Navigation = ({ navLink }: { navLink: navLink[] }) => {
  const [showHeader, setShowHeader] = useState(true)
  const [showBg, setShowBg] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false)
        setShowBg(true)
      } else {
        setShowHeader(true)
      }
      setLastScrollY(window.scrollY)
    }

    const handleScrollTop = () => {
      if (pathname === '/' && window.scrollY === 0) {
        setShowBg(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleScrollTop)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleScrollTop)
    }
  }, [lastScrollY, pathname])

  const isActive = (path: string) => {
    if (pathname === '/shop') {
      return path === '/shop'
    }
    return pathname === path
  }

  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 z-modal text-green-500 text-lg font-medium w-full transition-transform duration-300 overflow-hidden',
          {
            '-translate-y-0': !showHeader,
            'translate-y-[102px]': showHeader,
            'md:translate-y-16': showHeader,
            'bg-green-100': showBg,
            'text-white': !showBg,
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
                      'before:none before:left-0 before:right-0  before:-bottom-3 before:mx-auto before:my-0 before:rounded-sm before:h-[1px] md:before:h-[3px] before:bg-green-900 relative',
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

export default Navigation
