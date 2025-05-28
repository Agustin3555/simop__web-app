import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { DepartamentoModel } from '.'

const getAll: {
  output: OutputAdapter<DepartamentoModel.Entity[], DepartamentoModel.Entity[]>
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<DepartamentoModel.Ref[], DepartamentoModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<DepartamentoModel.Entity, DepartamentoModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    DepartamentoModel.CreateEntity,
    DepartamentoModel.CreateEntity
  >
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<
    DepartamentoModel.UpdateEntity,
    DepartamentoModel.UpdateEntity
  >
} = {
  input: data => data,
}

export const DepartamentoAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
