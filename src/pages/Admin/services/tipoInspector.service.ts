import { publicInstance, Service } from '@/services/config'
import { TipoInspectorModel } from '../models'
import { TipoInspectorAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('tipos-inspectores')

export const TipoInspectorService: Service<TipoInspectorModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoInspectorAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return TipoInspectorAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoInspectorAdapter.getOne.output(response.data)
  },

  create: async (data: TipoInspectorModel.CreateData) => {
    const adaptedInput = TipoInspectorAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
  updateOne: async (id, data: TipoInspectorModel.UpdateData) => {
    const adaptedInput = TipoInspectorAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },
  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
