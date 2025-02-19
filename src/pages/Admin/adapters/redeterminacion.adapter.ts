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

export const getForConnect: {
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
    RedeterminacionModel.CreateData,
    RedeterminacionModel.CreateBody
  >
} = {
  input: data => data,
}
