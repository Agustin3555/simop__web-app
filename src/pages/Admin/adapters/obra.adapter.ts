import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ObraModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<ObraModel.RawEntity[], ObraModel.Entity[]>
} = {
  output: response => {
    const convertedResource = response.map<ObraModel.Entity>(item => ({
      id: item.id,
      numero: item.numero,
      nombre: item.nombre,
      numeroExpediente: item.numeroExpediente,
      numeroResolucion: item.numeroResolucion,
      anioResolucion: item.anioResolucion,
      numeroContratacion: item.numeroContratacion,
      anioContratacion: item.anioContratacion,
      montoContratacion: item.montoContratacion,
      fechaInicio: item.fechaInicio,
      fechaFin: item.fechaFin,
      plazoMeses: item.plazoMeses,
      plazoDias: item.plazoDias,
      direccion: item.direccion,
      lugar: item.lugar,
      nomenclaturaCatastral: item.nomenclaturaCatastral,
      observaciones: item.observaciones,
      obraNueva: item.obraNueva,
      porcentajeObraNueva: item.porcentajeObraNueva,
      metrosCuadradosObraNueva: item.metrosCuadradosObraNueva,
      metrosLinealesObraNueva: item.metrosLinealesObraNueva,
      observacionesObraNueva: item.observacionesObraNueva,
      obraRefaccionada: item.obraRefaccionada,
      porcentajeObraRefaccionada: item.porcentajeObraRefaccionada,
      metrosCuadradosObraRefaccionada: item.metrosCuadradosObraRefaccionada,
      metrosLinealesObraRefaccionada: item.metrosLinealesObraRefaccionada,
      observacionesObraRefaccionada: item.observacionesObraRefaccionada,

      empresa: item.empresa && {
        id: item.empresa.id,
        title: item.empresa.nombre,
      },
      tipoContratacionObra: item.tipoContratacionObra && {
        id: item.tipoContratacionObra.id,
        title: item.tipoContratacionObra.nombre,
      },
      tipoFinanciamientoObra: item.tipoFinanciamientoObra && {
        id: item.tipoFinanciamientoObra.id,
        title: item.tipoFinanciamientoObra.nombre,
      },
      tipoProgramaObra: item.tipoProgramaObra && {
        id: item.tipoProgramaObra.id,
        title: item.tipoProgramaObra.nombre,
      },
      tipoTematicaObra: item.tipoTematicaObra && {
        id: item.tipoTematicaObra.id,
        title: item.tipoTematicaObra.nombre,
      },
      tipoEstadoObra: item.tipoEstadoObra && {
        id: item.tipoEstadoObra.id,
        title: item.tipoEstadoObra.nombre,
      },
      localidad: item.localidad && {
        id: item.localidad.id,
        title: item.localidad.nombre,
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
      title: item.numero,
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
      numero: response.numero,
      nombre: response.nombre,
      numeroExpediente: response.numeroExpediente,
      numeroResolucion: response.numeroResolucion,
      anioResolucion: response.anioResolucion,
      numeroContratacion: response.numeroContratacion,
      anioContratacion: response.anioContratacion,
      montoContratacion: response.montoContratacion,
      fechaInicio: response.fechaInicio,
      fechaFin: response.fechaFin,
      plazoMeses: response.plazoMeses,
      plazoDias: response.plazoDias,
      direccion: response.direccion,
      lugar: response.lugar,
      nomenclaturaCatastral: response.nomenclaturaCatastral,
      observaciones: response.observaciones,
      obraNueva: response.obraNueva,
      porcentajeObraNueva: response.porcentajeObraNueva,
      metrosCuadradosObraNueva: response.metrosCuadradosObraNueva,
      metrosLinealesObraNueva: response.metrosLinealesObraNueva,
      observacionesObraNueva: response.observacionesObraNueva,
      obraRefaccionada: response.obraRefaccionada,
      porcentajeObraRefaccionada: response.porcentajeObraRefaccionada,
      metrosCuadradosObraRefaccionada: response.metrosCuadradosObraRefaccionada,
      metrosLinealesObraRefaccionada: response.metrosLinealesObraRefaccionada,
      observacionesObraRefaccionada: response.observacionesObraRefaccionada,

      empresa: response.empresa && {
        id: response.empresa.id,
        title: response.empresa.nombre,
      },
      tipoContratacionObra: response.tipoContratacionObra && {
        id: response.tipoContratacionObra.id,
        title: response.tipoContratacionObra.nombre,
      },
      tipoFinanciamientoObra: response.tipoFinanciamientoObra && {
        id: response.tipoFinanciamientoObra.id,
        title: response.tipoFinanciamientoObra.nombre,
      },
      tipoProgramaObra: response.tipoProgramaObra && {
        id: response.tipoProgramaObra.id,
        title: response.tipoProgramaObra.nombre,
      },
      tipoTematicaObra: response.tipoTematicaObra && {
        id: response.tipoTematicaObra.id,
        title: response.tipoTematicaObra.nombre,
      },
      tipoEstadoObra: response.tipoEstadoObra && {
        id: response.tipoEstadoObra.id,
        title: response.tipoEstadoObra.nombre,
      },
      localidad: response.localidad && {
        id: response.localidad.id,
        title: response.localidad.nombre,
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
      numero: data.numero,
      nombre: data.nombre,
      numeroExpediente: data.numeroExpediente,
      numeroResolucion: data.numeroResolucion,
      anioResolucion: data.anioResolucion,
      numeroContratacion: data.numeroContratacion,
      anioContratacion: data.anioContratacion,
      montoContratacion: data.montoContratacion,
      fechaInicio: data.fechaInicio,
      fechaFin: data.fechaFin,
      plazoMeses: data.plazoMeses,
      plazoDias: data.plazoDias,
      direccion: data.direccion,
      lugar: data.lugar,
      nomenclaturaCatastral: data.nomenclaturaCatastral,
      observaciones: data.observaciones,
      obraNueva: data.obraNueva,
      porcentajeObraNueva: data.porcentajeObraNueva,
      metrosCuadradosObraNueva: data.metrosCuadradosObraNueva,
      metrosLinealesObraNueva: data.metrosLinealesObraNueva,
      observacionesObraNueva: data.observacionesObraNueva,
      obraRefaccionada: data.obraRefaccionada,
      porcentajeObraRefaccionada: data.porcentajeObraRefaccionada,
      metrosCuadradosObraRefaccionada: data.metrosCuadradosObraRefaccionada,
      metrosLinealesObraRefaccionada: data.metrosLinealesObraRefaccionada,
      observacionesObraRefaccionada: data.observacionesObraRefaccionada,

      empresaId: data.empresaId,
      tipoContratacionObraId: data.tipoContratacionObraId,
      tipoFinanciamientoObraId: data.tipoFinanciamientoObraId,
      tipoProgramaObraId: data.tipoProgramaObraId,
      tipoTematicaObraId: data.tipoTematicaObraId,
      tipoEstadoObraId: data.tipoEstadoObraId,
      localidadId: data.localidadId,
    }
    return convertedResource
  },
}
