import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { SubSecretariaModel } from '../models'
import { Ref } from '../types'

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

export const getOne: {
  output: OutputAdapter<SubSecretariaModel.RawEntity, SubSecretariaModel.Entity>
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

export const getForConnect: {
  output: OutputAdapter<SubSecretariaModel.RawRef[], Ref[]>
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
