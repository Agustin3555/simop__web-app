import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoProgramaObraModel } from '.'
import { TipoProgramaObraAdapter } from './tipoProgramaObra.adapter'

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

    const response = await publicInstance.post(collection(), adaptedInput)

    return TipoProgramaObraAdapter.create.output(response.data)
  },

  updateOne: async (id, data: TipoProgramaObraModel.UpdateEntity) => {
    const adaptedInput = TipoProgramaObraAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return TipoProgramaObraAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
