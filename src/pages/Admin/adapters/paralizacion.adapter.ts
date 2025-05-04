import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ParalizacionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    ParalizacionModel.RawEntity[],
    ParalizacionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<ParalizacionModel.RawRef[], ParalizacionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<ParalizacionModel.RawEntity, ParalizacionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    ParalizacionModel.CreateEntity,
    ParalizacionModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    ParalizacionModel.UpdateEntity,
    ParalizacionModel.UpdateBody
  >
} = {
  input: data => data,
}
