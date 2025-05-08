import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RepresentanteModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    RepresentanteModel.Entity[],
    RepresentanteModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<RepresentanteModel.Ref[], RepresentanteModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<RepresentanteModel.Entity, RepresentanteModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    RepresentanteModel.CreateEntity,
    RepresentanteModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    RepresentanteModel.UpdateEntity,
    RepresentanteModel.UpdateEntity
  >
} = {
  input: data => data,
}
