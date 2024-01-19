'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserStore } from '@/store/user'
import { usePathname, useRouter } from 'next/navigation'
import { FaClipboardList } from 'react-icons/fa'
import { IoLogOutOutline } from 'react-icons/io5'
import { RiLayoutGridFill } from 'react-icons/ri'

export const LeftPage = () => {
  const router = useRouter()
  const path = usePathname()

  const {
    actions: { removeUser, addUser },
    state: { user },
  } = useUserStore.getState()

  const userSpendSmart = window.localStorage.getItem('userSpendSmart')

  if (!user && userSpendSmart) {
    addUser(JSON.parse(userSpendSmart))
  }

  if (!user && !userSpendSmart) {
    router.push('/signin')
  }

  const tradeLink = (link: string) => router.push(link)

  const getInitials = (name?: string) => {
    const names = name?.split(' ')

    const initials = names?.map((part) => part.charAt(0).toUpperCase())

    return initials?.join('')
  }

  return (
    <div
      style={{ height: 'calc(100vh - 50px)' }}
      className="flex w-20 flex-col items-center justify-between rounded-br-lg rounded-tr-lg bg-white p-10 dark:bg-black"
    >
      <div className="flex flex-col gap-10">
        <div
          className={`rounded-full border  p-3 ${path === '/dashboard' ? 'border-black bg-black' : 'border-white'}`}
        >
          <RiLayoutGridFill
            onClick={() => tradeLink('/dashboard')}
            className={`cursor-pointer ${path === '/dashboard' ? 'text-white' : 'text-black'} transition-colors hover:text-gray-300 dark:hover:text-white`}
            size={32}
            title="Dashboard"
          />
        </div>
        <div
          className={`rounded-full border  p-3 ${path === '/expense' ? 'border-black bg-black' : 'border-white'}`}
        >
          <FaClipboardList
            onClick={() => tradeLink('/expense')}
            className={`cursor-pointer  ${path === '/expense' ? 'text-white' : 'text-black'} transition-colors hover:text-gray-300 dark:hover:text-white`}
            size={32}
            title="Expense List"
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-10">
        <div>
          <Avatar>
            <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
            <AvatarImage src="/" />
          </Avatar>
        </div>
        <div>
          <IoLogOutOutline
            onClick={removeUser}
            className="cursor-pointer text-black transition-colors hover:text-gray-300 dark:hover:text-white"
            size={32}
            title="Log out"
          />
        </div>
      </div>
    </div>
  )
}
