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

export default function SignIn() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Hello Again!</CardTitle>
          <CardDescription>Wellcome back, we missed you!</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div>
            <Label>Email</Label>
            <Input placeholder="Email" />
          </div>
          <div>
            <Label>Password</Label>
            <Input placeholder="Password" />
            <p className="cursor-pointer text-end text-xs underline">
              Forgot password?
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full">Sign In</Button>
          <p className="text-center text-xs">
            Dont have an account?{' '}
            <Link href="/signup" className="cursor-pointer underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
