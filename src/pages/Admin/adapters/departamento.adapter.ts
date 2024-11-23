import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { DepartamentoModel } from '../models'
import { Options } from '../hooks'

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
      direccionId: item.direccionId,
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<DepartamentoModel.RawRef[], Options[]>
} = {
  output: response => {
    const convertedResource = response.map<Options>(item => ({
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
