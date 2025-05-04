import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RecepcionModel } from '../models'

export const getAll: {
  output: OutputAdapter<RecepcionModel.RawEntity[], RecepcionModel.Entity[]>
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<RecepcionModel.RawRef[], RecepcionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<RecepcionModel.RawEntity, RecepcionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<RecepcionModel.CreateEntity, RecepcionModel.CreateBody>
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<RecepcionModel.UpdateEntity, RecepcionModel.UpdateBody>
} = {
  input: data => data,
}
