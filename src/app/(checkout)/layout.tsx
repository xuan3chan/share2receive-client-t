import { Suspense } from 'react'

export const dynamic = 'force-dynamic'


export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="mt-28">{children}</div>
      </Suspense>
    </>
  )
}
