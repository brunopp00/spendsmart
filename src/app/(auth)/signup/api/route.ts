import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password, name } = await request.json()
  const userExist = await prisma.user.findUnique({
    where: { email },
  })

  if (userExist) {
    return NextResponse.json({ error: 'User already exist' })
  }

  await prisma.user.create({
    data: {
      email,
      password,
      name,
    },
  })
  return NextResponse.json({ message: 'User created' })
}
