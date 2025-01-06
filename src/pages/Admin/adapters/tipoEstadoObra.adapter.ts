import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoEstadoObraModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    TipoEstadoObraModel.RawEntity[],
    TipoEstadoObraModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<TipoEstadoObraModel.Entity>(
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
  output: OutputAdapter<TipoEstadoObraModel.RawRef[], Ref[]>
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
    TipoEstadoObraModel.RawEntity,
    TipoEstadoObraModel.Entity
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
    TipoEstadoObraModel.CreateData,
    TipoEstadoObraModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: TipoEstadoObraModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
