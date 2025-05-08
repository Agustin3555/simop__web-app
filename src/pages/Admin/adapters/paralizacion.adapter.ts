import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ParalizacionModel } from '../models'

export const getAll: {
  output: OutputAdapter<ParalizacionModel.Entity[], ParalizacionModel.Entity[]>
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<ParalizacionModel.Ref[], ParalizacionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<ParalizacionModel.Entity, ParalizacionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    ParalizacionModel.CreateEntity,
    ParalizacionModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    ParalizacionModel.UpdateEntity,
    ParalizacionModel.UpdateEntity
  >
} = {
  input: data => data,
}
