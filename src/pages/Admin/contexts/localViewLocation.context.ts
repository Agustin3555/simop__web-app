import { createContext } from 'react'

interface LocalViewContextProps {
  setLocalView: (view: string) => void
}

/*
  El archivo no coincide con el nombre del contexto, porque si se nombra como
  localView.context.ts da un error de definición de archivos
*/
export const LocalViewContext = createContext<
  LocalViewContextProps | undefined
>(undefined)
