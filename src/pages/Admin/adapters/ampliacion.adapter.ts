import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { AmpliacionModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<AmpliacionModel.RawEntity[], AmpliacionModel.Entity[]>
} = {
  output: response => {
    const convertedResource = response.map<AmpliacionModel.Entity>(item => ({
      id: item.id,
      numero: item.numero,
      numeroResolucion: item.numeroResolucion,
      numeroExpedienteSolicitud: item.numeroExpedienteSolicitud,
      plazoMesesSolicitado: item.plazoMesesSolicitado,
      plazoMesesOtorgado: item.plazoMesesOtorgado,
      nuevaFechaFinObra: item.nuevaFechaFinObra,
      fecha: item.fecha,
      observaciones: item.observaciones,

      obra: item.obra && {
        id: item.obra.id,
        title: item.obra.numero,
      },
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<AmpliacionModel.RawRef[], Ref[]>
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
  output: OutputAdapter<AmpliacionModel.RawEntity, AmpliacionModel.Entity>
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      numero: response.numero,
      numeroResolucion: response.numeroResolucion,
      numeroExpedienteSolicitud: response.numeroExpedienteSolicitud,
      plazoMesesSolicitado: response.plazoMesesSolicitado,
      plazoMesesOtorgado: response.plazoMesesOtorgado,
      nuevaFechaFinObra: response.nuevaFechaFinObra,
      fecha: response.fecha,
      observaciones: response.observaciones,

      obra: response.obra && {
        id: response.obra.id,
        title: response.obra.numero,
      },
      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<AmpliacionModel.CreateData, AmpliacionModel.CreateBody>
} = {
  input: data => {
    const convertedResource: AmpliacionModel.CreateBody = {
      numero: data.numero,
      numeroResolucion: data.numeroResolucion,
      numeroExpedienteSolicitud: data.numeroExpedienteSolicitud,
      plazoMesesSolicitado: data.plazoMesesSolicitado,
      plazoMesesOtorgado: data.plazoMesesOtorgado,
      nuevaFechaFinObra: data.nuevaFechaFinObra,
      fecha: data.fecha,
      observaciones: data.observaciones,

      obraId: data.obraId,
    }
    return convertedResource
  },
}
