import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { RescisionModel } from '.'
import { RescisionAdapter } from './rescision.adapter'

const collection = buildPath('rescisiones')

export const RescisionService = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return RescisionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return RescisionAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return RescisionAdapter.getOne.output(response.data)
  },

  create: async (data: RescisionModel.CreateEntity) => {
    const adaptedInput = RescisionAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return RescisionAdapter.create.output(response.data)
  },

  updateOne: async (id, data: RescisionModel.UpdateEntity) => {
    const adaptedInput = RescisionAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return RescisionAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<RescisionModel.Entity>
