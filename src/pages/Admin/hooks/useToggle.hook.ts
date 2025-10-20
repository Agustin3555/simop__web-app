import { useCallback, useState } from 'react'

export const useToggle = (initState = false) => {
  const [state, setState] = useState(initState)

  const toggle = useCallback(() => setState(prev => !prev), [])

  return [state, toggle, setState] as const
}
