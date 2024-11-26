import { AppError, publicInstance } from '@/services/config'
import { DepartamentoModel } from '../models'
import { DepartamentoAdapter } from '../adapters'

const collection = '/departamentos'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  if (!response || response instanceof AppError)
    return response as unknown as AppError

  return DepartamentoAdapter.getAll.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  if (!response || response instanceof AppError)
    return response as unknown as AppError

  return DepartamentoAdapter.getOne.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  if (!response || response instanceof AppError)
    return response as unknown as AppError

  return DepartamentoAdapter.getForConnect.output(response.data)
}

export const create = async (data: DepartamentoModel.CreateUpdateData) => {
  const adaptedInput = DepartamentoAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  if (!response || response instanceof AppError)
    return response as unknown as AppError

  return true
}

export const update = async (data: DepartamentoModel.CreateUpdateData) => {
  const adaptedInput = DepartamentoAdapter.update.input(data)

  const response = await publicInstance.put(collection, adaptedInput)

  if (!response || response instanceof AppError)
    return response as unknown as AppError

  return true
}
