import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { DepartamentoModel } from '../models'
import { Ref } from '../types'

export const getAll: {
  output: OutputAdapter<
    DepartamentoModel.RawEntity[],
    DepartamentoModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<DepartamentoModel.Entity>(item => ({
      id: item.id,
      nombre: item.nombre,
      direccion: item.direccion && {
        id: item.direccion.id,
        title: item.direccion.nombre,
      },
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getOne: {
  output: OutputAdapter<DepartamentoModel.RawEntity, DepartamentoModel.Entity>
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      nombre: response.nombre,
      direccion: response.direccion && {
        id: response.direccion.id,
        title: response.direccion.nombre,
      },
      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<DepartamentoModel.RawRef[], Ref[]>
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
    DepartamentoModel.CreateUpdateData,
    DepartamentoModel.CreateUpdateBody
  >
} = {
  input: data => {
    const convertedResource: DepartamentoModel.CreateUpdateBody = {
      nombre: data.nombre,
      direccionId: data.direccionId,
    }

    return convertedResource
  },
}

export const update: {
  input: InputAdapter<
    DepartamentoModel.CreateUpdateData,
    DepartamentoModel.CreateUpdateBody
  >
} = {
  input: data => {
    const convertedResource: DepartamentoModel.CreateUpdateBody = {
      nombre: data.nombre,
      direccionId: data.direccionId,
    }

    return convertedResource
  },
}
