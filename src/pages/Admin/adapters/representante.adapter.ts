import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RepresentanteModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<
    RepresentanteModel.RawEntity[],
    RepresentanteModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<RepresentanteModel.Entity>(item => ({
      id: item.id,
      cuil: item.cuil,
      apellido: item.apellido,
      nombre: item.nombre,
      direccion: item.direccion,
      numeroMatricula: item.numeroMatricula,

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

      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<RepresentanteModel.RawRef[], Ref[]>
} = {
  output: response => {
    const convertedResource = response.map<Ref>(item => ({
      id: item.id,
      title: item.apellido,
    }))

    return convertedResource
  },
}

export const getOne: {
  output: OutputAdapter<RepresentanteModel.RawEntity, RepresentanteModel.Entity>
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      cuil: response.cuil,
      apellido: response.apellido,
      nombre: response.nombre,
      direccion: response.direccion,
      numeroMatricula: response.numeroMatricula,

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

      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<
    RepresentanteModel.CreateData,
    RepresentanteModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: RepresentanteModel.CreateBody = {
      cuil: data.cuil,
      apellido: data.apellido,
      nombre: data.nombre,
      direccion: data.direccion,
      numeroMatricula: data.numeroMatricula,

      paisId: data.paisId,
      provinciaId: data.provinciaId,
      localidadId: data.localidadId,
    }

    return convertedResource
  },
}
