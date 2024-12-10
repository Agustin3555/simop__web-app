import { publicInstance } from '@/services/config'
import { RepresentanteEmpresaModel } from '../models'
import { RepresentanteEmpresaAdapter } from '../adapters'

const collection = '/representantes-empresas'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return RepresentanteEmpresaAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return RepresentanteEmpresaAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return RepresentanteEmpresaAdapter.getOne.output(response.data)
}

export const create = async (data:RepresentanteEmpresaModel.CreateData) => {
  const adaptedInput =RepresentanteEmpresaAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
