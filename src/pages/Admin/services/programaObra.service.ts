import { publicInstance } from '@/services/config'
import { ProgramaObraModel } from '../models'
import { ProgramaObraAdapter } from '../adapters'

const collection = '/tipos-programas-obras'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return ProgramaObraAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return ProgramaObraAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return ProgramaObraAdapter.getOne.output(response.data)
}

export const create = async (data: ProgramaObraModel.CreateData) => {
  const adaptedInput = ProgramaObraAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
