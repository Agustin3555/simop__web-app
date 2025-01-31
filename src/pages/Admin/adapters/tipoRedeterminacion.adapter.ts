import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoRedeterminacionModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    TipoRedeterminacionModel.RawEntity[],
    TipoRedeterminacionModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<TipoRedeterminacionModel.Entity>(
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
  output: OutputAdapter<TipoRedeterminacionModel.RawRef[], Ref[]>
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
    TipoRedeterminacionModel.RawEntity,
    TipoRedeterminacionModel.Entity
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
    TipoRedeterminacionModel.CreateData,
    TipoRedeterminacionModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: TipoRedeterminacionModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
