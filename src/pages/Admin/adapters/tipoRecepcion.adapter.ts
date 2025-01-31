import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoRecepcionModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    TipoRecepcionModel.RawEntity[],
    TipoRecepcionModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<TipoRecepcionModel.Entity>(item => ({
      id: item.id,
      nombre: item.nombre,

      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<TipoRecepcionModel.RawRef[], Ref[]>
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
  output: OutputAdapter<TipoRecepcionModel.RawEntity, TipoRecepcionModel.Entity>
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
    TipoRecepcionModel.CreateData,
    TipoRecepcionModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: TipoRecepcionModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
