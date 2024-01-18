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

interface SignUpValues {
  username: string
  email: string
  password: string
}

export default function SignUp() {
  const { register, handleSubmit } = useForm<SignUpValues>()

  const signUp: SubmitHandler<SignUpValues> = async () => {
    const data = await fetch('http://localhost:3001/signup/api', {
      body: JSON.stringify({
        username: 'test',
        email: 'test',
        password: 'test',
      }),
      method: 'POST',
    })
    console.log(data)
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
                {...register('password', { required: true })}
                placeholder="Password"
              />
              <p className="cursor-pointer text-end text-xs underline">
                Forgot password?
              </p>
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
