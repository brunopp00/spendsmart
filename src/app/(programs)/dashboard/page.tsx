'use client'

import { useUserStore } from '@/store/user'

export default function Dashboard() {
  const {
    state: { user },
  } = useUserStore()

  // if (!user) {
  //   router.push('/signin')
  // }

  return <div>teste</div>
}
