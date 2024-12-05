import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { EstadoObraModel } from '../models'
import { Ref } from '../types'

export const getAll: {
  output: OutputAdapter<
    EstadoObraModel.RawEntity[],
    EstadoObraModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<EstadoObraModel.Entity>(item => ({
      id: item.id,
      nombre: item.nombre,
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<EstadoObraModel.RawRef[], Ref[]>
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
  output: OutputAdapter<EstadoObraModel.RawEntity, EstadoObraModel.Entity>
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
    EstadoObraModel.CreateData,
    EstadoObraModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: EstadoObraModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
