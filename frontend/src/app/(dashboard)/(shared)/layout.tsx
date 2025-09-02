'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  useEffect(() => {
    // This helps debug the current path when rendered
    console.log('Shared Layout Rendered - Path:', pathname)
  }, [pathname])

  return (
    <>
      {children}
    </>
  )
}
