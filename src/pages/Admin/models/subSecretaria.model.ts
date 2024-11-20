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

export interface CreateData {
  nombre: string
}

export interface CreateBody {
  nombre: string
}

export interface UpdateData {
  nombre: string
}

export interface UpdateBody {
  nombre: string
}
