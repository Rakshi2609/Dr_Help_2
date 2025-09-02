import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const jsonPath = path.join(process.cwd(), 'src', 'data', 'doctors.json')
    const file = await fs.readFile(jsonPath, 'utf8')
    const doctors = JSON.parse(file)
    
    return NextResponse.json(doctors)
  } catch (error) {
    console.error('Error loading doctors data:', error)
    return NextResponse.json(
      { error: 'Failed to load doctors data' },
      { status: 500 }
    )
  }
}
