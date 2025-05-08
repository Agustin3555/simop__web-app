import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { AmpliacionModel } from '../models'

export const getAll: {
  output: OutputAdapter<AmpliacionModel.Entity[], AmpliacionModel.Entity[]>
} = {
  output: response => response,
}

export const getRefs: {
  output: OutputAdapter<AmpliacionModel.Ref[], AmpliacionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<AmpliacionModel.Entity, AmpliacionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    AmpliacionModel.CreateEntity,
    AmpliacionModel.CreateEntity
  >
} = {
  input: data => data,
}

export const updateOne: {
  input: InputAdapter<
    AmpliacionModel.UpdateEntity,
    AmpliacionModel.UpdateEntity
  >
} = {
  input: data => data,
}
