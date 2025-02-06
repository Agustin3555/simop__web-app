import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ParalizacionModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    ParalizacionModel.RawEntity[],
    ParalizacionModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<ParalizacionModel.Entity>(item => ({
      id: item.id,
      numero: item.numero,
      numeroExpediente: item.numeroExpediente,
      fechaReinicio: item.fechaReinicio,
      nuevaFechaFinObra: item.nuevaFechaFinObra,
      fecha: item.fecha,
      observaciones: item.observaciones,

      obra: item.obra && {
        id: item.obra.id,
        title: item.obra.numero,
      },
      tipoParalizacion: item.tipoParalizacion && {
        id: item.tipoParalizacion.id,
        title: item.tipoParalizacion.nombre,
      },
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<ParalizacionModel.RawRef[], Ref[]>
} = {
  output: response => {
    const convertedResource = response.map<Ref>(item => ({
      id: item.id,
      title: item.numero,
    }))

    return convertedResource
  },
}

export const getOne: {
  output: OutputAdapter<ParalizacionModel.RawEntity, ParalizacionModel.Entity>
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      numero: response.numero,
      numeroExpediente: response.numeroExpediente,
      fechaReinicio: response.fechaReinicio,
      nuevaFechaFinObra: response.nuevaFechaFinObra,
      fecha: response.fecha,
      observaciones: response.observaciones,

      obra: response.obra && {
        id: response.obra.id,
        title: response.obra.numero,
      },
      tipoParalizacion: response.tipoParalizacion && {
        id: response.tipoParalizacion.id,
        title: response.tipoParalizacion.nombre,
      },
      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<
    ParalizacionModel.CreateData,
    ParalizacionModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: ParalizacionModel.CreateBody = {
      numero: data.numero,
      numeroExpediente: data.numeroExpediente,
      fechaReinicio: data.fechaReinicio,
      nuevaFechaFinObra: data.nuevaFechaFinObra,
      fecha: data.fecha,
      observaciones: data.observaciones,

      tipoParalizacionId: data.tipoParalizacionId,
      obraId: data.obraId,
    }
    return convertedResource
  },
}
