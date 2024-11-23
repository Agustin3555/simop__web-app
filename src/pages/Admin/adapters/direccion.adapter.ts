import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { DireccionModel } from '../models'
import { Options } from '../hooks'

export const getAll: {
  output: OutputAdapter<DireccionModel.RawEntity[], DireccionModel.Entity[]>
} = {
  output: response => {
    const convertedResource = response.map<DireccionModel.Entity>(item => ({
      id: item.id,
      nombre: item.nombre,
      subSecretariaId: item.subSecretariaId,
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<DireccionModel.RawRef[], Options[]>
} = {
  output: response => {
    const convertedResource = response.map<Options>(item => ({
      id: item.id,
      title: item.nombre,
    }))

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<
    DireccionModel.CreateUpdateData,
    DireccionModel.CreateUpdateBody
  >
} = {
  input: data => {
    const convertedResource: DireccionModel.CreateUpdateBody = {
      nombre: data.nombre,
      subSecretariaId: data.subSecretariaId,
    }

    return convertedResource
  },
}

export const update: {
  input: InputAdapter<
    DireccionModel.CreateUpdateData,
    DireccionModel.CreateUpdateBody
  >
} = {
  input: data => {
    const convertedResource: DireccionModel.CreateUpdateBody = {
      nombre: data.nombre,
      subSecretariaId: data.subSecretariaId,
    }

    return convertedResource
  },
}
