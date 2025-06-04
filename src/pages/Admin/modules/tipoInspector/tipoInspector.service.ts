import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoInspectorModel } from '.'
import { TipoInspectorAdapter } from './tipoInspector.adapter'

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

    const response = await publicInstance.post(collection(), adaptedInput)

    return TipoInspectorAdapter.create.output(response.data)
  },

  updateOne: async (id, data: TipoInspectorModel.UpdateEntity) => {
    const adaptedInput = TipoInspectorAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return TipoInspectorAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
