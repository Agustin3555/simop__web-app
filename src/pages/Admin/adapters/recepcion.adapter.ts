import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RecepcionModel } from '../models'

export const getAll: {
  output: OutputAdapter<RecepcionModel.RawEntity[], RecepcionModel.Entity[]>
} = {
  output: response => response,
}

export const getForConnect: {
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
  input: InputAdapter<RecepcionModel.CreateData, RecepcionModel.CreateBody>
} = {
  input: data => data,
}
export const updateOne: {
  input: InputAdapter<RecepcionModel.UpdateData, RecepcionModel.UpdateBody>
} = {
  input: data => data,
}
