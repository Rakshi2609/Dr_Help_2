import { promises as fs } from 'fs'
import path from 'path'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'

type TeamMember = {
  name: string
  role: string
  avatar: string
}

export default async function AboutPage() {
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'team.json')
  const file = await fs.readFile(jsonPath, 'utf8')
  const team: TeamMember[] = JSON.parse(file)

  return (
    <div className="space-y-12">
      <header className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-center text-primary-foreground">
        <h1 className="text-4xl md:text-5xl">Our Mission</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg">
          To empower cancer patients and their care teams with intelligent tools
          for effective pain management, enhancing quality of life through
          technology.
        </p>
      </header>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground">
              We envision a world where every patient's pain is understood and
              managed proactively, leading to better outcomes and a more
              comfortable treatment journey. Our platform leverages AI to provide
              actionable insights, fostering a collaborative environment between
              patients and healthcare providers.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-6 text-center text-3xl">Meet the Team</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <Card
              key={member.name}
              className="text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CardContent className="pt-6">
                <Avatar className="mx-auto h-24 w-24">
                  <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="person portrait"/>
                  <AvatarFallback>
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
