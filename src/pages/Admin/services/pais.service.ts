import { publicInstance } from '@/services/config'
import {PaisModel } from '../models'
import { PaisAdapter } from '../adapters'

const collection = '/paises'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return PaisAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return PaisAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return PaisAdapter.getOne.output(response.data)
}

export const create = async (data: PaisModel.CreateData) => {
  const adaptedInput = PaisAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
