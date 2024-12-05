import { publicInstance } from '@/services/config'
import { InspectorModel } from '../models'
import { InspectorAdapter } from '../adapters'

const collection = '/inspectores'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return InspectorAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return InspectorAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return InspectorAdapter.getOne.output(response.data)
}

export const create = async (data:InspectorModel.CreateData) => {
  const adaptedInput =InspectorAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
