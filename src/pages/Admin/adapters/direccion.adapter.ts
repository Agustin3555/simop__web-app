import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { DireccionModel } from '../models'
import { Ref } from '@/types'

export const getAll: {
  output: OutputAdapter<DireccionModel.RawEntity[], DireccionModel.Entity[]>
} = {
  output: response => {
    const convertedResource = response.map<DireccionModel.Entity>(item => ({
      id: item.id,
      nombre: item.nombre,

      subSecretaria: item.subSecretaria && {
        id: item.subSecretaria.id,
        title: item.subSecretaria.nombre,
      },

      creado: item.creado,
      modificado: item.modificado,
    }))

    return convertedResource
  },
}

export const getForConnect: {
  output: OutputAdapter<DireccionModel.RawRef[], Ref[]>
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
  output: OutputAdapter<DireccionModel.RawEntity, DireccionModel.Entity>
} = {
  output: response => {
    const convertedResource = {
      id: response.id,
      nombre: response.nombre,

      subSecretaria: response.subSecretaria && {
        id: response.subSecretaria.id,
        title: response.subSecretaria.nombre,
      },

      creado: response.creado,
      modificado: response.modificado,
    }

    return convertedResource
  },
}

export const create: {
  input: InputAdapter<DireccionModel.CreateData, DireccionModel.CreateBody>
} = {
  input: data => {
    const convertedResource: DireccionModel.CreateBody = {
      nombre: data.nombre,

      subSecretariaId: data.subSecretariaId,
    }

    return convertedResource
  },
}
