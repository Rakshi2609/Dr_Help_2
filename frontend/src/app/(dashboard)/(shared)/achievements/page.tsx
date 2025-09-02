import { promises as fs } from 'fs'
import path from 'path'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Award } from 'lucide-react'

type Achievement = {
  title: string
  description: string
  year: string
}

export default async function AchievementsPage() {
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'achievements.json')
  const file = await fs.readFile(jsonPath, 'utf8')
  const achievements: Achievement[] = JSON.parse(file)

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl">Our Milestones</h1>
        <p className="mx-auto mt-2 max-w-xl text-lg text-muted-foreground">
          Celebrating our journey and the impact we've made so far.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement, index) => (
          <Card
            key={index}
            className="group flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="secondary">{achievement.year}</Badge>
              </div>
              <CardTitle className="pt-4">{achievement.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">
                {achievement.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
