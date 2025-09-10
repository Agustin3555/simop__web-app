import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath, sendFields } from '@/helpers'
import { InspectorObraModel } from '.'
import { InspectorObraAdapter } from './inspectorObra.adapter'
import { refsAdapter } from '@/adapters/config'

const collection = buildPath('inspectores-obras')

export const InspectorObraService = {
  getAll: async fields => {
    const response = await publicInstance.get(collection() + sendFields(fields))

    return InspectorObraAdapter.getAll.output(response.data)
  },

  getOne: async (id, fields) => {
    const response = await publicInstance.get(
      collection(id) + sendFields(fields),
    )

    return InspectorObraAdapter.getOne.output(response.data)
  },

  create: async (data: InspectorObraModel.CreateEntity) => {
    const adaptedInput = InspectorObraAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return InspectorObraAdapter.create.output(response.data)
  },

  updateOne: async (id, data: InspectorObraModel.UpdateEntity) => {
    const adaptedInput = InspectorObraAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return InspectorObraAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<InspectorObraModel.Entity>
