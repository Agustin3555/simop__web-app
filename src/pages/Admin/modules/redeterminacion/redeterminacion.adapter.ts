import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RedeterminacionModel } from '.'

const getAll: {
  output: OutputAdapter<
    RedeterminacionModel.Entity[],
    RedeterminacionModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<RedeterminacionModel.Ref[], RedeterminacionModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<
    RedeterminacionModel.Entity,
    RedeterminacionModel.Entity
  >
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    RedeterminacionModel.CreateEntity,
    RedeterminacionModel.CreateEntity
  >
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<
    RedeterminacionModel.UpdateEntity,
    RedeterminacionModel.UpdateEntity
  >
} = {
  input: data => data,
}

export const RedeterminacionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
