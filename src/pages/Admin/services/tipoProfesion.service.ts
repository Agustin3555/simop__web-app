import { publicInstance } from '@/services/config'
import { TipoProfesionModel } from '../models'
import { TipoProfesionAdapter } from '../adapters'

const collection = '/tipos-profesiones'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return TipoProfesionAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return TipoProfesionAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return TipoProfesionAdapter.getOne.output(response.data)
}

export const create = async (data: TipoProfesionModel.CreateData) => {
  const adaptedInput = TipoProfesionAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
