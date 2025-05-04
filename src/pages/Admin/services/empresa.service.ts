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

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return EmpresaAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return EmpresaAdapter.getOne.output(response.data)
  },

  create: async (data: EmpresaModel.CreateEntity) => {
    const adaptedInput = EmpresaAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: EmpresaModel.UpdateEntity) => {
    const adaptedInput = EmpresaAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
