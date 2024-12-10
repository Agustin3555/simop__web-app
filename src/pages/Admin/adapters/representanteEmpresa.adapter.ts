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
        cuitRepresentante: item.cuitRepresentante,
        cuitEmpresa: item.cuitEmpresa,
        apellidos: item.apellidos,
        nombre: item.nombre,
        direccionDeclarada: item.direccionDeclarada,
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
        numeroMatricula: item.numeroMatricula,
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
      cuitRepresentante: response.cuitRepresentante,
      cuitEmpresa: response.cuitEmpresa,
      apellidos: response.apellidos,
      nombre: response.nombre,
      direccionDeclarada: response.direccionDeclarada,
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
      numeroMatricula: response.numeroMatricula,
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
      nombre: data.nombre,
      paisId: data.paisId,
      provinciaId: data.provinciaId,
      localidadId: data.localidadId,
      tipoRepresentanteEmpresaId: data.tipoRepresentanteEmpresaId,
    }

    return convertedResource
  },
}
