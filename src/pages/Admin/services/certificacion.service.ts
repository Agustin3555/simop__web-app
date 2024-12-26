import { publicInstance } from '@/services/config'
import { CertificacionModel } from '../models'
import { CertificacionAdapter } from '../adapters'

const collection = '/certificaciones'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return CertificacionAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return CertificacionAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return CertificacionAdapter.getOne.output(response.data)
}

export const create = async (data: CertificacionModel.CreateData) => {
  const adaptedInput = CertificacionAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
