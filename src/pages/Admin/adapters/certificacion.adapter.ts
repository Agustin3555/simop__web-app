import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { CertificacionModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    CertificacionModel.RawEntity[],
    CertificacionModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<CertificacionModel.Entity>(item => ({
      id: item.id,
      numeroExpediente: item.numeroExpediente,
      fecha: item.fecha,
      observaciones: item.observaciones,
      fojaMedicionId: item.fojaMedicionId && {
        id: item.fojaMedicionId.id,
        title: item.fojaMedicionId.numeroExpediente,
      },
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<CertificacionModel.RawRef[], Ref[]>
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
  output: OutputAdapter<CertificacionModel.RawEntity, CertificacionModel.Entity>
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      numeroExpediente: response.numeroExpediente,
      fecha: response.fecha,
      observaciones: response.observaciones,
      fojaMedicionId: response.fojaMedicionId && {
        id: response.fojaMedicionId.id,
        title: response.fojaMedicionId.numeroExpediente,
      },
      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<
    CertificacionModel.CreateData,
    CertificacionModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: CertificacionModel.CreateBody = {
      id: data.id,
      numeroExpediente: data.numeroExpediente,
      fecha: data.fecha,
      observaciones: data.observaciones,
      fojaMedicionId: data.fojaMedicionId,
    }
    return convertedResource
  },
}
