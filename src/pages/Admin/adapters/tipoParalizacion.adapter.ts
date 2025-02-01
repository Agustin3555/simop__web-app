import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoParalizacionModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    TipoParalizacionModel.RawEntity[],
    TipoParalizacionModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<TipoParalizacionModel.Entity>(
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
  output: OutputAdapter<TipoParalizacionModel.RawRef[], Ref[]>
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
    TipoParalizacionModel.RawEntity,
    TipoParalizacionModel.Entity
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
    TipoParalizacionModel.CreateData,
    TipoParalizacionModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: TipoParalizacionModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
