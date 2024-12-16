import { publicInstance } from '@/services/config'
import { TipoContratacionObraModel } from '../models'
import { TipoContratacionObraAdapter } from '../adapters'

const collection = '/tipos-contrataciones-obra'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return TipoContratacionObraAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return TipoContratacionObraAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return TipoContratacionObraAdapter.getOne.output(response.data)
}

export const create = async (data: TipoContratacionObraModel.CreateData) => {
  const adaptedInput = TipoContratacionObraAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
