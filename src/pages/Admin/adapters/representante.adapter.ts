import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RepresentanteModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    RepresentanteModel.RawEntity[],
    RepresentanteModel.Entity[]
  >
} = {
  output: response => response,
}

export const getForConnect: {
  output: OutputAdapter<RepresentanteModel.RawRef[], RepresentanteModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<RepresentanteModel.RawEntity, RepresentanteModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    RepresentanteModel.CreateData,
    RepresentanteModel.CreateBody
  >
} = {
  input: data => data,
}
