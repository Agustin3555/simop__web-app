//adaptador sirve para mostrar la informacion que trae la api en el front,
import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { PaisModel } from '../models'
import { Ref } from '../types'

export const getAll: {
  output: OutputAdapter<
    PaisModel.RawEntity[],
    PaisModel.Entity[]
  >
} = {
  output: response => {
    const convertedResource = response.map<PaisModel.Entity>(item => ({
      id: item.id,
      nombre: item.nombre,
      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<PaisModel.RawRef[], Ref[]>
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
  output: OutputAdapter<PaisModel.RawEntity, PaisModel.Entity>
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      nombre: response.nombre,
      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<
    PaisModel.CreateData,
    PaisModel.CreateBody
  >
} = {
  input: data => {
    const convertedResource: PaisModel.CreateBody = {
      nombre: data.nombre,
    }

    return convertedResource
  },
}
