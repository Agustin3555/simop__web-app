import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { DireccionModel } from '.'

const getAll: {
  output: OutputAdapter<DireccionModel.Entity[], DireccionModel.Entity[]>
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<DireccionModel.Ref[], DireccionModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<DireccionModel.Entity, DireccionModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<DireccionModel.CreateEntity, DireccionModel.CreateEntity>
  output: OutputAdapter<DireccionModel.Entity, DireccionModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<DireccionModel.UpdateEntity, DireccionModel.UpdateEntity>
  output: OutputAdapter<DireccionModel.Entity, DireccionModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const DireccionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
