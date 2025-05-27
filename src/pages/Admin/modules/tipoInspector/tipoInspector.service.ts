import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoInspectorAdapter, TipoInspectorModel } from '.'

const collection = buildPath('tipos-inspectores')

export const TipoInspectorService: Service<TipoInspectorModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoInspectorAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return TipoInspectorAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoInspectorAdapter.getOne.output(response.data)
  },

  create: async (data: TipoInspectorModel.CreateEntity) => {
    const adaptedInput = TipoInspectorAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: TipoInspectorModel.UpdateEntity) => {
    const adaptedInput = TipoInspectorAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
