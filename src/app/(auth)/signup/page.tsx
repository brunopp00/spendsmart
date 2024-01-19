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

interface SignUpValues {
  username: string
  email: string
  password: string
}

export default function SignUp() {
  const { register, handleSubmit } = useForm<SignUpValues>()

  const signUp: SubmitHandler<SignUpValues> = async (values) => {
    await fetch('/signup/api', {
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, {
            duration: 5000,
          })
        } else {
          toast.success('Signed up successfully!', {
            duration: 5000,
          })
          window.location.href = '/signin'
        }
      })
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      <Card className="w-96">
        <form onSubmit={handleSubmit(signUp)}>
          <CardHeader>
            <CardTitle>Hello!</CardTitle>
            <CardDescription>
              Wellcome, we have been waiting for you!
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
