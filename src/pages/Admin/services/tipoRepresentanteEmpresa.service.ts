import { publicInstance } from '@/services/config'
import { TipoRepresentanteEmpresaModel } from '../models'
import { TipoRepresentanteEmpresaAdapter } from '../adapters'

const collection = '/tipos-representantes-empresa'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return TipoRepresentanteEmpresaAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return TipoRepresentanteEmpresaAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return TipoRepresentanteEmpresaAdapter.getOne.output(response.data)
}

export const create = async (data: TipoRepresentanteEmpresaModel.CreateData) => {
  const adaptedInput = TipoRepresentanteEmpresaAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
