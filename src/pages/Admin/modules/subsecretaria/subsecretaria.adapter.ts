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
  output: OutputAdapter<SubsecretariaModel.Entity, SubsecretariaModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    SubsecretariaModel.UpdateEntity,
    SubsecretariaModel.UpdateEntity
  >
  output: OutputAdapter<SubsecretariaModel.Entity, SubsecretariaModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const SubsecretariaAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
