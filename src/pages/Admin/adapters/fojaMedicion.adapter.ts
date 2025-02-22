import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { FojaMedicionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    FojaMedicionModel.RawEntity[],
    FojaMedicionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getForConnect: {
  output: OutputAdapter<FojaMedicionModel.RawRef[], FojaMedicionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<FojaMedicionModel.RawEntity, FojaMedicionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    FojaMedicionModel.CreateData,
    FojaMedicionModel.CreateBody
  >
} = {
  input: data => data,
}
