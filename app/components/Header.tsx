'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault()
      window.location.reload()
    }
  }

  const isMSI = pathname === '/msi'
  const title = isMSI ? 'mckenzie software inc.' : 'iain mckenzie'

  return (
    <header className="flex justify-between items-center p-4">
      <Link href="/" onClick={handleHomeClick}>
        <h1 className="text-2xl md:text-3xl">{title}</h1>
      </Link>

      {!isMSI && (
        <nav className="gap-10 hidden md:flex text-lg">
          <Link href="/projects" className={pathname === '/projects' ? 'underline' : ''}>projects</Link>
          <Link href="/music" className={pathname === '/music' ? 'underline' : ''}>music</Link>
        </nav>
      )}
    </header>
  )
}
