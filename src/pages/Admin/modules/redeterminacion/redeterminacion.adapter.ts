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
  output: OutputAdapter<
    RedeterminacionModel.Entity,
    RedeterminacionModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    RedeterminacionModel.UpdateEntity,
    RedeterminacionModel.UpdateEntity
  >
  output: OutputAdapter<
    RedeterminacionModel.Entity,
    RedeterminacionModel.Entity
  >
} = {
  input: data => data,
  output: response => response,
}

export const RedeterminacionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
