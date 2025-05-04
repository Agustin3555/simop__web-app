import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { DepartamentoModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    DepartamentoModel.RawEntity[],
    DepartamentoModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<DepartamentoModel.RawRef[], DepartamentoModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<DepartamentoModel.RawEntity, DepartamentoModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    DepartamentoModel.CreateEntity,
    DepartamentoModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    DepartamentoModel.UpdateEntity,
    DepartamentoModel.UpdateBody
  >
} = {
  input: data => data,
}
