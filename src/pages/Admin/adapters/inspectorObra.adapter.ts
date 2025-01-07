import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { InspectorObraModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    InspectorObraModel.RawEntity[],
    InspectorObraModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<InspectorObraModel.Entity>(item => ({
      id: item.id,

      obra: item.obra && {
        id: item.obra.id,
        title: String(item.obra.numero),
      },
      inspector: item.inspector && {
        id: item.inspector.id,
        title: item.inspector.apellido,
      },
      tipoInspector: item.tipoInspector && {
        id: item.tipoInspector.id,
        title: item.tipoInspector.nombre,
      },
      tipoProfesion: item.tipoProfesion && {
        id: item.tipoProfesion.id,
        title: item.tipoProfesion.nombre,
      },

      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getOne: {
  output: OutputAdapter<InspectorObraModel.RawEntity, InspectorObraModel.Entity>
} = {
  output: response => {
    const convertedResource = {
      id: response.id,

      obra: response.obra && {
        id: response.obra.id,
        title: String(response.obra.numero),
      },
      inspector: response.inspector && {
        id: response.inspector.id,
        title: response.inspector.apellido,
      },
      tipoInspector: response.tipoInspector && {
        id: response.tipoInspector.id,
        title: response.tipoInspector.nombre,
      },
      tipoProfesion: response.tipoProfesion && {
        id: response.tipoProfesion.id,
        title: response.tipoProfesion.nombre,
      },

      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<
    InspectorObraModel.CreateData,
    InspectorObraModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: InspectorObraModel.CreateBody = {
      obraId: data.obraId,
      inspectorId: data.inspectorId,
      tipoInspectorId: data.tipoInspectorId,
      tipoProfesionId: data.tipoProfesionId,
    }

    return convertedResource
  },
}
