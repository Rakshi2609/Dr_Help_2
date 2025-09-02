'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  useEffect(() => {
    // This helps debug the current path when rendered
    console.log('Doctor Layout Rendered - Path:', pathname)
  }, [pathname])

  // The key to maintaining the doctor context is to ensure this layout
  // is always present for doctor-related routes
  return (
    <div className="doctor-context">
      {children}
    </div>
  )
}
