import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { TipoRepresentanteEmpresaModel } from '../models'
import { Ref } from '../types'

export const getAll: {
  output: OutputAdapter<
    TipoRepresentanteEmpresaModel.RawEntity[],
    TipoRepresentanteEmpresaModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<TipoRepresentanteEmpresaModel.Entity>(item => ({
      id: item.id,
      nombre: item.nombre,
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<TipoRepresentanteEmpresaModel.RawRef[], Ref[]>
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
  output: OutputAdapter<TipoRepresentanteEmpresaModel.RawEntity, TipoRepresentanteEmpresaModel.Entity>
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
    TipoRepresentanteEmpresaModel.CreateData,
    TipoRepresentanteEmpresaModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: TipoRepresentanteEmpresaModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
