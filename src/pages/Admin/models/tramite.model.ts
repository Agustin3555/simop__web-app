export interface RawEntity {
  id: number
  nombre: string
  creado: string
  modificado: string
}

export interface Entity {
  id: number
  nombre: string
  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  nombre: string
}
export interface Ref {
  id: number
  nombre: string
}

export interface CreateData {
  nombre: string
}

export interface CreateBody {
  nombre: string
}
