import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ObraModel } from '.'

export const getAll: {
  output: OutputAdapter<ObraModel.Entity[], ObraModel.Entity[]>
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<ObraModel.Ref[], ObraModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<ObraModel.Entity, ObraModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<ObraModel.CreateEntity, ObraModel.CreateEntity>
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<ObraModel.UpdateEntity, ObraModel.UpdateEntity>
} = {
  input: data => data,
}
