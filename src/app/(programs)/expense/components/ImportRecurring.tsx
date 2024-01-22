'use client'

import { Button } from '@/components/ui/button'
import { importRecussing } from '../actions'
import { useUserStore } from '@/store/user'
import { toast } from 'sonner'

export const ImportRecurring = () => {
  const {
    state: { user },
  } = useUserStore()

  const handleClick = async () => {
    importRecussing(user?.id || 0).then((res) => {
      if (res.status) {
        toast.success(res.message, { duration: 5000 })
      }
    })
  }

  return <Button onClick={handleClick}>Import Recurring</Button>
}
