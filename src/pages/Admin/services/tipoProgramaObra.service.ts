import { publicInstance, Service } from '@/services/config'
import { TipoProgramaObraModel } from '../models'
import { TipoProgramaObraAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('tipos-programas-obra')

export const TipoProgramaObraService: Service<TipoProgramaObraModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoProgramaObraAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return TipoProgramaObraAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoProgramaObraAdapter.getOne.output(response.data)
  },

  create: async (data: TipoProgramaObraModel.CreateData) => {
    const adaptedInput = TipoProgramaObraAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: TipoProgramaObraModel.UpdateData) => {
    const adaptedInput = TipoProgramaObraAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
