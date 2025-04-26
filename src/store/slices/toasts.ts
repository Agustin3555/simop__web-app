import { Slice } from '../config'

// Entre 200 a 400
const WORDS_PER_MINUTE = 250
// Entre 1 a 10
const READING_DIFFICULTY = 6

const readingTimeInMs = (text: string) => {
  if (text === '') return 1000

  const words = text.split(/\s+/).length
  const readingTimeInMinutes = words / WORDS_PER_MINUTE

  return Math.round(readingTimeInMinutes * 60 * 1000 * READING_DIFFICULTY)
}

export type ToastType = 'info' | 'warning' | 'error' | 'success'

interface ToastInfo {
  text: string
  type: ToastType
}

interface Toast {
  id: number
  info: ToastInfo
  screenTime: number
}

export interface ToastsSlice {
  toasts: Toast[]
  toastsHistory: Toast[]

  toasting: (type: ToastInfo['type'], text: ToastInfo['text']) => void
  eatToast: () => void
}

export const EXIT_TIME = 800

let id = 0

export const createToastsSlice: Slice<ToastsSlice> = (set, get) => ({
  toasts: [],
  toastsHistory: [],

  toasting: (type, text) => {
    const screenTime = readingTimeInMs(text)
    const newToast: Toast = { id: id++, info: { type, text }, screenTime }

    set(state => ({ toasts: [...state.toasts, newToast] }))

    setTimeout(() => {
      const { toasts, toastsHistory } = get()

      // Mover el toast al historial y eliminarlo de la lista actual
      set({
        toasts: toasts.filter(toast => toast.id !== newToast.id),
        toastsHistory: [...toastsHistory, newToast],
      })
    }, screenTime + EXIT_TIME)
  },

  eatToast: () => {
    const [, ...remainingToasts] = get().toasts

    set(() => ({ toasts: remainingToasts }))
  },
})
