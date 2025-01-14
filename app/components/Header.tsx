'use client'

import Link from "next/link"
// import { usePathname } from "next/navigation"

export default function Header() {
  // const pathname = usePathname()

  return (
    <header className="flex justify-between items-center p-4">
      <Link href="/">
        <h1 className="text-2xl md:text-3xl">iain mckenzie</h1>
      </Link>

      {/* <nav className="gap-10 hidden md:flex">
        <Link href="/projects" className={pathname === '/projects' ? 'underline' : ''}>projects</Link>
        <Link href="/music" className={pathname === '/music' ? 'underline' : ''}>music</Link>
      </nav> */}
    </header>
  )
}
