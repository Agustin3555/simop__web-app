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

    const response = await publicInstance.post(collection(), adaptedInput)

    return TipoRescisionAdapter.create.output(response.data)
  },

  updateOne: async (id, data: TipoRescisionModel.UpdateEntity) => {
    const adaptedInput = TipoRescisionAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return TipoRescisionAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
