import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { FinanciamientoModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    FinanciamientoModel.RawEntity[],
    FinanciamientoModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<FinanciamientoModel.Entity>(
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
  output: OutputAdapter<FinanciamientoModel.RawRef[], Ref[]>
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
    FinanciamientoModel.RawEntity,
    FinanciamientoModel.Entity
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
    FinanciamientoModel.CreateData,
    FinanciamientoModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: FinanciamientoModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
