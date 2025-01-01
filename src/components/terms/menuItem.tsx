import IconifyIcon from '../icons'
import Link from 'next/link'

export default function MenuItem({
  label,
  icon,
  href,
  pathname,
}: {
  label: string
  icon: string
  href: string
  pathname: string
}) {
  return (
    <Link
      prefetch={true}
      href={href}
      className={`flex w-full items-center flex-row gap-4 p-3 rounded-md ${pathname === href ? 'bg-green-100' : 'bg-white'}`}
    >
      <IconifyIcon icon={icon} width={26} height={26} />
      <p className="text-lg font-semibold">{label}</p>
    </Link>
  )
}
