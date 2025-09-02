
'use client'

import React from 'react'
import HomeNav from '@/components/homenav'
import { SimpleHomePage } from '@/components/SimpleHomePage'

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-body text-foreground">
      <HomeNav />
      <SimpleHomePage />
    </div>
  )
}
