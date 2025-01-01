import { Brand } from '@/types/clientypes'
import { Carousel } from '@mantine/carousel'
import { AutoplayType } from 'embla-carousel-autoplay'
import Link from 'next/link'
import homepage from '@/styles/homepage.module.css'
import { MutableRefObject } from 'react'
import Image from 'next/image'

export default function BrandSlider({
  sortedBrands,
  autoplay2,
}: {
  sortedBrands: Brand[] | undefined
  autoplay2: MutableRefObject<AutoplayType>
}) {
  return (
    <div className="relative top-0 left-0 right-0 bottom-0 z-40">
      <div className="container mx-auto px-2 md:px-24 pointer-events-auto">
        <Carousel
          classNames={{
            slide: homepage.slidecard,
            control: homepage.controlCard,
          }}
          withControls
          slideSize={{
            base: '50%',
            md: '25%',
          }}
          slideGap={{
            base: 'md',
            md: 'md',
          }}
          loop
          align="start"
          plugins={[autoplay2.current]}
          onMouseEnter={autoplay2.current.stop}
          onMouseLeave={autoplay2.current.reset}
        >
          {sortedBrands?.slice(0, 8).map((brand) => (
            <Carousel.Slide
              key={brand._id}
              style={{
                maxHeight: '380px',
                maxWidth: '340px',
              }}
            >
              <Link href={`/shop?filterBrand=${brand._id}`} prefetch={false}>
                <Image
                  className={homepage.slidecontent}
                  loading="lazy"
                  src={brand.imgUrl}
                  alt={brand.name}
                  width={340}
                  height={380}
                  quality={60}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    objectFit: 'cover',
                  }}
                />
              </Link>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  )
}
