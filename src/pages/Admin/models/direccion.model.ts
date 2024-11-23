export interface RawEntity {
  id: number
  nombre: string
  subSecretariaId?: number
  creado: string
  modificado: string
}

export interface Entity {
  id: number
  nombre: string
  subSecretariaId?: number
  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  nombre: string
}

export interface CreateUpdateData {
  nombre: string
  subSecretariaId: number
}

export interface CreateUpdateBody {
  nombre: string
  subSecretariaId: number
}
