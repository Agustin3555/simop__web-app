import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { CertificacionModel } from '../models'

export const getAll: {
  output: OutputAdapter<
    CertificacionModel.RawEntity[],
    CertificacionModel.Entity[]
  >
} = {
  output: response => response,
}

export const getForConnect: {
  output: OutputAdapter<CertificacionModel.RawRef[], CertificacionModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<CertificacionModel.RawEntity, CertificacionModel.Entity>
} = {
  output: response => response,
}

export const create: {
  input: InputAdapter<
    CertificacionModel.CreateData,
    CertificacionModel.CreateBody
  >
} = {
  input: data => data,
}
export const updateOne: {
  input: InputAdapter<
    CertificacionModel.UpdateData,
    CertificacionModel.UpdateBody
  >
} = {
  input: data => data,
}
