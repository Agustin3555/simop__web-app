import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { RedeterminacionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    RedeterminacionModel.Entity[],
    RedeterminacionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<RedeterminacionModel.Ref[], RedeterminacionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<
    RedeterminacionModel.Entity,
    RedeterminacionModel.Entity
  >
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    RedeterminacionModel.CreateEntity,
    RedeterminacionModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    RedeterminacionModel.UpdateEntity,
    RedeterminacionModel.UpdateEntity
  >
} = {
  input: data => data,
}
