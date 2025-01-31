import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoModificacionModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    TipoModificacionModel.RawEntity[],
    TipoModificacionModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<TipoModificacionModel.Entity>(
      item => ({
        id: item.id,
        nombre: item.nombre,

        creado: item.creado,
        modificado: item.modificado,
      }),
    )

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<TipoModificacionModel.RawRef[], Ref[]>
} = {
  output: response => {
    const convertedResource = response.map<Ref>(item => ({
      id: item.id,
      title: item.nombre,
    }))

    return convertedResource
  },
}

export const getOne: {
  output: OutputAdapter<
    TipoModificacionModel.RawEntity,
    TipoModificacionModel.Entity
  >
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      nombre: response.nombre,

      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<
    TipoModificacionModel.CreateData,
    TipoModificacionModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: TipoModificacionModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
