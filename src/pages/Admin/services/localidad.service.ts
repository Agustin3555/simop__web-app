import { publicInstance } from '@/services/config'
import { LocalidadModel } from '../models'
import { LocalidadAdapter } from '../adapters'

const collection = '/localidades'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return LocalidadAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return LocalidadAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return LocalidadAdapter.getOne.output(response.data)
}

export const create = async (data: LocalidadModel.CreateData) => {
  const adaptedInput = LocalidadAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
