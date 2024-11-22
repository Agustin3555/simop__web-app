import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { SubSecretariaModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    SubSecretariaModel.RawEntity[],
    SubSecretariaModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<SubSecretariaModel.Entity>(item => ({
      id: item.id,
      nombre: item.nombre,
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<SubSecretariaModel.RawRef[], SubSecretariaModel.Ref[]>
} = {
  output: response => {
    const convertedResource = response.map<SubSecretariaModel.Ref>(item => ({
      id: item.id,
      nombre: item.nombre,
    }))

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<
    SubSecretariaModel.CreateUpdateData,
    SubSecretariaModel.CreateUpdateBody
  >
} = {
  input: data => {
    const convertedResource: SubSecretariaModel.CreateUpdateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}

export const update: {
  input: InputAdapter<
    SubSecretariaModel.CreateUpdateData,
    SubSecretariaModel.CreateUpdateBody
  >
} = {
  input: data => {
    const convertedResource: SubSecretariaModel.CreateUpdateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
