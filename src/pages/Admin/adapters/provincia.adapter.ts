import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ProvinciaModel } from '../models'
import { Ref } from '../types'

export const getAll: {
  output: OutputAdapter<ProvinciaModel.RawEntity[], ProvinciaModel.Entity[]>
} = {
  output: response => {
    const convertedResource = response.map<ProvinciaModel.Entity>(item => ({
      id: item.id,
      nombre: item.nombre,
      pais: item.pais && {
        id: item.pais.id, 
        title: item.pais.nombre,
      },
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<ProvinciaModel.RawRef[], Ref[]>
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
  output: OutputAdapter<ProvinciaModel.RawEntity, ProvinciaModel.Entity>
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      nombre: response.nombre,
      pais: response.pais && {
        id: response.pais.id,
        title: response.pais.nombre,
      },
      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<ProvinciaModel.CreateData, ProvinciaModel.CreateBody>
} = {
  input: data => {
    const convertedResource: ProvinciaModel.CreateBody = {
      nombre: data.nombre,
      paisId: data.paisId,
    }

    return convertedResource
  },
}
