import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RescisionModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<RescisionModel.RawEntity[], RescisionModel.Entity[]>
} = {
  output: response => {
    const convertedResource = response.map<RescisionModel.Entity>(item => ({
      id: item.id,
      numeroExpediente: item.numeroExpediente,
      numeroResolucion: item.numeroResolucion,
      fecha: item.fecha,
      observaciones: item.observaciones,

      obra: item.obra && {
        id: item.obra.id,
        title: item.obra.numero,
      },
      tipoRescision: item.tipoRescision && {
        id: item.tipoRescision.id,
        title: item.tipoRescision.nombre,
      },
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<RescisionModel.RawRef[], Ref[]>
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
  output: OutputAdapter<RescisionModel.RawEntity, RescisionModel.Entity>
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      numeroExpediente: response.numeroExpediente,
      numeroResolucion: response.numeroResolucion,
      fecha: response.fecha,
      observaciones: response.observaciones,

      obra: response.obra && {
        id: response.obra.id,
        title: response.obra.numero,
      },
      tipoRescision: response.tipoRescision && {
        id: response.tipoRescision.id,
        title: response.tipoRescision.nombre,
      },
      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<RescisionModel.CreateData, RescisionModel.CreateBody>
} = {
  input: data => {
    const convertedResource: RescisionModel.CreateBody = {
      numeroExpediente: data.numeroExpediente,
      numeroResolucion: data.numeroResolucion,
      fecha: data.fecha,
      observaciones: data.observaciones,

      obraId: data.obraId,
      tipoRescisionId: data.tipoRescisionId,
    }
    return convertedResource
  },
}
