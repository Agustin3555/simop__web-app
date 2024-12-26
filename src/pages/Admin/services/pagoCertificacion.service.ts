import { publicInstance } from '@/services/config'
import { PagoCertificacionModel } from '../models'
import { PagoCertificacionAdapter } from '../adapters'

const collection = '/pagos-certificaciones'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return PagoCertificacionAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return PagoCertificacionAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return PagoCertificacionAdapter.getOne.output(response.data)
}

export const create = async (data: PagoCertificacionModel.CreateData) => {
  const adaptedInput = PagoCertificacionAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
