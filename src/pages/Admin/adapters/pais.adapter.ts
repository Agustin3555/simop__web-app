import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { PaisModel } from '../models'

export const getAll: {
  output: OutputAdapter<PaisModel.RawEntity[], PaisModel.Entity[]>
} = {
  output: response => response,
}

export const getForConnect: {
  output: OutputAdapter<PaisModel.RawRef[], PaisModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<PaisModel.RawEntity, PaisModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<PaisModel.CreateData, PaisModel.CreateBody>
} = {
  input: data => data,
}
export const updateOne: {
  input: InputAdapter<PaisModel.UpdateData, PaisModel.UpdateBody>
} = {
  input: data => data,
}
