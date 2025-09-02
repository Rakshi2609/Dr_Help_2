import { Suspense } from 'react'
import { Card, CardContent } from '@/components/ui/card'

// Import directly since it's a Server Component and will be rendered on the server
import AchievementsPageShared from '@/app/(dashboard)/(shared)/achievements/page'

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
