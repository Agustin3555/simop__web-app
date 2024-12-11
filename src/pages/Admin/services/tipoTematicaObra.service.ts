import { publicInstance } from '@/services/config'
import { TipoTematicaObraModel } from '../models'
import { TipoTematicaObraAdapter } from '../adapters'

const collection = '/tipos-tematicas-obras'

export const getAll = async () => {
  const response = await publicInstance.get(collection)

  return TipoTematicaObraAdapter.getAll.output(response.data)
}

export const getForConnect = async () => {
  const response = await publicInstance.get(`${collection}/for-connect`)

  return TipoTematicaObraAdapter.getForConnect.output(response.data)
}

export const getOne = async (id: number) => {
  const response = await publicInstance.get(`${collection}/${id}`)

  return TipoTematicaObraAdapter.getOne.output(response.data)
}

export const create = async (data: TipoTematicaObraModel.CreateData) => {
  const adaptedInput = TipoTematicaObraAdapter.create.input(data)

  const response = await publicInstance.post(collection, adaptedInput)

  return true
}
