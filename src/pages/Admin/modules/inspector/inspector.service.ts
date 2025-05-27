import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { InspectorAdapter, InspectorModel } from '.'

const collection = buildPath('inspectores')

export const InspectorService: Service<InspectorModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return InspectorAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return InspectorAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return InspectorAdapter.getOne.output(response.data)
  },

  create: async (data: InspectorModel.CreateEntity) => {
    const adaptedInput = InspectorAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: InspectorModel.UpdateEntity) => {
    const adaptedInput = InspectorAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
