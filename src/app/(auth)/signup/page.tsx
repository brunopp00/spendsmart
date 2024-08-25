'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { SignUpUser } from './actions'
import { useUserStore } from '@/store/user'
import { UserProps } from '@/types/user'

interface SignUpValues {
  username: string
  email: string
  password: string
}

interface SignUpResponse {
  error: string
  status: boolean
  user?: UserProps | null
}

export default function SignUp() {
  const {
    actions: { addUser },
  } = useUserStore()
  const { register, handleSubmit } = useForm<SignUpValues>()

  const signUp: SubmitHandler<SignUpValues> = async (values) => {
    try {
      const res: SignUpResponse | undefined = await SignUpUser(values)
      if (res && res.status) {
        toast.success('Signed up successfully!', {
          duration: 5000,
        })
        if (res.user) {
          addUser(res.user)
        }
      } else {
        toast.error(res?.error || 'An error occurred', {
          duration: 5000,
        })
      }
    } catch (error) {
      toast.error('An unexpected error occurred', {
        duration: 5000,
      })
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      <Card className="w-96">
        <form onSubmit={handleSubmit(signUp)}>
          <CardHeader>
            <CardTitle>Hello!</CardTitle>
            <CardDescription>
              Welcome, we have been waiting for you!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div>
              <Label>Username</Label>
              <Input
                {...register('username', { required: true })}
                placeholder="Username"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                {...register('email', { required: true })}
                placeholder="Email"
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                {...register('password', { required: true })}
                placeholder="Password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            <p className="text-center text-xs">
              Already have an account?{' '}
              <Link href="/signin" className="cursor-pointer underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
