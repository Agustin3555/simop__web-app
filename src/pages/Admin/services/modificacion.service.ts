import { publicInstance, Service } from '@/services/config'
import { ModificacionModel } from '../models'
import { ModificacionAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('modificaciones')

export const ModificacionService: Service<ModificacionModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return ModificacionAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return ModificacionAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return ModificacionAdapter.getOne.output(response.data)
  },

  create: async (data: ModificacionModel.CreateData) => {
    const adaptedInput = ModificacionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
  updateOne: async (id, data: ModificacionModel.UpdateData) => {
    const adaptedInput = ModificacionAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },
  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
