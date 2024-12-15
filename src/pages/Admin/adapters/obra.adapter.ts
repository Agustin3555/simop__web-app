import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ObraModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<ObraModel.RawEntity[], ObraModel.Entity[]>
} = {
  output: response => {
    const convertedResource = response.map<ObraModel.Entity>(item => ({
      id: item.id,
      nombre: item.nombre,
      numeroResolucion: item.numeroResolucion,
      numeroContratacion: item.numeroContratacion,
      anioContratacion: item.anioContratacion,
      anioResolucion: item.anioResolucion,
      montoContratacion: item.montoContratacion,
      numeroExpediente: item.numeroExpediente,
      nomenclaturaCatastral: item.nomenclaturaCatastral,
      plazoMeses: item.plazoMeses,
      plazoDias: item.plazoDias,
      observaciones: item.observaciones,
      fechaInicio: item.fechaInicio,
      fechaFin: item.fechaFin,

      empresa: item.empresaId && {
        id: item.empresaId.id,
        title: item.empresaId,
      },
      pais: item.pais && {
        id: item.pais.id,
        title: item.pais.nombre,
      },
      provincia: item.provincia && {
        id: item.provincia.id,
        title: item.provincia.nombre,
      },
      localidad: item.localidad && {
        id: item.localidad.id,
        title: item.localidad.nombre,
      },
      financiamiento: item.financiamiento && {
        id: item.financiamiento.id,
        title: item.financiamiento.nombre,
      },
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<ObraModel.RawRef[], Ref[]>
} = {
  output: response => {
    const convertedResource = response.map<Ref>(item => ({
      id: item.id,
      title: item.nombre,
    }))

    return convertedResource
  },
}

export const getOne: {
  output: OutputAdapter<ObraModel.RawEntity, ObraModel.Entity>
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      nombre: response.nombre,
      numeroResolucion: response.numeroResolucion,
      numeroContratacion: response.numeroContratacion,
      anioContratacion: response.anioContratacion,
      anioResolucion: response.anioResolucion,
      montoContratacion: response.montoContratacion,
      numeroExpediente: response.numeroExpediente,
      nomenclaturaCatastral: response.nomenclaturaCatastral,
      plazoMeses: response.plazoMeses,
      plazoDias: response.plazoDias,
      observaciones: response.observaciones,
      fechaInicio: response.fechaInicio,
      fechaFin: response.fechaFin,
      empresa: response.empresaId && {
        id: response.empresaId.id,
        title: response.empresaId,
      },
      pais: response.pais && {
        id: response.pais.id,
        title: response.pais.nombre,
      },
      provincia: response.provincia && {
        id: response.provincia.id,
        title: response.provincia.nombre,
      },
      localidad: response.localidad && {
        id: response.localidad.id,
        title: response.localidad.nombre,
      },
      financiamiento: response.financiamiento && {
        id: response.financiamiento.id,
        title: response.financiamiento.nombre,
      },
      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<ObraModel.CreateData, ObraModel.CreateBody>
} = {
  input: data => {
    const convertedResource: ObraModel.CreateBody = {
      id: data.id,
      nombre: data.nombre,
      numeroResolucion: data.numeroResolucion,
      numeroContratacion: data.numeroContratacion,
      anioContratacion: data.anioContratacion,
      anioResolucion: data.anioResolucion,
      montoContratacion: data.montoContratacion,
      numeroExpediente: data.numeroExpediente,
      nomenclaturaCatastral: data.nomenclaturaCatastral,
      plazoMeses: data.plazoMeses,
      plazoDias: data.plazoDias,
      observaciones: data.observaciones,
      fechaInicio: data.fechaInicio,
      fechaFin: data.fechaFin,
      creado: data.creado,
      modificado: data.modificado,
      paisId: data.paisId,
      provinciaId: data.provinciaId,
      localidadId: data.localidadId,
      empresaId: data.empresaId,
      estadoObraId: data.estadoObraId,
      financiamientoId: data.financiamientoId,
    }
    return convertedResource
  },
}
