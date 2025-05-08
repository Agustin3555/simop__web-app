import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { DepartamentoModel } from '../models'

export const getAll: {
  output: OutputAdapter<DepartamentoModel.Entity[], DepartamentoModel.Entity[]>
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<DepartamentoModel.Ref[], DepartamentoModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<DepartamentoModel.Entity, DepartamentoModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    DepartamentoModel.CreateEntity,
    DepartamentoModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    DepartamentoModel.UpdateEntity,
    DepartamentoModel.UpdateEntity
  >
} = {
  input: data => data,
}
