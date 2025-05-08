import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RecepcionModel } from '../models'

export const getAll: {
  output: OutputAdapter<RecepcionModel.Entity[], RecepcionModel.Entity[]>
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<RecepcionModel.Ref[], RecepcionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<RecepcionModel.Entity, RecepcionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<RecepcionModel.CreateEntity, RecepcionModel.CreateEntity>
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<RecepcionModel.UpdateEntity, RecepcionModel.UpdateEntity>
} = {
  input: data => data,
}
