import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ModificacionObraModel } from '../models'
import { Ref } from '../types'

export const getAll: {
  output: OutputAdapter<
    ModificacionObraModel.RawEntity[],
    ModificacionObraModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<ModificacionObraModel.Entity>(item => ({
      id: item.id,
      nombre: item.nombre,
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<ModificacionObraModel.RawRef[], Ref[]>
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
  output: OutputAdapter<ModificacionObraModel.RawEntity, ModificacionObraModel.Entity>
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
    ModificacionObraModel.CreateData,
    ModificacionObraModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: ModificacionObraModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
