import { publicInstance } from '@/services/config'
import { EstadoObraModel } from '../models'
import { EstadoObraAdapter } from '../adapters'

const collection = '/estado-obras'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return EstadoObraAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return EstadoObraAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return EstadoObraAdapter.getOne.output(response.data)
}

export const create = async (data: EstadoObraModel.CreateData) => {
  const adaptedInput = EstadoObraAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
