import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { AmpliacionModel } from '../models'

export const getAll: {
  output: OutputAdapter<AmpliacionModel.RawEntity[], AmpliacionModel.Entity[]>
} = {
  output: response => response,
}

export const getForConnect: {
  output: OutputAdapter<AmpliacionModel.RawRef[], AmpliacionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<AmpliacionModel.RawEntity, AmpliacionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<AmpliacionModel.CreateData, AmpliacionModel.CreateBody>
} = {
  input: data => data,
}
export const updateOne: {
  input: InputAdapter<AmpliacionModel.UpdateData, AmpliacionModel.UpdateBody>
} = {
  input: data => data,
}
