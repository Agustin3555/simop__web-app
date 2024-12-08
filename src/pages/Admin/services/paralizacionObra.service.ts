import { publicInstance } from '@/services/config'
import { ParalizacionObraModel } from '../models'
import { ParalizacionObraAdapter } from '../adapters'

const collection = '/tipo-paralizaciones-obras'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return ParalizacionObraAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return ParalizacionObraAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return ParalizacionObraAdapter.getOne.output(response.data)
}

export const create = async (data:ParalizacionObraModel.CreateData) => {
  const adaptedInput =ParalizacionObraAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
