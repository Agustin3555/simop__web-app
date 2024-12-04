import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ProgramaObraModel } from '../models'
import { Ref } from '../types'

export const getAll: {
  output: OutputAdapter<
    ProgramaObraModel.RawEntity[],
    ProgramaObraModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<ProgramaObraModel.Entity>(item => ({
      id: item.id,
      nombre: item.nombre,
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<ProgramaObraModel.RawRef[], Ref[]>
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
  output: OutputAdapter<ProgramaObraModel.RawEntity, ProgramaObraModel.Entity>
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
    ProgramaObraModel.CreateData,
    ProgramaObraModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: ProgramaObraModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
