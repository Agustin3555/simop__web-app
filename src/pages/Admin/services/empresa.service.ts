import { publicInstance, Service } from '@/services/config'
import { EmpresaModel } from '../models'
import { EmpresaAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('empresas')

export const EmpresaService: Service<EmpresaModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return EmpresaAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return EmpresaAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return EmpresaAdapter.getOne.output(response.data)
  },

  create: async (data: EmpresaModel.CreateData) => {
    const adaptedInput = EmpresaAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
