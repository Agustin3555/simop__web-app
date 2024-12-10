import { publicInstance } from '@/services/config'
import { ObraModel } from '../models'
import { ObraAdapter } from '../adapters'

const collection = '/obras'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return ObraAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return ObraAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return ObraAdapter.getOne.output(response.data)
}

export const create = async (data: ObraModel.CreateData) => {
  const adaptedInput = ObraAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
