import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoRescisionModel } from '.'
import { TipoRescisionAdapter } from './tipoRescision.adapter'

const collection = buildPath('tipos-rescisiones')

export const TipoRescisionService: Service<TipoRescisionModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoRescisionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return TipoRescisionAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoRescisionAdapter.getOne.output(response.data)
  },

  create: async (data: TipoRescisionModel.CreateEntity) => {
    const adaptedInput = TipoRescisionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: TipoRescisionModel.UpdateEntity) => {
    const adaptedInput = TipoRescisionAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
