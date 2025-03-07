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

export const getForConnect: {
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
    DepartamentoModel.CreateData,
    DepartamentoModel.CreateBody
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    DepartamentoModel.UpdateData,
    DepartamentoModel.UpdateBody
  >
} = {
  input: data => data,
}
