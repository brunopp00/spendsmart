'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

interface SignUpProps {
  email: string
  password: string
  username: string
}

export async function SignUpUser(values: SignUpProps) {
  const { email, password, username } = values
  try {
    const userExist = await prisma.user.findUnique({
      where: { email },
    })

    if (userExist) {
      return { error: 'User already exist', status: false }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user
      .create({
        data: {
          email,
          password: hashedPassword,
          name: username,
        },
      })
      .then((res) => {
        return { message: 'User created', user: res, status: true }
      })
  } catch (error) {
    return { error: 'Something went wrong', user: null, status: false }
  }
}
