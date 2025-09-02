import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const jsonPath = path.join(process.cwd(), 'src', 'data', 'blog.json')
    const file = await fs.readFile(jsonPath, 'utf8')
    const posts = JSON.parse(file)
    
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to load blog posts' },
      { status: 500 }
    )
  }
}
