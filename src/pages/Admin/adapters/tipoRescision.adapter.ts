import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoRescisionModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    TipoRescisionModel.RawEntity[],
    TipoRescisionModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<TipoRescisionModel.Entity>(item => ({
      id: item.id,
      nombre: item.nombre,

      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<TipoRescisionModel.RawRef[], Ref[]>
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
  output: OutputAdapter<TipoRescisionModel.RawEntity, TipoRescisionModel.Entity>
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
    TipoRescisionModel.CreateData,
    TipoRescisionModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: TipoRescisionModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
