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
  output: OutputAdapter<DepartamentoModel.Entity, DepartamentoModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    DepartamentoModel.UpdateEntity,
    DepartamentoModel.UpdateEntity
  >
  output: OutputAdapter<DepartamentoModel.Entity, DepartamentoModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const DepartamentoAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
