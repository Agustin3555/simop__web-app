import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { RescisionModel } from '.'
import { RescisionAdapter } from './rescision.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('rescisiones')

export const RescisionService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return RescisionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return refsAdapter(RescisionAdapter.getRefs.output, response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

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
