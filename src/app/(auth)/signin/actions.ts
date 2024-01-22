'use server'

import { prisma } from '@/lib/prisma'

interface SignInProps {
  email: string
  password: string
}

export async function SignInUser(values: SignInProps) {
  try {
    const userExist = await prisma.user.findUnique({
      where: { email: values.email },
    })

    if (!userExist) {
      return { error: 'User does not exist', status: false }
    }

    if (userExist.password !== values.password) {
      return { error: 'Wrong password', status: false }
    } else {
      return { message: 'User logged in', user: userExist, status: true }
    }
  } catch (error) {
    return { error: 'Something went wrong', status: false }
  }
}
