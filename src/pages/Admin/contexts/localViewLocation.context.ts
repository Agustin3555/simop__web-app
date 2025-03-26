import { createContext } from 'react'

export type LocalViewKey = 'query' | 'add' | 'edit'

interface LocalViewContextProps {
  setLocalView: (view: LocalViewKey) => void
}

//El archivo no coincide con el nombre del contexto
//porque da un error de definicion de archivos
export const LocalViewContext = createContext<
  LocalViewContextProps | undefined
>(undefined)
