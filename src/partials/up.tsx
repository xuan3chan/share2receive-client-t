// src/partials/up.tsx
'use client'

import { useState, useEffect } from 'react'
import { IconCaretUpFilled } from '@tabler/icons-react'

export default function ScrollingUp() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {showButton && (
        <div className="transition-all">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded-full animate-fadeinup"
          >
            <IconCaretUpFilled size={35} />
          </button>
        </div>
      )}
    </>
  )
}
