import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ParalizacionObraModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    ParalizacionObraModel.RawEntity[],
    ParalizacionObraModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<ParalizacionObraModel.Entity>(
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
  output: OutputAdapter<ParalizacionObraModel.RawRef[], Ref[]>
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
    ParalizacionObraModel.RawEntity,
    ParalizacionObraModel.Entity
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
    ParalizacionObraModel.CreateData,
    ParalizacionObraModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: ParalizacionObraModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
