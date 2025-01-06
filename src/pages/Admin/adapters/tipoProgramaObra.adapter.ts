import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoProgramaObraModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    TipoProgramaObraModel.RawEntity[],
    TipoProgramaObraModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<TipoProgramaObraModel.Entity>(
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
  output: OutputAdapter<TipoProgramaObraModel.RawRef[], Ref[]>
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
    TipoProgramaObraModel.RawEntity,
    TipoProgramaObraModel.Entity
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
    TipoProgramaObraModel.CreateData,
    TipoProgramaObraModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: TipoProgramaObraModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
