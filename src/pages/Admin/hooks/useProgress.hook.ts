import { useState, useCallback } from 'react'

export const useProgress = () => {
  const [totalSteps, setTotalSteps] = useState(1)
  const [currentStep, setCurrentStep] = useState(0)

  const incrementProgress = useCallback(() => {
    setCurrentStep(prev => prev + 1)
  }, [])

  const resetProgress = useCallback(() => {
    setCurrentStep(0)
  }, [])

  return {
    progress: (currentStep / totalSteps) * 100,
    resetProgress,
    setTotalSteps,
    incrementProgress,
  }
}
