import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { FojaMedicionModel } from '.'

export const getAll: {
  output: OutputAdapter<FojaMedicionModel.Entity[], FojaMedicionModel.Entity[]>
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<FojaMedicionModel.Ref[], FojaMedicionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<FojaMedicionModel.Entity, FojaMedicionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    FojaMedicionModel.CreateEntity,
    FojaMedicionModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    FojaMedicionModel.UpdateEntity,
    FojaMedicionModel.UpdateEntity
  >
} = {
  input: data => data,
}
