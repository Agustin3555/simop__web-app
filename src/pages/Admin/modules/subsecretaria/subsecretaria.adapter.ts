import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { SubsecretariaModel } from '.'

export const getAll: {
  output: OutputAdapter<
    SubsecretariaModel.Entity[],
    SubsecretariaModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<SubsecretariaModel.Ref[], SubsecretariaModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<SubsecretariaModel.Entity, SubsecretariaModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    SubsecretariaModel.CreateEntity,
    SubsecretariaModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    SubsecretariaModel.UpdateEntity,
    SubsecretariaModel.UpdateEntity
  >
} = {
  input: data => data,
}
