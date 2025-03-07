import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ObraModel } from '../models'

export const getAll: {
  output: OutputAdapter<ObraModel.RawEntity[], ObraModel.Entity[]>
} = {
  output: response => response,
}

export const getForConnect: {
  output: OutputAdapter<ObraModel.RawRef[], ObraModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<ObraModel.RawEntity, ObraModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<ObraModel.CreateData, ObraModel.CreateBody>
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<ObraModel.UpdateData, ObraModel.UpdateBody>
} = {
  input: data => data,
}
