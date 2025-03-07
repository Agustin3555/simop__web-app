import { publicInstance, Service } from '@/services/config'
import { TipoModificacionModel } from '../models'
import { TipoModificacionAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('tipos-modificaciones')

export const TipoModificacionService: Service<TipoModificacionModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return TipoModificacionAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return TipoModificacionAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return TipoModificacionAdapter.getOne.output(response.data)
  },

  create: async (data: TipoModificacionModel.CreateData) => {
    const adaptedInput = TipoModificacionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
  updateOne: async (id, data: TipoModificacionModel.UpdateData) => {
    const adaptedInput = TipoModificacionAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
