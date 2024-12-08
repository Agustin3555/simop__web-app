import { publicInstance } from '@/services/config'
import { TipoInspectorModel } from '../models'
import { TipoInspectorAdapter } from '../adapters'

const collection = '/tipos-inspectores'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return TipoInspectorAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return TipoInspectorAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return TipoInspectorAdapter.getOne.output(response.data)
}

export const create = async (data:TipoInspectorModel.CreateData) => {
  const adaptedInput =TipoInspectorAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
