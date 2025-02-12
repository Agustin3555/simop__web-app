import {
  convert,
  convertList,
  InputAdapter,
  OutputAdapter,
} from '@/adapters/config'
import { TipoProfesionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    TipoProfesionModel.RawEntity[],
    TipoProfesionModel.Entity[]
  >
} = {
  output: response => {
    const conversion = convertList(response)

    return conversion
  },
}

export const getForConnect: {
  output: OutputAdapter<TipoProfesionModel.RawRef[], TipoProfesionModel.Ref[]>
} = {
  output: response => {
    const conversion = convertList(response)

    return conversion
  },
}

export const getOne: {
  output: OutputAdapter<TipoProfesionModel.RawEntity, TipoProfesionModel.Entity>
} = {
  output: response => {
    const conversion = convert(response)

    return conversion
  },
}

export const create: {
  input: InputAdapter<
    TipoProfesionModel.CreateData,
    TipoProfesionModel.CreateBody
  >
} = {
  input: data => {
    const conversion = convert(data)

    return conversion
  },
}
