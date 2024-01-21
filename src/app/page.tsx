'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  // Check if window is defined (client-side)
  const user =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('userSpendSmart')
      : null

  if (user) {
    router.replace('/dashboard')
  } else {
    router.replace('/signin')
  }

  return <div />
}
