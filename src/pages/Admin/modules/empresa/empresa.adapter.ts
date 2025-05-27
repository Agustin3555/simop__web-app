import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { EmpresaModel } from '.'

export const getAll: {
  output: OutputAdapter<EmpresaModel.Entity[], EmpresaModel.Entity[]>
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<EmpresaModel.Ref[], EmpresaModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<EmpresaModel.Entity, EmpresaModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<EmpresaModel.CreateEntity, EmpresaModel.CreateEntity>
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<EmpresaModel.UpdateEntity, EmpresaModel.UpdateEntity>
} = {
  input: data => data,
}
