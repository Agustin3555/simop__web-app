import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TramiteModel } from '../models'
import { Ref } from '../types'

export const getAll: {
  output: OutputAdapter<
    TramiteModel.RawEntity[],
    TramiteModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<TramiteModel.Entity>(item => ({
      id: item.id,
      nombre: item.nombre,
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<TramiteModel.RawRef[], Ref[]>
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
  output: OutputAdapter<TramiteModel.RawEntity, TramiteModel.Entity>
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
    TramiteModel.CreateData,
    TramiteModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: TramiteModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
