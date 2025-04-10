import { useMemo, useCallback, SetStateAction, Dispatch } from 'react'

export type StateToDerived<A, B> = (a: A) => B
export type DerivedToState<A, B> = (b: B, prev: A) => A

export const useDerivedState = <A, B>(
  state: A,
  setState: Dispatch<SetStateAction<A>>,
  fromAtoB: StateToDerived<A, B>,
  fromBtoA: DerivedToState<A, B>,
) => {
  const adaptedValue = useMemo(() => fromAtoB(state), [state, fromAtoB])

  const setAdaptedValue: Dispatch<SetStateAction<B>> = useCallback(
    b =>
      setState(prevA => {
        const nextB =
          typeof b === 'function' ? (b as (prev: B) => B)(fromAtoB(prevA)) : b

        return fromBtoA(nextB, prevA)
      }),
    [setState, fromAtoB, fromBtoA],
  )

  return [adaptedValue, setAdaptedValue] as const
}
