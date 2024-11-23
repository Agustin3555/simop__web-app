export interface RawEntity {
  id: number
  nombre: string
  direccionId?: number
  creado: string
  modificado: string
}

export interface Entity {
  id: number
  nombre: string
  direccionId?: number
  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  nombre: string
}

export interface CreateUpdateData {
  nombre: string
  direccionId: number
}

export interface CreateUpdateBody {
  nombre: string
  direccionId: number
}
