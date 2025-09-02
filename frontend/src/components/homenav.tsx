
'use client'

import Link from 'next/link'
import { Stethoscope, Menu, X, User } from 'lucide-react'
import { Button } from './ui/button'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'
import { ThemeToggle } from './ThemeToggle'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getCookie } from '@/lib/cookies'
import { useAuth } from '@/components/providers/auth-provider'

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '/about', label: 'About Us' },
  { href: '/blog', label: 'Blog' },
]

export default function HomeNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [userRole, setUserRole] = useState<string | null>(null)
  const isMobile = useIsMobile()
  const { isAuthenticated, logout } = useAuth()

  useEffect(() => {
    // Function to check auth status
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('userRole');
      const storedUserName = localStorage.getItem('userName') || 'User';
      
      if (token) {
        setIsLoggedIn(true);
        setUserName(storedUserName);
        setUserRole(role);
      } else {
        setIsLoggedIn(false);
        setUserName('');
        setUserRole(null);
      }
    };

    // Check on initial load
    checkAuthStatus();
    
    // Setup event listener for storage changes (for logout/login in other tabs)
    window.addEventListener('storage', checkAuthStatus);
    
    // Set up a custom event listener for auth changes
    window.addEventListener('auth-changed', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
      window.removeEventListener('auth-changed', checkAuthStatus);
    };
  }, [])

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Stethoscope className="h-7 w-7 text-primary" />
          <span className="text-2xl font-bold">PainSense</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <User className="h-4 w-4" />
                  <span>Welcome, {userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={userRole === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard'}>
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={userRole === 'doctor' ? '/doctor/settings' : '/patient/settings'}>
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col items-center gap-4 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-full rounded-md py-2 text-center text-sm font-medium transition-colors hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex w-full flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    <div className="mb-2 text-center">
                      <p className="text-sm font-semibold">Welcome, {userName}</p>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={userRole === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard'}>
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="outline" onClick={() => logout()} className="w-full">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/auth/login">Sign In</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href="/auth/signup">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
