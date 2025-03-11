import { useCallback, useState } from 'react'

export const useResetByRender = () => {
  const [renderKey, setRenderKey] = useState(0)

  const resetHandleClick = useCallback(() => setRenderKey(prev => prev + 1), [])

  return { renderKey, resetHandleClick }
}
