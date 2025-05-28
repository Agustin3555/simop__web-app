import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { AmpliacionModel } from '.'

const getAll: {
  output: OutputAdapter<AmpliacionModel.Entity[], AmpliacionModel.Entity[]>
} = {
  output: response => response,
}

const getRefs: {
  output: OutputAdapter<AmpliacionModel.Ref[], AmpliacionModel.Ref[]>
} = {
  output: response => response,
}

const getOne: {
  output: OutputAdapter<AmpliacionModel.Entity, AmpliacionModel.Entity>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<
    AmpliacionModel.CreateEntity,
    AmpliacionModel.CreateEntity
  >
} = {
  input: data => data,
}

const updateOne: {
  input: InputAdapter<
    AmpliacionModel.UpdateEntity,
    AmpliacionModel.UpdateEntity
  >
} = {
  input: data => data,
}

export const AmpliacionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
