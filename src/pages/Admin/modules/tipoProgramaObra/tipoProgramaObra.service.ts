import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoProgramaObraAdapter, TipoProgramaObraModel } from '.'

const collection = buildPath('tipos-programas-obra')

export const TipoProgramaObraService: Service<TipoProgramaObraModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoProgramaObraAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return TipoProgramaObraAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoProgramaObraAdapter.getOne.output(response.data)
  },

  create: async (data: TipoProgramaObraModel.CreateEntity) => {
    const adaptedInput = TipoProgramaObraAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: TipoProgramaObraModel.UpdateEntity) => {
    const adaptedInput = TipoProgramaObraAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
