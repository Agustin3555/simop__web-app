import { useEffect, useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { ActionState } from '.'

export const useQueryActionState = ({
  status,
  isFetching,
}: Pick<UseQueryResult, 'status' | 'isFetching'>) => {
  const [actionState, setActionState] = useState<ActionState>('ready')

  useEffect(() => {
    if (isFetching) setActionState('loading')
    else if (status === 'error' || status === 'success') {
      setActionState(status)
      setTimeout(() => setActionState('ready'), 2000)
    }
  }, [isFetching])

  return actionState
}
