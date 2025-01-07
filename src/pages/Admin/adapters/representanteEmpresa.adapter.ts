import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RepresentanteEmpresaModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    RepresentanteEmpresaModel.RawEntity[],
    RepresentanteEmpresaModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<RepresentanteEmpresaModel.Entity>(
      item => ({
        id: item.id,
        vigencia: item.vigencia,

        empresa: item.empresa && {
          id: item.empresa.id,
          title: item.empresa.nombre,
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
    RepresentanteEmpresaModel.RawEntity,
    RepresentanteEmpresaModel.Entity
  >
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      vigencia: response.vigencia,

      empresa: response.empresa && {
        id: response.empresa.id,
        title: response.empresa.nombre,
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
    RepresentanteEmpresaModel.CreateData,
    RepresentanteEmpresaModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: RepresentanteEmpresaModel.CreateBody = {
      vigencia: data.vigencia,

      empresaId: data.empresaId,
      representanteId: data.representanteId,
      tipoRepresentanteId: data.tipoRepresentanteId,
    }

    return convertedResource
  },
}
