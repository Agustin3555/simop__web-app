import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { EmpresaModel } from '../models'
import { Ref } from '../types'

export const getAll: {
  output: OutputAdapter<EmpresaModel.RawEntity[], EmpresaModel.Entity[]>
} = {
  output: response => {
    const convertedResource = response.map<EmpresaModel.Entity>(item => ({
      id: item.id,
      cuitEmpresa: item.cuitEmpresa,
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
  output: OutputAdapter<EmpresaModel.RawRef[], Ref[]>
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
  output: OutputAdapter<EmpresaModel.RawEntity, EmpresaModel.Entity>
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      cuitEmpresa: response.cuitEmpresa,
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
  input: InputAdapter<EmpresaModel.CreateData, EmpresaModel.CreateBody>
} = {
  input: data => {
    const convertedResource: EmpresaModel.CreateBody = {
      cuitEmpresa: data.cuitEmpresa,
      nombreEmpresa: data.nombreEmpresa,
      direccionDeclarada: data.direccionDeclarada,
      paisId: data.paisId,
      email: data.email,
      numeroContacto: data.numeroContacto,
      provinciaId: data.provinciaId,
      localidadId: data.localidadId,
    }

    return convertedResource
  },
}
