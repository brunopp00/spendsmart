import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  try {
    const userExist = await prisma.user.findUnique({
      where: { email },
    })

    if (!userExist) {
      return NextResponse.json({ error: 'User does not exist' })
    }

    if (userExist.password !== password) {
      return NextResponse.json({ error: 'Wrong password' })
    } else {
      return NextResponse.json({ message: 'User logged in', user: userExist })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' })
  }
}
