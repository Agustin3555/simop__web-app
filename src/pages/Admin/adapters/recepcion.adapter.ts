import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RecepcionModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<RecepcionModel.RawEntity[], RecepcionModel.Entity[]>
} = {
  output: response => {
    const convertedResource = response.map<RecepcionModel.Entity>(item => ({
      id: item.id,
      numeroActa: item.numeroActa,
      fecha: item.fecha,
      observaciones: item.observaciones,

      obra: item.obra && {
        id: item.obra.id,
        title: item.obra.numero,
      },
      tipoRecepcion: item.tipoRecepcion && {
        id: item.tipoRecepcion.id,
        title: item.tipoRecepcion.nombre,
      },
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<RecepcionModel.RawRef[], Ref[]>
} = {
  output: response => {
    const convertedResource = response.map<Ref>(item => ({
      id: item.id,
      title: item.numeroActa,
    }))

    return convertedResource
  },
}

export const getOne: {
  output: OutputAdapter<RecepcionModel.RawEntity, RecepcionModel.Entity>
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      numeroActa: response.numeroActa,
      fecha: response.fecha,
      observaciones: response.observaciones,

      obra: response.obra && {
        id: response.obra.id,
        title: response.obra.numero,
      },
      tipoRecepcion: response.tipoRecepcion && {
        id: response.tipoRecepcion.id,
        title: response.tipoRecepcion.nombre,
      },
      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<RecepcionModel.CreateData, RecepcionModel.CreateBody>
} = {
  input: data => {
    const convertedResource: RecepcionModel.CreateBody = {
      numeroActa: data.numeroActa,
      fecha: data.fecha,
      observaciones: data.observaciones,

      obraId: data.obraId,
      tipoRecepcionId: data.tipoRecepcionId,
    }
    return convertedResource
  },
}
