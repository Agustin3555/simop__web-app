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
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<RecepcionModel.UpdateEntity, RecepcionModel.UpdateEntity>
} = {
  input: data => data,
}

export const RecepcionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
