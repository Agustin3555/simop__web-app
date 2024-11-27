import { publicInstance } from '@/services/config'
import { SubSecretariaModel } from '../models'
import { SubSecretariaAdapter } from '../adapters'

const collection = '/sub-secretarias'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return SubSecretariaAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return SubSecretariaAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return SubSecretariaAdapter.getOne.output(response.data)
}

export const create = async (data: SubSecretariaModel.CreateData) => {
  const adaptedInput = SubSecretariaAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
