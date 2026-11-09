import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Manager = { id: string; name: string; email: string; role: string }

type AuthState = {
  manager: Manager | null
  accessToken: string | null
  setManager: (manager: Manager | null) => void
  setTokens: (accessToken: string) => void
  logout: () => void
}

export const useAdminAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      manager: null,
      accessToken: null,
      setManager: (manager) => set({ manager }),
      setTokens: (accessToken) => {
        localStorage.setItem('admin_accessToken', accessToken)
        set({ accessToken })
      },
      logout: () => {
        localStorage.removeItem('admin_accessToken')
        set({ manager: null, accessToken: null })
      },
    }),
    { name: 'admin-auth-store', partialize: (s) => ({ accessToken: s.accessToken }) },
  ),
)
