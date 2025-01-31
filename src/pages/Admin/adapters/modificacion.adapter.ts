import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ModificacionModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    ModificacionModel.RawEntity[],
    ModificacionModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<ModificacionModel.Entity>(item => ({
      id: item.id,
      numeroExpediente: item.numeroExpediente,
      numeroResolucion: item.numeroResolucion,
      monto: item.monto,
      nuevoMontoObra: item.nuevoMontoObra,
      fecha: item.fecha,
      observaciones: item.observaciones,

      obra: item.obra && {
        id: item.obra.id,
        title: item.obra.numero,
      },
      tipoModificacion: item.tipoModificacion && {
        id: item.tipoModificacion.id,
        title: item.tipoModificacion.nombre,
      },
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<ModificacionModel.RawRef[], Ref[]>
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
  output: OutputAdapter<ModificacionModel.RawEntity, ModificacionModel.Entity>
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      numeroExpediente: response.numeroExpediente,
      numeroResolucion: response.numeroResolucion,
      monto: response.monto,
      nuevoMontoObra: response.nuevoMontoObra,
      fecha: response.fecha,
      observaciones: response.observaciones,

      obra: response.obra && {
        id: response.obra.id,
        title: response.obra.numero,
      },
      tipoModificacion: response.tipoModificacion && {
        id: response.tipoModificacion.id,
        title: response.tipoModificacion.nombre,
      },
      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<
    ModificacionModel.CreateData,
    ModificacionModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: ModificacionModel.CreateBody = {
      numeroExpediente: data.numeroExpediente,
      numeroResolucion: data.numeroResolucion,
      monto: data.monto,
      nuevoMontoObra: data.nuevoMontoObra,
      fecha: data.fecha,
      observaciones: data.observaciones,

      obraId: data.obraId,
      tipoModificacionId: data.tipoModificacionId,
    }
    return convertedResource
  },
}
