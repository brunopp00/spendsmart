import { UserProps } from '@/types/user'
import { create } from 'zustand'
import nookies from 'nookies'

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
      // Armazenar o token de autenticação em um cookie seguro
      nookies.set(null, 'userToken', JSON.stringify(user), {
        maxAge: 30 * 24 * 60 * 60, // 30 dias
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      })
    },
    removeUser: () => {
      set(() => ({ state: { user: null } }))
      // Remover o cookie de autenticação
      nookies.destroy(null, 'userToken')
    },
  },
}))
