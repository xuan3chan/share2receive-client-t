'use client'

import { useMediaQuery } from '@mantine/hooks'
import { Breadcrumbs } from '@mantine/core'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  link: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const breadcrumbItems = items?.map((item, index) =>
    index === items.length - 1 ? (
      <span key={index}>{item.label}</span>
    ) : (
      <Link key={index} href={item.link}>
        {item.label}
      </Link>
    ),
  )

  const isDesktop = useMediaQuery('(min-width: 62em)')

  return (
    <Breadcrumbs
      separator="/"
      styles={{
        root: {
          fontWeight: isDesktop ? 'bold' : 500,
          fontSize: isDesktop ? '16px' : '13px',
          color: '#000',
          marginBottom: isDesktop ? '20px' : '10px',
          marginTop: isDesktop ? '20px' : '30px',
          gap: '10px',
          flexWrap: 'wrap',
          width: '100%',
        },
      }}
    >
      {breadcrumbItems}
    </Breadcrumbs>
  )
}
