import { create } from 'zustand'
import { AppStore } from './slice'
import { createToastsSlice } from '../slices'

export const useAppStore = create<AppStore>()((...params) => ({
  ...createToastsSlice(...params),
}))
