import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { SubSecretariaModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    SubSecretariaModel.RawEntity[],
    SubSecretariaModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource: SubSecretariaModel.Entity[] = response.map(
      item => ({
        id: item.id,
        nombre: item.nombre,
        creado: item.creado,
        modificado: item.modificado,
      })
    )

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<
    SubSecretariaModel.CreateData,
    SubSecretariaModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: SubSecretariaModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}

export const update: {
  input: InputAdapter<
    SubSecretariaModel.UpdateData,
    SubSecretariaModel.UpdateBody
  >
} = {
  input: data => {
    const convertedResource: SubSecretariaModel.UpdateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
