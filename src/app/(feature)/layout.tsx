export const dynamic = 'force-dynamic'

export default function FeatureLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
