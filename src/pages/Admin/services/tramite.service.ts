import { publicInstance } from '@/services/config'
import { TramiteModel } from '../models'
import { TramiteAdapter } from '../adapters'

const collection = '/tramites'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return TramiteAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return TramiteAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return TramiteAdapter.getOne.output(response.data)
}

export const create = async (data:TramiteModel.CreateData) => {
  const adaptedInput =TramiteAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
