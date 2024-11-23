import { AppError, publicInstance } from '@/services/config'
import { DireccionModel } from '../models'
import { DireccionAdapter } from '../adapters'

const collection = '/direcciones'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  if (!response || response instanceof AppError)
    return response as unknown as AppError

  return DireccionAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  if (!response || response instanceof AppError)
    return response as unknown as AppError

  return DireccionAdapter.getForConnect.output(response.data)
}

export const create = async (data: DireccionModel.CreateUpdateData) => {
  const adaptedInput = DireccionAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  if (!response || response instanceof AppError)
    return response as unknown as AppError

  return true
}

export const update = async (data: DireccionModel.CreateUpdateData) => {
  const adaptedInput = DireccionAdapter.update.input(data)

  const response = await publicInstance.put(collection, adaptedInput)

  if (!response || response instanceof AppError)
    return response as unknown as AppError

  return true
}
