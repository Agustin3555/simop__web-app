import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { AreaModel } from '.'
import { AreaAdapter } from './area.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('areas')

export const AreaService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return AreaAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return refsAdapter(AreaAdapter.getRefs.output, response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

    return AreaAdapter.getOne.output(response.data)
  },

  create: async (data: AreaModel.CreateEntity) => {
    const adaptedInput = AreaAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return AreaAdapter.create.output(response.data)
  },

  updateOne: async (id, data: AreaModel.UpdateEntity) => {
    const adaptedInput = AreaAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return AreaAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<AreaModel.Entity>
