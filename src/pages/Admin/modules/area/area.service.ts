import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { AreaModel } from '.'
import { AreaAdapter } from './area.adapter'

const collection = buildPath('areas')

export const AreaService = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return AreaAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return AreaAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

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
