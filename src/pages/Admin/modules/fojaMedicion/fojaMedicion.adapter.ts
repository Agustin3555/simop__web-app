import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { FojaMedicionModel } from '.'

const getAll: {
  output: OutputAdapter<FojaMedicionModel.Entity[], FojaMedicionModel.Entity[]>
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<FojaMedicionModel.Ref[], FojaMedicionModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<FojaMedicionModel.Entity, FojaMedicionModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    FojaMedicionModel.CreateEntity,
    FojaMedicionModel.CreateEntity
  >
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<
    FojaMedicionModel.UpdateEntity,
    FojaMedicionModel.UpdateEntity
  >
} = {
  input: data => data,
}

export const FojaMedicionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
