import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { PagoCertificacionModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    PagoCertificacionModel.RawEntity[],
    PagoCertificacionModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<PagoCertificacionModel.Entity>(
      item => ({
        id: item.id,
        numero: item.numero,
        monto: item.monto,
        fecha: item.fecha,
        observaciones: item.observaciones,
        certificacion: item.certificacion && {
          id: item.certificacion.id,
          title: item.certificacion.id,
        },
        creado: item.creado,
        modificado: item.modificado,
      }),
    )

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<PagoCertificacionModel.RawRef[], Ref[]>
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
  output: OutputAdapter<
    PagoCertificacionModel.RawEntity,
    PagoCertificacionModel.Entity
  >
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      numero: response.numero,
      monto: response.monto,
      fecha: response.fecha,
      observaciones: response.observaciones,
      certificacionId: response.certificacion && {
        id: response.certificacion.id,
        title: response.certificacion.id,
      },
      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<
    PagoCertificacionModel.CreateData,
    PagoCertificacionModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: PagoCertificacionModel.CreateBody = {
      numero: data.numero,
      monto: data.monto,
      fecha: data.fecha,
      observaciones: data.observaciones,
      certificacionId: data.certificacionId,
    }
    return convertedResource
  },
}
