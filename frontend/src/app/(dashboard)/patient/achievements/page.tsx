import { Suspense } from 'react'
import { Card, CardContent } from '@/components/ui/card'

// We're using a dynamic import with next/dynamic to handle the server component
import dynamic from 'next/dynamic'

// Import the shared page with ssr disabled to avoid hydration issues
const AchievementsPageShared = dynamic(
  () => import('@/app/(dashboard)/(shared)/achievements/page'),
  { ssr: false }
)

export default function AchievementsPage() {
  return (
    <Suspense fallback={
      <Card className="w-full h-[300px] flex items-center justify-center">
        <CardContent>Loading achievements...</CardContent>
      </Card>
    }>
      <AchievementsPageShared />
    </Suspense>
  )
}
