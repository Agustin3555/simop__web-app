import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { APGModel } from '.'
import { APGAdapter } from './apg.adapter'

const collection = buildPath('apgs')

export const APGService: Service<APGModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return APGAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return APGAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return APGAdapter.getOne.output(response.data)
  },

  create: async (data: APGModel.CreateEntity) => {
    const adaptedInput = APGAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return APGAdapter.create.output(response.data)
  },

  updateOne: async (id, data: APGModel.UpdateEntity) => {
    const adaptedInput = APGAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return APGAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
