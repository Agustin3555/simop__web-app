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
  output: OutputAdapter<ObraModel.Entity, ObraModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<ObraModel.UpdateEntity, ObraModel.UpdateEntity>
  output: OutputAdapter<ObraModel.Entity, ObraModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const ObraAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
