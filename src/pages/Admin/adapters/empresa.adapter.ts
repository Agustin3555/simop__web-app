import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { EmpresaModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<EmpresaModel.RawEntity[], EmpresaModel.Entity[]>
} = {
  output: response => {
    const convertedResource = response.map<EmpresaModel.Entity>(item => ({
      id: item.id,
      cuit: item.cuit,
      nombre: item.nombre,
      direccion: item.direccion,
      email: item.email,
      numeroContacto: item.numeroContacto,

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
  output: OutputAdapter<EmpresaModel.RawRef[], Ref[]>
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
  output: OutputAdapter<EmpresaModel.RawEntity, EmpresaModel.Entity>
} = {
  output: response => {
    const convertedResource: EmpresaModel.Entity = {
      id: response.id,
      cuit: response.cuit,
      nombre: response.nombre,
      direccion: response.direccion,
      email: response.email,
      numeroContacto: response.numeroContacto,

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
  input: InputAdapter<EmpresaModel.CreateData, EmpresaModel.CreateBody>
} = {
  input: data => {
    const convertedResource: EmpresaModel.CreateBody = {
      cuit: data.cuit,
      nombre: data.nombre,
      direccion: data.direccion,
      email: data.email,
      numeroContacto: data.numeroContacto,

      paisId: data.paisId,
      provinciaId: data.provinciaId,
      localidadId: data.localidadId,
    }

    return convertedResource
  },
}
