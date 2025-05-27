import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoEstadoObraModel, TipoEstadoObraAdapter } from '.'

const collection = buildPath('tipos-estados-obra')

export const TipoEstadoObraService: Service<TipoEstadoObraModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoEstadoObraAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return TipoEstadoObraAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoEstadoObraAdapter.getOne.output(response.data)
  },

  create: async (data: TipoEstadoObraModel.CreateEntity) => {
    const adaptedInput = TipoEstadoObraAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: TipoEstadoObraModel.UpdateEntity) => {
    const adaptedInput = TipoEstadoObraAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
