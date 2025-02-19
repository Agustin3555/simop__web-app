import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ParalizacionObraModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    ParalizacionObraModel.RawEntity[],
    ParalizacionObraModel.Entity[]
  >
} = {
  output: response => response,
}

export const getForConnect: {
  output: OutputAdapter<
    ParalizacionObraModel.RawRef[],
    ParalizacionObraModel.Ref[]
  >
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    ParalizacionObraModel.RawEntity,
    ParalizacionObraModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    ParalizacionObraModel.CreateData,
    ParalizacionObraModel.CreateBody
  >
} = {
  input: data => data,
}
