'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

// This component enforces that when a user is in the doctor context, 
// they stay in the doctor context when navigating to shared pages
export function NavigationGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  
  useEffect(() => {
    // Check if we're in a shared page without context
    const isSharedPageWithoutContext = 
      (pathname === '/about' || 
       pathname === '/achievements' || 
       pathname === '/blog') 
    
    // Get the stored role from localStorage (set during login)
    const userRole = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null
    
    // If we're on a shared page with no context but we know the user role
    if (isSharedPageWithoutContext && userRole) {
      // Redirect to the contextualized version
      router.push(`/${userRole}${pathname}`)
    }
  }, [pathname, router])
  
  return children
}

export default NavigationGuard
