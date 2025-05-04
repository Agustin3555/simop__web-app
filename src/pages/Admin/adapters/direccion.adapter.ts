import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { DireccionModel } from '../models'

export const getAll: {
  output: OutputAdapter<DireccionModel.RawEntity[], DireccionModel.Entity[]>
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<DireccionModel.RawRef[], DireccionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<DireccionModel.RawEntity, DireccionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<DireccionModel.CreateEntity, DireccionModel.CreateBody>
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<DireccionModel.UpdateEntity, DireccionModel.UpdateBody>
} = {
  input: data => data,
}
