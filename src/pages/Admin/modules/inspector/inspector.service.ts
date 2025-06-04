import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { InspectorModel } from '.'
import { InspectorAdapter } from './inspector.adapter'

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

    const response = await publicInstance.post(collection(), adaptedInput)

    return InspectorAdapter.create.output(response.data)
  },

  updateOne: async (id, data: InspectorModel.UpdateEntity) => {
    const adaptedInput = InspectorAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return InspectorAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
