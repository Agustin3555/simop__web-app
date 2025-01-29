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
      ordenPago: item.ordenPago,
      fecha: item.fecha,
      monto: item.monto,
      observaciones: item.observaciones,
      /*fojaMedicionId: item.fojaMedicionId && {
        id: item.fojaMedicionId.id,
        title: item.fojaMedicionId.ordenPago,
      },*/
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
      title: item.ordenPago,
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
      ordenPago: response.ordenPago,
      fecha: response.fecha,
      monto: response.monto,
      observaciones: response.observaciones,

      fojaMedicion: response.fojaMedicion && {
        id: response.fojaMedicion.id,
        title: response.fojaMedicion.numeroExpediente,
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
      ordenPago: data.ordenPago,
      fecha: data.fecha,
      monto: data.monto,
      observaciones: data.observaciones,
      fojaMedicionId: data.fojaMedicionId,
    }
    return convertedResource
  },
}
