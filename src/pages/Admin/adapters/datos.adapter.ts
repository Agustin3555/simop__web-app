import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { DatosModel } from '../models'
import { Ref } from '../types'

export const getAll: {
  output: OutputAdapter<DatosModel.RawEntity[], DatosModel.Entity[]>
} = {
  output: response => {
    const convertedResource = response.map<DatosModel.Entity>(item => ({
      id: item.id,
      cuit: item.cuit,
      nombreEmpresa: item.nombreEmpresa,
      pais: item.pais && {
        id: item.pais.id, 
        title: item.pais.nombre,
      },
      direccionDeclarada: item.direccionDeclarada,
      email: item.email,
      numeroContacto: item.numeroContacto,
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<DatosModel.RawRef[], Ref[]>
} = {
  output: response => {
    const convertedResource = response.map<Ref>(item => ({
      id: item.id,
      title: item.nombreEmpresa,
    }))

    return convertedResource
  },
}

export const getOne: {
  output: OutputAdapter<DatosModel.RawEntity, DatosModel.Entity>
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      cuit: response.cuit,
      nombreEmpresa: response.nombreEmpresa,
      pais: response.pais && {
        id: response.pais.id,
        title: response.pais.nombre,
      },
      direccionDeclarada: response.direccionDeclarada,
      email: response.email,
      numeroContacto: response.numeroContacto,
      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<DatosModel.CreateData, DatosModel.CreateBody>
} = {
  input: data => {
    const convertedResource: DatosModel.CreateBody = {
      cuit: data.cuit,
      nombreEmpresa: data.nombreEmpresa,
      direccionDeclarada: data.direccionDeclarada,
      paisId: data.paisId,
      email: data.email,
      numeroContacto: data.numeroContacto,
    }

    return convertedResource
  },
}
