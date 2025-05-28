import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { SubsecretariaModel } from '.'

const getAll: {
  output: OutputAdapter<
    SubsecretariaModel.Entity[],
    SubsecretariaModel.Entity[]
  >
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<SubsecretariaModel.Ref[], SubsecretariaModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<SubsecretariaModel.Entity, SubsecretariaModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    SubsecretariaModel.CreateEntity,
    SubsecretariaModel.CreateEntity
  >
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<
    SubsecretariaModel.UpdateEntity,
    SubsecretariaModel.UpdateEntity
  >
} = {
  input: data => data,
}

export const SubsecretariaAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
