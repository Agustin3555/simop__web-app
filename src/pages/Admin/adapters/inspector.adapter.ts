import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { InspectorModel } from '../models'
import { Ref } from '../types'

export const getAll: {
  output: OutputAdapter<
    InspectorModel.RawEntity[],
    InspectorModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<InspectorModel.Entity>(item => ({
      id: item.id,
      nombre: item.nombre,
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<InspectorModel.RawRef[], Ref[]>
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
  output: OutputAdapter<InspectorModel.RawEntity, InspectorModel.Entity>
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
    InspectorModel.CreateData,
    InspectorModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: InspectorModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
