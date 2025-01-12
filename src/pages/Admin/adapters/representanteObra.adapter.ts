import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RepresentanteObraModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    RepresentanteObraModel.RawEntity[],
    RepresentanteObraModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<RepresentanteObraModel.Entity>(
      item => ({
        id: item.id,
        vigencia: item.vigencia,

        obra: item.obra && {
          id: item.obra.id,
          title: String(item.obra.numero),
        },
        representante: item.representante && {
          id: item.representante.id,
          title: item.representante.apellido,
        },
        tipoRepresentante: item.tipoRepresentante && {
          id: item.tipoRepresentante.id,
          title: item.tipoRepresentante.nombre,
        },

        creado: item.creado,
        modificado: item.modificado,
      }),
    )

    return convertedResource
  },
}

export const getOne: {
  output: OutputAdapter<
    RepresentanteObraModel.RawEntity,
    RepresentanteObraModel.Entity
  >
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      vigencia: response.vigencia,

      obra: response.obra && {
        id: response.obra.id,
        title: String(response.obra.numero),
      },
      representante: response.representante && {
        id: response.representante.id,
        title: response.representante.apellido,
      },
      tipoRepresentante: response.tipoRepresentante && {
        id: response.tipoRepresentante.id,
        title: response.tipoRepresentante.nombre,
      },

      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<
    RepresentanteObraModel.CreateData,
    RepresentanteObraModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: RepresentanteObraModel.CreateBody = {
      vigencia: data.vigencia,

      obraId: data.obraId,
      representanteId: data.representanteId,
      tipoRepresentanteId: data.tipoRepresentanteId,
    }

    return convertedResource
  },
}
