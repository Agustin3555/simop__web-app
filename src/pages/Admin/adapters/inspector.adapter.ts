import {
  convert,
  convertList,
  InputAdapter,
  OutputAdapter,
} from '@/adapters/config'
import { InspectorModel } from '../models'
import { TipoProfesionAdapter } from '.'

export const getAll: {
  output: OutputAdapter<InspectorModel.RawEntity[], InspectorModel.Entity[]>
} = {
  output: response =>
    convertList(response, ['profesiones'], acc => ({
      profesiones: TipoProfesionAdapter.getForConnect.output(acc.profesiones),
    })),
}

export const getForConnect: {
  output: OutputAdapter<InspectorModel.RawRef[], InspectorModel.Ref[]>
} = {
  output: response => response,
}

export const getOne: {
  output: OutputAdapter<InspectorModel.RawEntity, InspectorModel.Entity>
} = {
  output: response =>
    convert(response, ['profesiones'], acc => ({
      profesiones: TipoProfesionAdapter.getForConnect.output(acc.profesiones),
    })),
}

export const create: {
  input: InputAdapter<InspectorModel.CreateData, InspectorModel.CreateBody>
} = {
  input: data => data,
}
