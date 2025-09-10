import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { APGModel } from '.'
import { APGAdapter } from './apg.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('apgs')

export const APGService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return APGAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return refsAdapter(APGAdapter.getRefs.output, response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

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
} satisfies Service<APGModel.Entity>
