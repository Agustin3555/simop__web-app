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
  output: OutputAdapter<AmpliacionModel.Entity, AmpliacionModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<
    AmpliacionModel.UpdateEntity,
    AmpliacionModel.UpdateEntity
  >
  output: OutputAdapter<AmpliacionModel.Entity, AmpliacionModel.Entity>
} = {
  input: data => data,
  output: response => response,
}

export const AmpliacionAdapter = {
  getAll,
  getRefs,
  getOne,
  create,
  updateOne,
}
