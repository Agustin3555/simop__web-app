import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { TipoModificacionAdapter, TipoModificacionModel } from '.'

const collection = buildPath('tipos-modificaciones')

export const TipoModificacionService: Service<TipoModificacionModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoModificacionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return TipoModificacionAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoModificacionAdapter.getOne.output(response.data)
  },

  create: async (data: TipoModificacionModel.CreateEntity) => {
    const adaptedInput = TipoModificacionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: TipoModificacionModel.UpdateEntity) => {
    const adaptedInput = TipoModificacionAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
