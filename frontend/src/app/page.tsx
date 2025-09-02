
'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowRight, BarChart, Bell, Bot, UserCheck } from 'lucide-react'
import Image from 'next/image'
import HomeNav from '@/components/homenav'

const featureCards = [
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: 'Track Your Pain',
    description:
      'Easily log and monitor your pain levels over time with our intuitive interface, helping you and your doctor understand your journey.',
  },
  {
    icon: <Bell className="h-8 w-8 text-primary" />,
    title: 'Get Timely Alerts',
    description:
      'Receive smart notifications for medication reminders and high pain episodes, ensuring you never miss an important event.',
  },
  {
    icon: <UserCheck className="h-8 w-8 text-primary" />,
    title: 'Connect with Your Doctor',
    description:
      'Share your progress seamlessly with your healthcare provider, enabling better collaboration and more personalized care.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Insights',
    description:
      'Leverage the power of AI to gain actionable insights into your pain patterns, helping predict and manage flare-ups.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
}

export default function HomePage() {
  useEffect(() => {
    ;(async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default
      const locomotiveScroll = new LocomotiveScroll()
    })()
  }, [])
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-body text-foreground">
      <HomeNav />
      <main className="flex-1">
        <motion.section
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-gradient-to-br from-background to-secondary/10 py-24 text-center md:py-32"
        >
          <div className="container">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Reclaim Control Over Your Pain
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              PainSense is an intelligent platform that helps cancer patients
              manage their pain, connect with their doctors, and improve their
              quality of life.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 text-lg">
                <Link href="/auth/signup">Get Started</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 text-lg"
              >
                <Link href="/auth/login">
                  Sign In <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.section>

        <section id="features" className="py-20 md:py-28">
          <div className="container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                A Smarter Way to Manage Your Pain
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                PainSense offers a suite of tools designed for both patients
                and doctors.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {featureCards.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.5 }}
                  variants={cardVariants}
                >
                  <Card className="h-full transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <CardHeader>
                      {feature.icon}
                      <CardTitle className="mt-4">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ask Our AI Assistant
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Have a question about pain management or how to use the app? Our AI
              is here to help.
            </p>
            <motion.div
              className="mx-auto mt-8 max-w-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.7 }}}}
            >
              <Card className="text-left">
                <CardContent className="pt-6">
                  <div className="flex h-64 flex-col justify-between">
                    <div className="space-y-2 text-sm">
                      <div className="w-fit rounded-lg bg-muted px-3 py-2">
                        Hello! How can I help you today?
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Type your question..."
                        className="flex-1"
                      />
                      <Button>Send</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>


        <section className="bg-secondary/10 py-20 md:py-28">
          <div className="container grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              variants={{ visible: { opacity: 1, x: 0, transition: { duration: 0.7 }}}}
            >
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Empowering Patients, Supporting Doctors
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our mission is to foster a collaborative environment where
                technology enhances the patient-doctor relationship, leading to
                better outcomes and a more comfortable treatment journey.
              </p>
              <Button asChild size="lg" className="mt-6 rounded-full">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </motion.div>
            <motion.div
              className="relative h-80 w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              variants={{ visible: { opacity: 1, scale: 1, transition: { duration: 0.7 }}}}
            >
              <Image
                src="https://picsum.photos/800/600"
                alt="Doctor and patient"
                fill
                className="rounded-2xl object-cover shadow-xl"
                data-ai-hint="doctor patient"
              />
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PainSense. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/about" className="text-sm hover:underline">
              About
            </Link>
            <Link href="/blog" className="text-sm hover:underline">
              Blog
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
