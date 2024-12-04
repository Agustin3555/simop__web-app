import { publicInstance } from '@/services/config'
import { ModificacionObraModel } from '../models'
import { ModificacionObraAdapter } from '../adapters'

const collection = '/modificaciones-obras'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return ModificacionObraAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return ModificacionObraAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return ModificacionObraAdapter.getOne.output(response.data)
}

export const create = async (data:ModificacionObraModel.CreateData) => {
  const adaptedInput =ModificacionObraAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
