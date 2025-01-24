import { publicInstance, Service } from '@/services/config'
import { InspectorModel } from '../models'
import { InspectorAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('inspectores')

export const InspectorService: Service<InspectorModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return InspectorAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return InspectorAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return InspectorAdapter.getOne.output(response.data)
  },

  create: async (data: InspectorModel.CreateData) => {
    const adaptedInput = InspectorAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
