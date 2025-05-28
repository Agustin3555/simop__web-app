import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { EmpresaModel } from '.'

const getAll: {
  output: OutputAdapter<EmpresaModel.Entity[], EmpresaModel.Entity[]>
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<EmpresaModel.Ref[], EmpresaModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<EmpresaModel.Entity, EmpresaModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<EmpresaModel.CreateEntity, EmpresaModel.CreateEntity>
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<EmpresaModel.UpdateEntity, EmpresaModel.UpdateEntity>
} = {
  input: data => data,
}

export const EmpresaAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
