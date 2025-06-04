import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RecepcionModel } from '.'

const getAll: {
  output: OutputAdapter<RecepcionModel.Entity[], RecepcionModel.Entity[]>
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<RecepcionModel.Ref[], RecepcionModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<RecepcionModel.Entity, RecepcionModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<RecepcionModel.CreateEntity, RecepcionModel.CreateEntity>
  output: OutputAdapter<RecepcionModel.Entity, RecepcionModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<RecepcionModel.UpdateEntity, RecepcionModel.UpdateEntity>
  output: OutputAdapter<RecepcionModel.Entity, RecepcionModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const RecepcionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
