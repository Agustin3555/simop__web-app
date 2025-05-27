import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { DireccionModel } from '.'

export const getAll: {
  output: OutputAdapter<DireccionModel.Entity[], DireccionModel.Entity[]>
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<DireccionModel.Ref[], DireccionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<DireccionModel.Entity, DireccionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<DireccionModel.CreateEntity, DireccionModel.CreateEntity>
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<DireccionModel.UpdateEntity, DireccionModel.UpdateEntity>
} = {
  input: data => data,
}
