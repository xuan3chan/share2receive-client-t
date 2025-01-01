'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface OptimizedIframeProps {
  videoId: string // YouTube video ID
  title: string // Title for accessibility
}

const OptimizedIframe = ({ videoId, title }: OptimizedIframeProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded) {
      const iframe = document.querySelector('iframe')
      if (iframe) {
        iframe.setAttribute('loading', 'lazy')
        setIsLoaded(true)
      }
    }
  }, [isLoaded])

  return (
    <div
      className="iframe-container"
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%', // Aspect ratio 16:9
        background: '#000',
        cursor: isLoaded ? 'default' : 'pointer',
      }}
    >
      {!isLoaded ? (
        <Image
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          width={1280}
          height={720}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            objectFit: 'cover',
          }}
        />
      ) : null}
      {isLoaded && (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&mute=1`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            border: 0,
          }}
        />
      )}
    </div>
  )
}

export default OptimizedIframe
