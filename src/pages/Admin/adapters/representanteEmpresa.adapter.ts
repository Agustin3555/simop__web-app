import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RepresentanteEmpresaModel } from '../models'
import { Ref } from '../types'

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
        cuit: item.cuit,
        apellido: item.apellido,
        nombre: item.nombre,
        direccion: item.direccion,
        numeroMatricula: item.numeroMatricula,
        vigencia: item.vigencia,

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
        tipoRepresentanteEmpresa: item.tipoRepresentanteEmpresa && {
          id: item.tipoRepresentanteEmpresa.id,
          title: item.tipoRepresentanteEmpresa.nombre,
        },

        creado: item.creado,
        modificado: item.modificado,
      }),
    )

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<RepresentanteEmpresaModel.RawRef[], Ref[]>
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
  output: OutputAdapter<
    RepresentanteEmpresaModel.RawEntity,
    RepresentanteEmpresaModel.Entity
  >
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      cuit: response.cuit,
      apellido: response.apellido,
      nombre: response.nombre,
      direccion: response.direccion,
      numeroMatricula: response.numeroMatricula,
      vigencia: response.vigencia,

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
      tipoRepresentanteEmpresa: response.tipoRepresentanteEmpresa && {
        id: response.tipoRepresentanteEmpresa.id,
        title: response.tipoRepresentanteEmpresa.nombre,
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
      cuit: data.cuit,
      apellido: data.apellido,
      nombre: data.nombre,
      direccion: data.direccion,
      numeroMatricula: data.numeroMatricula,
      vigencia: data.vigencia,

      paisId: data.paisId,
      provinciaId: data.provinciaId,
      localidadId: data.localidadId,
      tipoRepresentanteEmpresaId: data.tipoRepresentanteEmpresaId,
    }

    return convertedResource
  },
}
