import { AppError, publicInstance } from '@/services/config'
import { SubSecretariaModel } from '../models'
import { SubSecretariaAdapter } from '../adapters'

const collection = '/sub-secretarias'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  if (!response || response instanceof AppError)
    return response as unknown as AppError

  return SubSecretariaAdapter.getAll.output(response.data)
}

export const create = async (data: SubSecretariaModel.CreateData) => {
  const adaptedInput = SubSecretariaAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  if (!response || response instanceof AppError)
    return response as unknown as AppError

  return true
}

export const update = async (data: SubSecretariaModel.UpdateData) => {
  const adaptedInput = SubSecretariaAdapter.update.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  if (!response || response instanceof AppError)
    return response as unknown as AppError

  return true
}
