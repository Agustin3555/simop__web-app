import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ModificacionModel } from '.'

export const getAll: {
  output: OutputAdapter<ModificacionModel.Entity[], ModificacionModel.Entity[]>
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<ModificacionModel.Ref[], ModificacionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<ModificacionModel.Entity, ModificacionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    ModificacionModel.CreateEntity,
    ModificacionModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    ModificacionModel.UpdateEntity,
    ModificacionModel.UpdateEntity
  >
} = {
  input: data => data,
}
