import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const jsonPath = path.join(process.cwd(), 'src', 'data', 'team.json')
    const file = await fs.readFile(jsonPath, 'utf8')
    const team = JSON.parse(file)
    
    return NextResponse.json(team)
  } catch (error) {
    console.error('Error loading team data:', error)
    return NextResponse.json(
      { error: 'Failed to load team data' },
      { status: 500 }
    )
  }
}
