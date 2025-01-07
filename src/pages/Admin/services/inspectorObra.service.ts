import { publicInstance, Service } from '@/services/config'
import { InspectorObraModel } from '../models'
import { InspectorObraAdapter } from '../adapters'
import { buildPath } from '@/helpers'

const collection = buildPath('representantes-obras')

export const InspectorObraService: Service<InspectorObraModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return InspectorObraAdapter.getAll.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return InspectorObraAdapter.getOne.output(response.data)
  },

  create: async (data: InspectorObraModel.CreateData) => {
    const adaptedInput = InspectorObraAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
}
