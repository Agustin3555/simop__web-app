import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoTematicaObraModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    TipoTematicaObraModel.RawEntity[],
    TipoTematicaObraModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<TipoTematicaObraModel.Entity>(
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
  output: OutputAdapter<TipoTematicaObraModel.RawRef[], Ref[]>
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
    TipoTematicaObraModel.RawEntity,
    TipoTematicaObraModel.Entity
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
    TipoTematicaObraModel.CreateData,
    TipoTematicaObraModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: TipoTematicaObraModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
