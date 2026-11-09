import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@globbing/types'

type AuthState = {
  user: User | null
  accessToken: string | null
  setUser: (user: User | null) => void
  setTokens: (accessToken: string, refreshToken: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        set({ accessToken })
      },
      logout: () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        set({ user: null, accessToken: null })
      },
    }),
    { name: 'auth-store', partialize: (s) => ({ accessToken: s.accessToken }) },
  ),
)
