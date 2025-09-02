import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const jsonPath = path.join(process.cwd(), 'src', 'data', 'achievements.json')
    const file = await fs.readFile(jsonPath, 'utf8')
    const achievements = JSON.parse(file)
    
    return NextResponse.json(achievements)
  } catch (error) {
    console.error('Error loading achievements data:', error)
    return NextResponse.json(
      { error: 'Failed to load achievements data' },
      { status: 500 }
    )
  }
}
