import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { InspectorModel } from '../models'
import { Ref } from '../types'

export const getAll: {
  output: OutputAdapter<InspectorModel.RawEntity[], InspectorModel.Entity[]>
} = {
  output: response => {
    const convertedResource = response.map<InspectorModel.Entity>(item => ({
      id: item.id,
      cuil: item.cuil,
      apellido: item.apellido,
      nombre: item.nombre,
      tiposProfesiones: item.tiposProfesiones.map<Ref>(item => ({
        id: item.id,
        title: item.nombre,
      })),
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<InspectorModel.RawRef[], Ref[]>
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
  output: OutputAdapter<InspectorModel.RawEntity, InspectorModel.Entity>
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      cuil: response.cuil,
      apellido: response.apellido,
      nombre: response.nombre,
      tiposProfesiones: response.tiposProfesiones.map<Ref>(item => ({
        id: item.id,
        title: item.nombre,
      })),
      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<InspectorModel.CreateData, InspectorModel.CreateBody>
} = {
  input: data => {
    const convertedResource: InspectorModel.CreateBody = {
      cuil: data.cuil,
      apellido: data.apellido,
      nombre: data.nombre,
      tiposProfesiones: data?.tiposProfesiones,
    }

    return convertedResource
  },
}
