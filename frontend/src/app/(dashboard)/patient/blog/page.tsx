'use client'

import { Suspense } from 'react'
import { Card, CardContent } from '@/components/ui/card'

// Import directly since the shared blog page is a client component
import BlogPageShared from '@/app/(dashboard)/(shared)/blog/page'

export default function BlogPage() {
  return (
    <Suspense fallback={
      <Card className="w-full h-[300px] flex items-center justify-center">
        <CardContent>Loading blog posts...</CardContent>
      </Card>
    }>
      <BlogPageShared />
    </Suspense>
  )
}
