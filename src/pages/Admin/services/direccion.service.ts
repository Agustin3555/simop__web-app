import { publicInstance } from '@/services/config'
import { DireccionModel } from '../models'
import { DireccionAdapter } from '../adapters'

const collection = '/direcciones'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return DireccionAdapter.getAll.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return DireccionAdapter.getOne.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return DireccionAdapter.getForConnect.output(response.data)
}

export const create = async (data: DireccionModel.CreateData) => {
  const adaptedInput = DireccionAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
