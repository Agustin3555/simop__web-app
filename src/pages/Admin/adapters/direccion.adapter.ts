import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { DireccionModel } from '../models'

export const getAll: {
  output: OutputAdapter<DireccionModel.RawEntity[], DireccionModel.Entity[]>
} = {
  output: response => response,
}

export const getForConnect: {
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
  input: InputAdapter<DireccionModel.CreateData, DireccionModel.CreateBody>
} = {
  input: data => data,
}
export const updateOne: {
  input: InputAdapter<DireccionModel.UpdateData, DireccionModel.UpdateBody>
} = {
  input: data => data,
}
