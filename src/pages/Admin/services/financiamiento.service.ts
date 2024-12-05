import { publicInstance } from '@/services/config'
import { FinanciamientoModel } from '../models'
import { FinanciamientoAdapter } from '../adapters'

const collection = '/financiamientos'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return FinanciamientoAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return FinanciamientoAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return FinanciamientoAdapter.getOne.output(response.data)
}

export const create = async (data: FinanciamientoModel.CreateData) => {
  const adaptedInput = FinanciamientoAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
