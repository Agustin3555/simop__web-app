import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoRepresentanteModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    TipoRepresentanteModel.RawEntity[],
    TipoRepresentanteModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<TipoRepresentanteModel.Entity>(
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
  output: OutputAdapter<TipoRepresentanteModel.RawRef[], Ref[]>
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
    TipoRepresentanteModel.RawEntity,
    TipoRepresentanteModel.Entity
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
    TipoRepresentanteModel.CreateData,
    TipoRepresentanteModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: TipoRepresentanteModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
