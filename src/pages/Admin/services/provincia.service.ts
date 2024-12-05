import { publicInstance } from '@/services/config'
import { ProvinciaModel } from '../models'
import { ProvinciaAdapter } from '../adapters'

const collection = '/provincias'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return ProvinciaAdapter.getAll.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return ProvinciaAdapter.getOne.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return ProvinciaAdapter.getForConnect.output(response.data)
}

export const create = async (data: ProvinciaModel.CreateData) => {
  const adaptedInput = ProvinciaAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
