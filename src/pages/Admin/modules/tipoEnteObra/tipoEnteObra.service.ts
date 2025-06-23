import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoEnteObraModel } from '.'
import { TipoEnteObraAdapter } from './tipoEnteObra.adapter'

const collection = buildPath('tipos-entes-obra')

export const TipoEnteObraService: Service<TipoEnteObraModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoEnteObraAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return TipoEnteObraAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoEnteObraAdapter.getOne.output(response.data)
  },

  create: async (data: TipoEnteObraModel.CreateEntity) => {
    const adaptedInput = TipoEnteObraAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return TipoEnteObraAdapter.create.output(response.data)
  },

  updateOne: async (id, data: TipoEnteObraModel.UpdateEntity) => {
    const adaptedInput = TipoEnteObraAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return TipoEnteObraAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
