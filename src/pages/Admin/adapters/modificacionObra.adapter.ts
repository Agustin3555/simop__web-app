import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { ModificacionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    ModificacionModel.RawEntity[],
    ModificacionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getForConnect: {
  output: OutputAdapter<ModificacionModel.RawRef[], ModificacionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<ModificacionModel.RawEntity, ModificacionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    ModificacionModel.CreateData,
    ModificacionModel.CreateBody
  >
} = {
  input: data => data,
}
