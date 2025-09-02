'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  useEffect(() => {
    // This helps debug the current path when rendered
    console.log('Patient Layout Rendered - Path:', pathname)
  }, [pathname])

  return (
    <div className="patient-context">
      {children}
    </div>
  )
}
