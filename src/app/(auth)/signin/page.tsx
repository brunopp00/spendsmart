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
import { useUserStore } from '@/store/user'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { SignInUser } from './actions'
import { useEffect } from 'react'

interface SignInProps {
  email: string
  password: string
}

export default function SignIn() {
  const router = useRouter()
  const {
    actions: { addUser },
  } = useUserStore()

  const { register, handleSubmit } = useForm<SignInProps>()

  const signIn: SubmitHandler<SignInProps> = async (values) => {
    await SignInUser(values).then(async (res) => {
      if (res.status) {
        toast.success('Signed in successfully!', {
          duration: 5000,
        })
        if (res.user) {
          await addUser(res.user)
        }
        router.push('/dashboard')
      } else {
        toast.error(res.error, {
          duration: 5000,
        })
      }
    })
  }

  useEffect(() => {
    const user =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('userSpendSmart')
        : null

    if (user) {
      router.replace('/dashboard')
    }
  }, [router])

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      <Card className="w-96">
        <form onSubmit={handleSubmit(signIn)}>
          <CardHeader>
            <CardTitle>Hello Again!</CardTitle>
            <CardDescription>Wellcome back, we missed you!</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div>
              <Label>Email</Label>
              <Input {...register('email')} placeholder="Email" />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                {...register('password')}
                placeholder="Password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <p className="text-center text-xs">
              Dont have an account?{' '}
              <Link href="/signup" className="cursor-pointer underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
