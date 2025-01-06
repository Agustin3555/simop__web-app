import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoFinanciamientoObraModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    TipoFinanciamientoObraModel.RawEntity[],
    TipoFinanciamientoObraModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<TipoFinanciamientoObraModel.Entity>(
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
  output: OutputAdapter<TipoFinanciamientoObraModel.RawRef[], Ref[]>
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
    TipoFinanciamientoObraModel.RawEntity,
    TipoFinanciamientoObraModel.Entity
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
    TipoFinanciamientoObraModel.CreateData,
    TipoFinanciamientoObraModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: TipoFinanciamientoObraModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
