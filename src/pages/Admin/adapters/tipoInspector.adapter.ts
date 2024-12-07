import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoInspectorModel } from '../models'
import { Ref } from '../types'

export const getAll: {
  output: OutputAdapter<
    TipoInspectorModel.RawEntity[],
    TipoInspectorModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<TipoInspectorModel.Entity>(item => ({
      id: item.id,
      nombre: item.nombre,
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<TipoInspectorModel.RawRef[], Ref[]>
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
  output: OutputAdapter<TipoInspectorModel.RawEntity, TipoInspectorModel.Entity>
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
    TipoInspectorModel.CreateData,
    TipoInspectorModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: TipoInspectorModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
