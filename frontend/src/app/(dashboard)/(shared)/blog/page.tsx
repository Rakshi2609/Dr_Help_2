'use client'

import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { format } from 'date-fns'

type BlogPost = {
  title: string
  description: string
  date: string
  author: string
  content: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Load blog posts on component mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch('/api/blog')
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Failed to load blog posts:', error)
      }
    }
    loadPosts()
  }, [])

  // Function to open dialog with selected post
  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

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
              <Button 
                variant="link" 
                className="p-0"
                onClick={() => handleReadMore(post)}
              >
                Read More &rarr;
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Blog Post Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedPost.title}</DialogTitle>
                <DialogDescription className="flex justify-between items-center text-sm">
                  <span>By {selectedPost.author}</span>
                  <span>{format(new Date(selectedPost.date), 'MMMM d, yyyy')}</span>
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4 space-y-4">
                {selectedPost.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <DialogFooter className="mt-6">
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
