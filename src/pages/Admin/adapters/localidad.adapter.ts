import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { LocalidadModel } from '../models'
import { Ref } from '../types'

export const getAll: {
  output: OutputAdapter<
    LocalidadModel.RawEntity[],
    LocalidadModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<LocalidadModel.Entity>(item => ({
      id: item.id,
      nombre: item.nombre,
      provincia: item.provincia && {
        id: item.provincia.id,
        title: item.provincia.nombre,
      },
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<LocalidadModel.RawRef[], Ref[]>
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
  output: OutputAdapter<LocalidadModel.RawEntity, LocalidadModel.Entity>
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      nombre: response.nombre,
      provincia: response.provincia && {
        id: response.provincia.id,
        title: response.provincia.nombre,
      },
      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<
    LocalidadModel.CreateData,
    LocalidadModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: LocalidadModel.CreateBody = {
      nombre: data.nombre,
      provinciaId: data.provinciaId,
    }

    return convertedResource
  },
}
