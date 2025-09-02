import { promises as fs } from 'fs'
import path from 'path'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Award, User } from 'lucide-react'

type Achievement = {
  title: string
  description: string
  year: string
  doctorId?: string
}

type Doctor = {
  id: string
  name: string
  specialty: string
  achievements: string[]
  avatar: string
}

export default async function AchievementsPage() {
  const achievementsPath = path.join(process.cwd(), 'src', 'data', 'achievements.json')
  const doctorsPath = path.join(process.cwd(), 'src', 'data', 'doctors.json')
  
  const achievementsFile = await fs.readFile(achievementsPath, 'utf8')
  const doctorsFile = await fs.readFile(doctorsPath, 'utf8')
  
  const achievements: Achievement[] = JSON.parse(achievementsFile)
  const doctors: Doctor[] = JSON.parse(doctorsFile)

  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl">Our Milestones</h1>
        <p className="mx-auto mt-2 max-w-xl text-lg text-muted-foreground">
          Celebrating our journey and the impact we've made so far.
        </p>
      </header>

      {/* Doctor profiles section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Our Outstanding Doctors</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden">
              <div className="relative h-48 w-full bg-muted">
                {doctor.avatar && (
                  <Image 
                    src={doctor.avatar} 
                    alt={doctor.name} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
              </div>
              <CardHeader>
                <CardTitle>{doctor.name}</CardTitle>
                <Badge className="w-fit">{doctor.specialty}</Badge>
              </CardHeader>
              <CardContent>
                <h4 className="font-medium mb-2">Notable Achievements:</h4>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {doctor.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Achievements section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Our Milestones</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => {
            const doctor = achievement.doctorId ? 
              doctors.find(d => d.id === achievement.doctorId) : null;
            
            return (
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
                <CardContent className="flex-grow space-y-4">
                  <p className="text-muted-foreground">
                    {achievement.description}
                  </p>
                  
                  {doctor && (
                    <div className="flex items-center gap-3 pt-2 border-t">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={doctor.avatar} alt={doctor.name} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-muted-foreground">{doctor.specialty}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  )
}
