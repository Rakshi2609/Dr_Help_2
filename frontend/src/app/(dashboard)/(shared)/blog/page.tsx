import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

type BlogPost = {
  title: string
  description: string
  date: string
}

export default async function BlogPage() {
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'blog.json')
  const file = await fs.readFile(jsonPath, 'utf8')
  const posts: BlogPost[] = JSON.parse(file)

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl">Insights & Articles</h1>
        <p className="mx-auto mt-2 max-w-xl text-lg text-muted-foreground">
          Stay updated with the latest in pain management and healthcare
          technology.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Card
            key={index}
            className="flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{post.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="link" className="p-0">
                <Link href="#">Read More &rarr;</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
