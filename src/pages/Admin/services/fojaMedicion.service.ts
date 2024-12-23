import { publicInstance } from '@/services/config'
import { FojaMedicionModel } from '../models'
import { FojaMedicionAdapter } from '../adapters'

const collection = '/foja-mediciones'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return FojaMedicionAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return FojaMedicionAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return FojaMedicionAdapter.getOne.output(response.data)
}

export const create = async (data: FojaMedicionModel.CreateData) => {
  const adaptedInput = FojaMedicionAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
