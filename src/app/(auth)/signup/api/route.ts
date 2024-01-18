import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { email, password } = await request.json()
  return NextResponse.json({ message: 'Hello, world!' })
}
