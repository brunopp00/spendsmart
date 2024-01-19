import { UserProps } from '@/types/user'
import { create } from 'zustand'

type ActionsProsp = {
  addUser: (user: UserProps) => void
  removeUser: () => void
}

type StoreProps = {
  state: {
    user: UserProps | null
  }
  actions: ActionsProsp
}

export const useUserStore = create<StoreProps>((set) => ({
  state: {
    user: null,
  },
  actions: {
    addUser: (user) => {
      set(() => ({ state: { user } }))
      window.localStorage.setItem('userSpendSmart', JSON.stringify(user))
    },
    removeUser: () => {
      set(() => ({ state: { user: null } }))
      window.localStorage.removeItem('userSpendSmart')
    },
  },
}))
