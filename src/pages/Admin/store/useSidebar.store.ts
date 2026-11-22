import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarState {
  isOpen: boolean

  open: () => void
  close: () => void
  toggle: () => void
}

export const useSidebar = create<SidebarState>()(
  persist(
    set => ({
      isOpen: true,

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set(s => ({ isOpen: !s.isOpen })),
    }),
    {
      name: 'sidebar-store',
      partialize: s => ({
        isOpen: s.isOpen,
      }),
    },
  ),
)
