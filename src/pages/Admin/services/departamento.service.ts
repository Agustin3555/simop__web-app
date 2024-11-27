import { publicInstance } from '@/services/config'
import { DepartamentoModel } from '../models'
import { DepartamentoAdapter } from '../adapters'

const collection = '/departamentos'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return DepartamentoAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return DepartamentoAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return DepartamentoAdapter.getOne.output(response.data)
}

export const create = async (data: DepartamentoModel.CreateData) => {
  const adaptedInput = DepartamentoAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
