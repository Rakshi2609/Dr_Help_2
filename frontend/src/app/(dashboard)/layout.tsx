

'use client'

import React, { type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import {
  LayoutDashboard,
  Users,
  Bell,
  Newspaper,
  Award,
  Info,
  Settings,
  LogOut,
  Stethoscope,
  Home,
} from 'lucide-react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isDoctor = pathname.startsWith('/doctor')

  const userRole = isDoctor ? 'Doctor' : 'Patient'
  const userPrefix = isDoctor ? '/doctor' : '/patient'
  
  const navItems = [
    { href: '/', icon: Home, label: 'Home'},
    { href: `${userPrefix}/dashboard`, icon: LayoutDashboard, label: 'Dashboard' },
  ]

  if(isDoctor) {
    navItems.push({ href: `${userPrefix}/patients`, icon: Users, label: 'Patients' })
    navItems.push({ href: `${userPrefix}/alerts`, icon: Bell, label: 'Alerts' })
  } else {
    navItems.push({ href: `${userPrefix}/alerts`, icon: Bell, label: 'Alerts' })
  }

  navItems.push(
    { href: '/about', icon: Info, label: 'About Us' },
    { href: '/achievements', icon: Award, label: 'Achievements' },
    { href: '/blog', icon: Newspaper, label: 'Blog' }
  )


  const settingsHref = isDoctor ? '/doctor/settings' : '/patient/settings'

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/" className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Stethoscope className="h-6 w-6 text-primary" />
            </Button>
            <h1 className="text-xl font-semibold font-headline">PainSense</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === settingsHref}
                tooltip="Settings"
              >
                <Link href={settingsHref}>
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-sidebar-border bg-sidebar px-4 backdrop-blur-sm sm:h-16 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">
              {userRole} Dashboard
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Avatar>
                    <AvatarImage src={`https://picsum.photos/seed/${userRole}/100`} alt={userRole} />
                    <AvatarFallback>{userRole.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={settingsHref}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
