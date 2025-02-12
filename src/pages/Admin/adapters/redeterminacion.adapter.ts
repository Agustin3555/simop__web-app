import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RedeterminacionModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    RedeterminacionModel.RawEntity[],
    RedeterminacionModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<RedeterminacionModel.Entity>(
      item => ({
        id: item.id,
        numeroExpediente: item.numeroExpediente,
        numeroResolucion: item.numeroResolucion,
        numeroExpedienteCertificado: item.numeroExpediente,
        numeroExpedienteSolicitud: item.numeroExpediente,
        monto: item.monto,
        nuevoMontoObra: item.nuevoMontoObra,
        fecha: item.fecha,
        observaciones: item.observaciones,

        certificacion: item.certificacion && {
          id: item.certificacion.id,
          title: item.certificacion.numeroExpediente,
        },
        tipoRedeterminacion: item.tipoRedeterminacion && {
          id: item.tipoRedeterminacion.id,
          title: item.tipoRedeterminacion.nombre,
        },
        creado: item.creado,
        modificado: item.modificado,
      }),
    )

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<RedeterminacionModel.RawRef[], Ref[]>
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
  output: OutputAdapter<
    RedeterminacionModel.RawEntity,
    RedeterminacionModel.Entity
  >
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      numeroExpediente: response.numeroExpediente,
      numeroResolucion: response.numeroResolucion,
      numeroExpedienteCertificado: response.numeroExpediente,
      numeroExpedienteSolicitud: response.numeroExpediente,
      monto: response.monto,
      nuevoMontoObra: response.nuevoMontoObra,
      fecha: response.fecha,
      observaciones: response.observaciones,

      certificacion: response.certificacion && {
        id: response.certificacion.id,
        title: response.certificacion.numeroExpediente,
      },
      tipoRedeterminacion: response.tipoRedeterminacion && {
        id: response.tipoRedeterminacion.id,
        title: response.tipoRedeterminacion.nombre,
      },
      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<
    RedeterminacionModel.CreateData,
    RedeterminacionModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: RedeterminacionModel.CreateBody = {
      numeroExpediente: data.numeroExpediente,
      numeroResolucion: data.numeroResolucion,
      numeroExpedienteCertificado: data.numeroExpediente,
      numeroExpedienteSolicitud: data.numeroExpediente,
      monto: data.monto,
      nuevoMontoObra: data.nuevoMontoObra,
      fecha: data.fecha,
      observaciones: data.observaciones,

      certificacionId: data.certificacionId,
      tipoRedeterminacionId: data.tipoRedeterminacionId,
    }
    return convertedResource
  },
}
