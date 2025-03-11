import { useEffect, useState } from 'react'
import { UseMutationResult } from '@tanstack/react-query'
import { ActionState } from '.'

export const useMutationActionState = ({
  status,
  isPending,
}: Pick<UseMutationResult, 'status' | 'isPending'>) => {
  const [actionState, setActionState] = useState<ActionState>('ready')

  useEffect(() => {
    if (isPending) setActionState('loading')
    else if (status === 'error' || status === 'success') {
      setActionState(status)
      setTimeout(() => setActionState('ready'), 2000)
    }
  }, [isPending])

  return actionState
}
