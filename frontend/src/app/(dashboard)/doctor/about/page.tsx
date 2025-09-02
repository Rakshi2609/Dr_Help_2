'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type TeamMember = {
  name: string
  role: string
  avatar: string
}

// Simplified version that directly fetches and renders data
export default function DoctorAboutPage() {
  const pathname = usePathname()
  const router = useRouter()
  const [team, setTeam] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Store doctor context
    localStorage.setItem('userRole', 'doctor')
    
    // Fetch team data directly
    const fetchTeamData = async () => {
      try {
        const response = await fetch('/api/team')
        const data = await response.json()
        setTeam(data)
      } catch (error) {
        console.error('Failed to fetch team data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchTeamData()
  }, [])

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          Loading about page content...
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-12">
      {/* Context indicator */}
      <div className="mb-4 p-2 bg-primary/10 rounded-md text-xs">
        <p>Current path: {pathname}</p>
        <p>Context: Doctor</p>
      </div>
      
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
                  <AvatarImage src={member.avatar} alt={member.name} />
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
