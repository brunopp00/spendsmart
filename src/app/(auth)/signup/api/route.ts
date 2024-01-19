import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password, username } = await request.json()
  try {
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
        name: username,
      },
    })
    return NextResponse.json({ message: 'User created' })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' })
  }
}

// <a href="${process.env.NEXT_PUBLIC_BASE_URL}/confirm?token=${token}">Confirmar e-mail</a>
