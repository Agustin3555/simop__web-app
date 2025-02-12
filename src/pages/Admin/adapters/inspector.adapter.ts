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
  output: response => {
    const conversion = convertList(response, acc => ({
      profesiones: TipoProfesionAdapter.getForConnect.output(acc.profesiones),
    }))

    return conversion
  },
}

export const getForConnect: {
  output: OutputAdapter<InspectorModel.RawRef[], InspectorModel.Ref[]>
} = {
  output: response => {
    const conversion = convertList(response)

    return conversion
  },
}

export const getOne: {
  output: OutputAdapter<InspectorModel.RawEntity, InspectorModel.Entity>
} = {
  output: response => {
    const conversion = convert(response, acc => ({
      profesiones: TipoProfesionAdapter.getForConnect.output(acc.profesiones),
    }))

    return conversion
  },
}

export const create: {
  input: InputAdapter<InspectorModel.CreateData, InspectorModel.CreateBody>
} = {
  input: data => {
    const conversion = convert(data)

    return conversion
  },
}
