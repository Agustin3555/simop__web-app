import { useCallback, useState } from 'react'
import { sleep } from '@/helpers'

export type ActionState = 'loading' | 'error' | 'success' | 'ready'

export type ActionCallback<ExtraProps> = ({
  setLoading,
  setError,
  setSuccess,
}: {
  setLoading: () => Promise<void>
  setError: () => Promise<void>
  setSuccess: () => Promise<void>
} & ExtraProps) => Promise<void>

export const useActionState = () => {
  const [actionState, setActionState] = useState<ActionState>('ready')

  const setLoading = useCallback(async () => {
    setActionState('loading')
    await sleep(500)
  }, [])

  const setError = useCallback(async () => {
    setActionState('error')
    await sleep(2000)
    setActionState('ready')
  }, [])

  const setSuccess = useCallback(async () => {
    setActionState('success')
    await sleep(2000)
    setActionState('ready')
  }, [])

  return { actionState, setLoading, setError, setSuccess }
}
