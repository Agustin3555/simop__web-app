import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { DireccionModel } from '../models'
import { Ref } from '../types'

export const getAll: {
  output: OutputAdapter<DireccionModel.RawEntity[], DireccionModel.Entity[]>
} = {
  output: response => {
    const convertedResource = response.map<DireccionModel.Entity>(item => ({
      id: item.id,
      nombre: item.nombre,
      subSecretaria: item.subSecretaria && {
        id: item.subSecretaria.id,
        title: item.subSecretaria.nombre,
      },
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<DireccionModel.RawRef[], Ref[]>
} = {
  output: response => {
    const convertedResource = response.map<Ref>(item => ({
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
