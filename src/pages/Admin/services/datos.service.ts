import { publicInstance } from '@/services/config'
import { DatosModel } from '../models'
import { DatosAdapter } from '../adapters'

const collection = '/datos'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return DatosAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return DatosAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return DatosAdapter.getOne.output(response.data)
}

export const create = async (data: DatosModel.CreateData) => {
  const adaptedInput = DatosAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
