import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { FojaMedicionModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    FojaMedicionModel.RawEntity[],
    FojaMedicionModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<FojaMedicionModel.Entity>(item => ({
      id: item.id,
      numero: item.numero,
      numeroExpediente: item.numeroExpediente,
      avance: item.avance,
      fecha: item.fecha,
      observaciones: item.observaciones,
      obra: item.obra && {
        id: item.obra.id,
        title: item.obra.numero,
      },
      inspector: item.inspector && {
        id: item.inspector.id,
        title: item.inspector.apellido,
      },
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<FojaMedicionModel.RawRef[], Ref[]>
} = {
  output: response => {
    const convertedResource = response.map<Ref>(item => ({
      id: item.id,
      title: item.numeroExpediente,
    }))

    return convertedResource
  },
}

export const getOne: {
  output: OutputAdapter<FojaMedicionModel.RawEntity, FojaMedicionModel.Entity>
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      numero: response.numero,
      numeroExpediente: response.numeroExpediente,
      avance: response.avance,
      fecha: response.fecha,
      observaciones: response.observaciones,
      obraId: response.obra && {
        id: response.obra.id,
        title: response.obra.numero,
      },
      inspectorId: response.inspector && {
        id: response.inspector.id,
        title: response.inspector.apellido,
      },
      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<
    FojaMedicionModel.CreateData,
    FojaMedicionModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: FojaMedicionModel.CreateBody = {
      numero: data.numero,
      numeroExpediente: data.numeroExpediente,
      avance: data.avance,
      fecha: data.fecha,
      observaciones: data.observaciones,
      obraId: data.obraId,
      inspectorId: data.inspectorId,

      creado: data.creado,
      modificado: data.modificado,
    }
    return convertedResource
  },
}
