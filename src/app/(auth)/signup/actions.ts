import { prisma } from '@/lib/prisma'

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

    await prisma.user.create({
      data: {
        email,
        password,
        name: username,
      },
    })
    return { message: 'User created', status: true }
  } catch (error) {
    return { error: 'Something went wrong', status: false }
  }
}
