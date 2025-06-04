import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { PaisModel } from '.'

const getAll: {
  output: OutputAdapter<PaisModel.Entity[], PaisModel.Entity[]>
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<PaisModel.Ref[], PaisModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<PaisModel.Entity, PaisModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<PaisModel.CreateEntity, PaisModel.CreateEntity>
  output: OutputAdapter<PaisModel.Entity, PaisModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<PaisModel.UpdateEntity, PaisModel.UpdateEntity>
  output: OutputAdapter<PaisModel.Entity, PaisModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const PaisAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
