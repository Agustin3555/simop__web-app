import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { PaisModel } from '.'

export const getAll: {
  output: OutputAdapter<PaisModel.Entity[], PaisModel.Entity[]>
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<PaisModel.Ref[], PaisModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<PaisModel.Entity, PaisModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<PaisModel.CreateEntity, PaisModel.CreateEntity>
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<PaisModel.UpdateEntity, PaisModel.UpdateEntity>
} = {
  input: data => data,
}
