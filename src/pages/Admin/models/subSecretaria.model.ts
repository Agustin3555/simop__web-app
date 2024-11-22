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

export interface CreateUpdateData {
  nombre: string
}

export interface CreateUpdateBody {
  nombre: string
}
