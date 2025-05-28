import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ObraModel } from '.'

const getAll: {
  output: OutputAdapter<ObraModel.Entity[], ObraModel.Entity[]>
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<ObraModel.Ref[], ObraModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<ObraModel.Entity, ObraModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<ObraModel.CreateEntity, ObraModel.CreateEntity>
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<ObraModel.UpdateEntity, ObraModel.UpdateEntity>
} = {
  input: data => data,
}

export const ObraAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
