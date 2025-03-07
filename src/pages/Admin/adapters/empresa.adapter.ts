import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { EmpresaModel } from '../models'

export const getAll: {
  output: OutputAdapter<EmpresaModel.RawEntity[], EmpresaModel.Entity[]>
} = {
  output: response => response,
}

export const getForConnect: {
  output: OutputAdapter<EmpresaModel.RawRef[], EmpresaModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<EmpresaModel.RawEntity, EmpresaModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<EmpresaModel.CreateData, EmpresaModel.CreateBody>
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<EmpresaModel.UpdateData, EmpresaModel.UpdateBody>
} = {
  input: data => data,
}
