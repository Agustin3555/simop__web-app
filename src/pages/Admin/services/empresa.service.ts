import { publicInstance } from '@/services/config'
import { EmpresaModel } from '../models'
import { EmpresaAdapter } from '../adapters'

const collection = '/empresas'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return EmpresaAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return EmpresaAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return EmpresaAdapter.getOne.output(response.data)
}

export const create = async (data: EmpresaModel.CreateData) => {
  const adaptedInput = EmpresaAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
