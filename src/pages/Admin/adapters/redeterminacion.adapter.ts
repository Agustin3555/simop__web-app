import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RedeterminacionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    RedeterminacionModel.RawEntity[],
    RedeterminacionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<
    RedeterminacionModel.RawRef[],
    RedeterminacionModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    RedeterminacionModel.RawEntity,
    RedeterminacionModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    RedeterminacionModel.CreateEntity,
    RedeterminacionModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    RedeterminacionModel.UpdateEntity,
    RedeterminacionModel.UpdateBody
  >
} = {
  input: data => data,
}
